package hr.fer.progi.ferllowship.geofighter.controller;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.common.hash.Hashing;

import hr.fer.progi.ferllowship.geofighter.dao.ConfirmationTokenRepository;
import hr.fer.progi.ferllowship.geofighter.dao.PlayerRepository;
import hr.fer.progi.ferllowship.geofighter.model.ConfirmationToken;
import hr.fer.progi.ferllowship.geofighter.model.Player;
import hr.fer.progi.ferllowship.geofighter.service.CloudinaryService;
import hr.fer.progi.ferllowship.geofighter.service.EmailService;

@RestController
public class RegisterController {
	
	@Autowired
	private PlayerRepository playerRepository;
	
	@Autowired
	private ConfirmationTokenRepository confirmationTokenRepository;
	
    @Autowired
    private EmailService emailService;
    
    @Autowired 
    private CloudinaryService cloudinaryService;

	@PostMapping(path = "/register")
	public Map<String, String> register(
			@RequestPart("username") String username,
			@RequestPart("password") String password,
			@RequestPart("email") String email,
			@RequestPart("picture") MultipartFile picture) throws IOException {
		
		Map<String, String> response = new HashMap<>();
		
		if (playerRepository.findByUsername(username) != null) {
			response.put("message", "Igrač s unesenim imenom već postoji.");
			return response;
		}
		
		if (playerRepository.findByEmail(email) != null) {
			response.put("message", "Igrač s unesenim e-mailom već postoji.");
			return response;
		}
		
		String pictureLink = cloudinaryService.upload(picture);
		
		String passwordHash = 
			Hashing.sha256().hashString(password, StandardCharsets.UTF_8).toString();
		
		Player player = new Player(username, passwordHash, email, pictureLink);
		playerRepository.save(player);
		
		ConfirmationToken confirmationToken = new ConfirmationToken(player);
		confirmationTokenRepository.save(confirmationToken);
		
		String to = email;
		String from = System.getenv("EMAIL");
		String subject = "Potvrdi svoju GeoFighter registraciju!";
		String text = "Bok " + username + "!\n\n" +
			"Klikom na sljedeći link potvrdi svoju GeoFighter registraciju: " + 
			System.getenv("FRONTEND_URL") + "/confirm?token=" + confirmationToken.getConfirmationToken();
		
		emailService.sendEmail(to, from, subject, text);
		
		response.put("message", "Potvrdi registraciju na emailu.");
        return response;
	}
	
	@GetMapping(path = "/confirm")
	public Map<String, String> confirm(@RequestParam("token") String token) {
		Map<String, String> response = new HashMap<>();
		
		ConfirmationToken confirmationToken = confirmationTokenRepository.findByConfirmationToken(token);
		if (confirmationToken == null) {
			response.put("message", "Link za potvrdu nije valjan.");
			return response;
		}
		
		Player player = playerRepository.findByEmail(confirmationToken.getPlayer().getEmail());
		player.setEnabled(true);
		playerRepository.save(player);
		
		response.put("message", "Uspješna registracija!");
        return response;
	}
	
}
