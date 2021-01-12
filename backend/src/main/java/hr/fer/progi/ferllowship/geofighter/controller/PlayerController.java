package hr.fer.progi.ferllowship.geofighter.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import hr.fer.progi.ferllowship.geofighter.dao.PlayerRepository;
import hr.fer.progi.ferllowship.geofighter.dto.CardDTO;
import hr.fer.progi.ferllowship.geofighter.dto.MessageDTO;
import hr.fer.progi.ferllowship.geofighter.dto.PlayerDTO;
import hr.fer.progi.ferllowship.geofighter.model.Card;
import hr.fer.progi.ferllowship.geofighter.model.Player;
import hr.fer.progi.ferllowship.geofighter.configuration.ActiveUserStore;
import hr.fer.progi.ferllowship.geofighter.configuration.LoggedUser;
import hr.fer.progi.ferllowship.geofighter.service.CloudinaryService;
import hr.fer.progi.ferllowship.geofighter.service.PlayerService;

@RestController
public class PlayerController {
	
	@Autowired
	private PlayerRepository playerRepository;

	@Autowired
	private PlayerService playerService;

	@Autowired
	private CloudinaryService cloudinaryService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private ActiveUserStore activeUserStore;
	
	@PreAuthorize("hasAnyRole('ADMIN','CARTOGRAPH','PLAYER')")
	@GetMapping(path = "/player")
	public PlayerDTO getProfileInfo() {
		Player player = playerService.getLoggedInPlayer();
		String authorityLevel = playerService.getAuthorityLevelOfLoggedInPlayer();
		playerService.updateRoleOfLoggedInPlayer("ROLE_" + authorityLevel.toUpperCase());

		return new PlayerDTO(
			player.getUsername(),
			player.getPasswordHash(),
			player.getEmail(),
			player.getPhotoLink(),
			player.getPoints(),
			player.getBanStatus(),
			player.getEnabled(),
			player.getActivity(),
			player.getExperience(),
			authorityLevel
		);
	}
	
	@PreAuthorize("hasAnyRole('ADMIN','CARTOGRAPH','PLAYER')")
	@GetMapping(path = "/anotherPlayer")
	public PlayerDTO getAnotherPlayerProfileInfo(@RequestParam("username") String username) {
		Player player = playerRepository.findByUsername(username);
		String authorityLevel = playerService.getAuthorityLevelOfPlayer(player);

		return new PlayerDTO(
			player.getUsername(),
			player.getEmail(),
			player.getPhotoLink(),
			player.getPoints(),
			player.getBanStatus(),
			player.getEnabled(),
			player.getActivity(),
			player.getExperience(),
			authorityLevel
		);
	}

	/**
	 * Metoda za uredjivanje profila korisnika.
	 * Pri izmjeni podataka uvijek se unosi stara lozinka za provjeru
	 * i novi podatci koji se zele promijeniti.
	 * Za podatke koje korisnik ne zeli mijenjati parametar je prazan string.
	 *
	 * Metoda vraca poruku ciji sadrzaj ovisi o uspjesnosti izmjene podataka.
	 */
	@PreAuthorize("hasAnyRole('ADMIN','CARTOGRAPH','PLAYER')")
	@PostMapping(path = "/profile/edit")
	public MessageDTO editProfile(/*@RequestParam("username") String username,
								  @RequestParam("password") String password,
								  @RequestParam("oldPassword") String oldPassword,
								  @RequestParam("email") String email*/
//									@RequestPart String username,
									@RequestPart String password,
									@RequestPart String oldPassword,
									@RequestPart String email,
									@RequestPart MultipartFile picture)
			throws IOException {

		Player player = playerService.getLoggedInPlayer();

		if(!oldPassword.isBlank()) {		//dodano - Ivana
			if (!passwordEncoder.matches(oldPassword, player.getPasswordHash())) {
				return new MessageDTO("Incorrect password.");
			}
		}
//		if (!username.isBlank()) {
//			if (playerRepository.findByUsername(username) != null) {
//				return new MessageDTO("Željeno ime je već zauzeto.");
//			}
//			player.setUsername(username);
//		}
		if (!password.isBlank()) {
			
			player.setPasswordHash(passwordEncoder.encode(password));
			

		}
		if (!email.isBlank()) {
			player.setEmail(email);
		}
		byte comparisonBytes[] = new byte[0] /*{0x1a, 0x1c}*/;
		if (!Arrays.equals(picture.getBytes(), comparisonBytes)) {
			player.setPhotoLink(cloudinaryService.upload(picture.getBytes()));
		}

		playerRepository.save(player);

		return new MessageDTO("Changes saved successfully.");
	}

	@PreAuthorize("hasAnyRole('ADMIN','CARTOGRAPH','PLAYER')")
	@GetMapping(path = "/player/deck")
	public List<CardDTO> getPlayerDeck(@RequestParam String username) {
		Player player = playerRepository.findByUsername(username);

		List<CardDTO> deck = new ArrayList<>();
		List<Card> cards = player.getDeck();

		for (Card card : cards) {
			deck.add(new CardDTO(
				card.getCardPoints(),
				card.getScaleFactor(),
				card.getLocation()
			));
		}

		return deck;
	}

	@PreAuthorize("hasAnyRole('ADMIN','CARTOGRAPH','PLAYER')")
	@GetMapping(path = "/active")
	public List<PlayerDTO> getAllActivePlayers() {
		return playerService.getAllActivePlayersNearMe();
	}

	@PreAuthorize("hasAnyRole('ADMIN','CARTOGRAPH','PLAYER')")
	@GetMapping(path = "/ping")
	public void setActivity() {
		List<LoggedUser> users = activeUserStore.getUsers();
		String username = playerService.getLoggedInPlayer().getUsername();
		
		double lat = -1;
		double lon = -1;
		for(LoggedUser user : users) {
			if (user.getUsername().equals(username)) {
				lat = user.getCurrentLat();
				lon = user.getCurrentLon();
			}
		}
		LoggedUser user = new LoggedUser(username, lat, lon, activeUserStore);
		users.remove(user);
		users.add(user);
	}

	@PreAuthorize("hasAnyRole('ADMIN','CARTOGRAPH','PLAYER')")
	@PostMapping(path = "/player/coordinates")
	public void setCurrentCoordinates(@RequestPart String lat,
									@RequestPart String lon) {
		List<LoggedUser> users = activeUserStore.getUsers();
		String username = playerService.getLoggedInPlayer().getUsername();
		
		for(LoggedUser user : users) {
			if (user.getUsername().equals(username)) {
				user.setCurrentLat(Double.parseDouble(lat));
				user.setCurrentLon(Double.parseDouble(lon));
			}
		}
	}
}
