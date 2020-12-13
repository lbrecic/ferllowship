package hr.fer.progi.ferllowship.geofighter.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
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
	
	@Autowired PasswordEncoder passwordEncoder;

	/**
	 * metoda za uređivanje korisničkog profila, 
	 * isti parametri kao i za registraciju igrača
	 * - za sad se ne mijenja slika
	 *  
	 * @param username
	 * @param password
	 * @param email
	 * - @param picture -
	 * @return
	 * @throws IOException
	 */
	@PreAuthorize("hasAnyRole('ADMIN','CARTOGRAPH','PLAYER')")
	@PostMapping(path = "/profile/edit")
	public MessageDTO editProfile(@RequestPart String username,
									@RequestPart String password,
									@RequestPart String email/*,
									@RequestPart MultipartFile picture*/)
									throws IOException {
		
		/*
		 * kako se dohvaća player?
		 */
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		Player player = playerRepository.findByUsername(auth.getName());
		
		/*
		 * što ako igrač ne želi promijeniti sve korisničke podatke, nego samo neke?
		 *  --> za vrijednosti koje se ne mijenjaju šalje se prazan string?
		 */
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
		
		return new MessageDTO("Promjene profila uspješno pohranjene.");
	}
}
