package hr.fer.progi.ferllowship.geofighter.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import hr.fer.progi.ferllowship.geofighter.dao.CardRepository;
import hr.fer.progi.ferllowship.geofighter.dao.LocationRepository;
import hr.fer.progi.ferllowship.geofighter.dao.PlayerRepository;
import hr.fer.progi.ferllowship.geofighter.dto.CardDTO;
import hr.fer.progi.ferllowship.geofighter.dto.CategoryDTO;
import hr.fer.progi.ferllowship.geofighter.dto.FightDTO;
import hr.fer.progi.ferllowship.geofighter.dto.LocationDTO;
import hr.fer.progi.ferllowship.geofighter.dto.MessageDTO;
import hr.fer.progi.ferllowship.geofighter.dto.PlayerDTO;
import hr.fer.progi.ferllowship.geofighter.model.Card;
import hr.fer.progi.ferllowship.geofighter.model.Location;
import hr.fer.progi.ferllowship.geofighter.model.Player;
import hr.fer.progi.ferllowship.geofighter.configuration.ActiveUserStore;
import hr.fer.progi.ferllowship.geofighter.configuration.LoggedUser;
import hr.fer.progi.ferllowship.geofighter.service.CloudinaryService;
import hr.fer.progi.ferllowship.geofighter.service.FightService;
import hr.fer.progi.ferllowship.geofighter.service.PlayerService;

@RestController
public class PlayerController {
	
	@Autowired
	private CardRepository cardRepository;
	
	@Autowired
	private LocationRepository locationRepository;
	
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

	@Autowired
	private FightService fightService;
	
	@PreAuthorize("hasAnyRole('ADMIN','CARTOGRAPH','PLAYER')")
	@GetMapping(path = "/player")
	public PlayerDTO getProfileInfo() {
		Player player = playerService.getLoggedInPlayer();
		String authorityLevel = playerService.getAuthorityLevelOfLoggedInPlayer();
		playerService.updateRoleOfLoggedInPlayer("ROLE_" + authorityLevel.toUpperCase());

		return playerService.playerToPlayerDTO(player);
	}
	
	@PreAuthorize("hasAnyRole('ADMIN','CARTOGRAPH','PLAYER')")
	@GetMapping(path = "/anotherPlayer")
	public PlayerDTO getAnotherPlayerProfileInfo(@RequestParam("username") String username) {
		Player player = playerRepository.findByUsername(username);

		return playerService.playerToPlayerDTO(player);
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
	public MessageDTO editProfile(@RequestPart String password,
								  @RequestPart String oldPassword,
								  @RequestPart String email,
								  @RequestPart MultipartFile picture)
			throws IOException {

		Player player = playerService.getLoggedInPlayer();

		if(!oldPassword.isBlank()) {
			if (!passwordEncoder.matches(oldPassword, player.getPasswordHash())) {
				return new MessageDTO("Incorrect password.");
			}
		}

		if (!password.isBlank()) {	
			player.setPasswordHash(passwordEncoder.encode(password));
		}
		
		if (!email.isBlank()) {
			Player player2 = playerRepository.findByEmail(email);
			if (player2 != null && !player2.getUsername().equals(player.getUsername())) {
				return new MessageDTO("Entered email address is already taken!");
			}
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
	
	@PreAuthorize("hasAnyRole('ADMIN','CARTOGRAPH','PLAYER')")
	@GetMapping(path = "/player/coordinates")
	public Map<String, Double> getCurrentCoordinates() {
		Map<String, Double> result = new HashMap<>();
		
		List<LoggedUser> users = activeUserStore.getUsers();
		String username = playerService.getLoggedInPlayer().getUsername();
		
		for(LoggedUser user : users) {
			if (user.getUsername().equals(username)) {
				result.put("lat", user.getCurrentLat());
				result.put("lon", user.getCurrentLon());
			}
		}
		
		return result;
	}
	
	@PreAuthorize("hasAnyRole('ADMIN','CARTOGRAPH','PLAYER')")
	@PostMapping(path = "/location/collect")
	public MessageDTO collectLocation(@RequestParam String locationName) {

		Location location = locationRepository.findByLocationName(locationName);
		if (location == null) {
			return new MessageDTO("Location does not exist. Card not collected.");
		}
		
		Player user = playerService.getLoggedInPlayer();

		Card card = new Card(location.getCategory().getCategoryPoints(), 1, location, user);
		cardRepository.save(card);

		return new MessageDTO("Card collected.");
	}
	
	@PreAuthorize("hasAnyRole('ADMIN','CARTOGRAPH','PLAYER')")
	@GetMapping(path = "/location/collected")
	public List<LocationDTO> getMyCollectedLocations() {
		List<LocationDTO> response = new ArrayList<>();
		List<Card> deck = playerService.getLoggedInPlayer().getDeck();
		
		for(Card card : deck) {
			Location location = card.getLocation();
			double lat = Double.parseDouble(location.getCoordinates().split(";")[0]);
			double lng = Double.parseDouble(location.getCoordinates().split(";")[1]);
			response.add(
				new LocationDTO(
					location.getLocationName(),
					location.getLocationDesc(),
					location.getLocationPhoto(),
					location.getLocationStatus(),
					new LocationDTO.Coordinates(lat, lng),
					new CategoryDTO(
						location.getCategory().getCategoryName(),
						location.getCategory().getCategoryPoints()
					)
				)
			);
		}
		
		return response;
	}
	
	@PreAuthorize("hasAnyRole('ADMIN','CARTOGRAPH','PLAYER')")
	@GetMapping(path = "/location/uncollected-close")
	public List<LocationDTO> getLocationsNearMe() {
		List<LocationDTO> response = new ArrayList<>();
		List<String> collectedLocations = this.getMyCollectedLocations().stream()
												.map(location -> {
													return location.getLocationName();
												})
												.collect(Collectors.toList());
		
		double lat1 = 0.0;
		double lon1 = 0.0;
		
		List<LoggedUser> users = activeUserStore.getUsers();
		String username = playerService.getLoggedInPlayer().getUsername();
		
		for(LoggedUser user : users) {
			if (user.getUsername().equals(username)) {
				lat1 = user.getCurrentLat();
				lon1 = user.getCurrentLon();
			}
		}
		
		for(Location location : locationRepository.findAll()) {
			if(collectedLocations.contains(location.getLocationName()))
				continue;
			
			double lat2 = Double.parseDouble(location.getCoordinates().split(";")[0]);
			double lon2 = Double.parseDouble(location.getCoordinates().split(";")[1]);
			
			double distance = PlayerService.distance(lat1, lon1, lat2, lon2);

			System.out.println(location.getCategory().getCategoryName() + " " + distance);
			
			if(location.getCategory().getCategoryName().equals("City")
					&& distance < 15
			|| location.getCategory().getCategoryName().equals("Small town")
					&& distance < 7
			|| (location.getCategory().getCategoryName().equals("Art installation")
				|| location.getCategory().getCategoryName().equals("Mountain top"))
					&& distance < 1
			// dopuniti ukoliko se doda jos neka kategorija
					) {
					response.add(
							new LocationDTO(
								location.getLocationName(),
								location.getLocationDesc(),
								location.getLocationPhoto(),
								location.getLocationStatus(),
								new LocationDTO.Coordinates(lat2, lon2),
								new CategoryDTO(
									location.getCategory().getCategoryName(),
									location.getCategory().getCategoryPoints()
								)
							)
						);
			}
		}
		
		return response;
	}
	
	@PreAuthorize("hasAnyRole('ADMIN','CARTOGRAPH','PLAYER')")
	@GetMapping(path = "/location/uncollected-distant")
	public List<LocationDTO> getLocationsNotNearMe() {
		List<LocationDTO> response = new ArrayList<>();
		
		List<String> nearLocations = this.getLocationsNearMe().stream()
												.map(location -> {
													return location.getLocationName();
												})
												.collect(Collectors.toList());
		
		List<String> collectedLocations = this.getMyCollectedLocations().stream()
												.map(location -> {
													return location.getLocationName();
												})
												.collect(Collectors.toList());
		
		for(Location location : locationRepository.findAll()) {
			if(!(nearLocations.contains(location.getLocationName()) || 
				collectedLocations.contains(location.getLocationName()))) {
				double lat = Double.parseDouble(location.getCoordinates().split(";")[0]);
				double lng = Double.parseDouble(location.getCoordinates().split(";")[1]);
				response.add(
						new LocationDTO(
							location.getLocationName(),
							location.getLocationDesc(),
							location.getLocationPhoto(),
							location.getLocationStatus(),
							new LocationDTO.Coordinates(lat, lng),
							new CategoryDTO(
								location.getCategory().getCategoryName(),
								location.getCategory().getCategoryPoints()
							)
						)
					);
			}
		}
		
		return response;
	}

	@PreAuthorize("hasAnyRole('ADMIN','CARTOGRAPH','PLAYER')")
	@PostMapping(path = "/saveFight")
	public void saveFight(FightDTO fightDTO) {
		fightService.saveFight(fightDTO);
	}

}
