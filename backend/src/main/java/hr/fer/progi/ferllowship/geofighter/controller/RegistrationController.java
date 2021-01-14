package hr.fer.progi.ferllowship.geofighter.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import hr.fer.progi.ferllowship.geofighter.dao.ConfirmationTokenRepository;
import hr.fer.progi.ferllowship.geofighter.dao.PlayerRepository;
import hr.fer.progi.ferllowship.geofighter.dto.MessageDTO;
import hr.fer.progi.ferllowship.geofighter.model.ConfirmationToken;
import hr.fer.progi.ferllowship.geofighter.model.Player;
import hr.fer.progi.ferllowship.geofighter.service.CloudinaryService;
import hr.fer.progi.ferllowship.geofighter.service.EmailService;

@RestController
public class RegistrationController {
	
	@Autowired
	private PlayerRepository playerRepository;
	
	@Autowired
	private ConfirmationTokenRepository confirmationTokenRepository;
	
    @Autowired 
    private CloudinaryService cloudinaryService;
    
    @Autowired
    private EmailService emailService;
    
    @Autowired
	private PasswordEncoder passwordEncoder;
    
	@PostMapping(path = "/register")
	public MessageDTO register(@RequestPart String username,
	                           @RequestPart String password,
	                           @RequestPart String email,
	                           @RequestPart MultipartFile picture)
	                           throws IOException {
		
		if (playerRepository.findByUsername(username) != null) {
			return new MessageDTO("Player with given username already exists.");
		}
		if (playerRepository.findByEmail(email) != null) {
			return new MessageDTO("Player with given e-mail already exists.");
		}
		
		String pictureLink = cloudinaryService.upload(picture.getBytes());
		String passwordHash = passwordEncoder.encode(password);
		
		Player player = new Player(username, passwordHash, email, pictureLink);
		ConfirmationToken confirmationToken = new ConfirmationToken(player);

		SimpleMailMessage mailMessage = new SimpleMailMessage();
		mailMessage.setTo(email);
		mailMessage.setFrom(System.getenv("EMAIL"));
		mailMessage.setSubject("Potvrdi svoju GeoFighter registraciju!");
		mailMessage.setText(
			"Bok " + username + "!\n\n" +
			"Klikom na sljedeći link potvrdi svoju GeoFighter registraciju: " +
			System.getenv("FRONTEND_URL") + "/confirm?token=" +
			confirmationToken.getConfirmationToken()
		);
		emailService.sendEmail(mailMessage);

		playerRepository.save(player);
		confirmationTokenRepository.save(confirmationToken);

		return new MessageDTO("Confirm your registration by e-mail.");
	}
	
	@GetMapping(path = "/confirm")
	public MessageDTO confirm(@RequestParam String token) {
		ConfirmationToken confirmationToken = 
			confirmationTokenRepository.findByConfirmationToken(token);
		
		if (confirmationToken == null) {
			return new MessageDTO("Invalid confirmation link.");
		}
		
		Player player = playerRepository.findByEmail(
			confirmationToken.getPlayer().getEmail()
		);
		player.setEnabled(true);
		playerRepository.save(player);
		
		return new MessageDTO("Registered successfully!");
	}
	
}
