package hr.fer.progi.ferllowship.geofighter.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.progi.ferllowship.geofighter.dao.PlayerRepository;
import hr.fer.progi.ferllowship.geofighter.dto.MessageDTO;
import hr.fer.progi.ferllowship.geofighter.dto.PlayerDTO;
import hr.fer.progi.ferllowship.geofighter.model.Player;
import hr.fer.progi.ferllowship.geofighter.service.CloudinaryService;
import hr.fer.progi.ferllowship.geofighter.service.PlayerService;

@RestController
public class ProfileController {
	
	@Autowired
	private PlayerRepository playerRepository;

	@Autowired
	private PlayerService playerService;

	@Autowired
	private CloudinaryService cloudinaryService;

	@Autowired
	private PasswordEncoder passwordEncoder;
	
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
	public MessageDTO editProfile(@RequestParam("username") String username,
								  @RequestParam("password") String password,
								  @RequestParam("oldPassword") String oldPassword,
								  @RequestParam("email") String email
									/* parametri gore su za testiranje!
									 * mozda je potrebna izmjena prije povezivanja s frontendom
									@RequestPart String username,
									@RequestPart String password,
									@RequestPart String oldPassword,
									@RequestPart String email,
									@RequestPart MultipartFile picture*/)
			throws IOException {

		Player player = playerService.getLoggedInPlayer();

		if (!passwordEncoder.matches(oldPassword, player.getPasswordHash())) {
			return new MessageDTO("Unesena pogrešna lozinka!");
		}

		if (!username.isBlank()) {
			if (playerRepository.findByUsername(username) != null) {
				return new MessageDTO("Željeno ime je već zauzeto.");
			}
			player.setUsername(username);
		}
		if (!password.isBlank()) {
			player.setPasswordHash(passwordEncoder.encode(password));
		}
		if (!email.isBlank()) {
			player.setEmail(email);
		}
//		if (picture != null) {
//			player.setPhotoLink(cloudinaryService.upload(picture.getBytes()));
//		}

		playerRepository.save(player);

		return new MessageDTO("Promjene profila uspješno pohranjene.");
	}

}
