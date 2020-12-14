package hr.fer.progi.ferllowship.geofighter.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import hr.fer.progi.ferllowship.geofighter.dao.PlayerRepository;
import hr.fer.progi.ferllowship.geofighter.dto.MessageDTO;
import hr.fer.progi.ferllowship.geofighter.model.Player;
import hr.fer.progi.ferllowship.geofighter.service.CloudinaryService;

@RestController
public class ProfileEditController {
	
	@Autowired
	private PlayerRepository playerRepository;

	@Autowired
	private CloudinaryService cloudinaryService;
	
	@Autowired 
	private PasswordEncoder passwordEncoder;

	/**
	 * Metoda za uredjivanje profila korisnika.
	 * Pri izmjeni podataka uvijek se unosi stara lozinka za provjeru
	 * i novi podatci koji se zele promijeniti.
	 * Za podatke koje korisnik ne zeli mijenjati parametar je prazan string.
	 * 
	 * Metoda vraca poruku ciji sadrzaj ovisi o uspjesnosti izmjene podataka.
	 * @param username
	 * @param password
	 * @param oldPassword
	 * @param email
	 * @return
	 * @throws IOException
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
		
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		Player player = playerRepository.findByUsername(auth.getName());
		
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
