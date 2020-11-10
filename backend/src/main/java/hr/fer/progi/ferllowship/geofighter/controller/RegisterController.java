package hr.fer.progi.ferllowship.geofighter.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import hr.fer.progi.ferllowship.geofighter.dao.PlayerRepository;
import hr.fer.progi.ferllowship.geofighter.model.ConfirmationToken;
import hr.fer.progi.ferllowship.geofighter.model.Player;
import hr.fer.progi.ferllowship.geofighter.service.EmailService;

@RestController
public class RegisterController {
	
	@Autowired
	private PlayerRepository playerRepository;
	
	@Autowired
	private ConfirmationTokenRepository confirmationTokenRepository;
	
    @Autowired
    private EmailService emailService;

	@PostMapping(path = "/register")
	public Map<String, String> register(
			@RequestPart("username") String username,
			@RequestPart("password") String password,
			@RequestPart("email") String email,
			@RequestPart("picture") MultipartFile picture) throws IOException {
		
		Map<String, String> response = new HashMap<>();
		
		if (playerRepository.findByUsername(username) != null) {
			response.put("error", "Igrač s unesenim imenom već postoji.");
			return response;
		}
		
		if (playerRepository.findByEmail(email) != null) {
			response.put("error", "Igrač s unesenim e-mailom već postoji.");
			return response;
		}
		
		Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
			"cloud_name", "ferllowship",
			"api_key", "558424752216417",
			"api_secret", "Mcj9aGAcqmKi6Zx4OXNcV9Cy5KI"
		));
		
		@SuppressWarnings("rawtypes")
		Map result = cloudinary.uploader().upload(picture.getBytes(), ObjectUtils.emptyMap());
		String pictureLink = (String) result.get("url");
		
		Player player = new Player(username, password, email, pictureLink);
		playerRepository.save(player);
		
		ConfirmationToken confirmationToken = new ConfirmationToken(player);
		confirmationTokenRepository.save(confirmationToken);
		
		SimpleMailMessage mailMessage = new SimpleMailMessage();
		mailMessage.setTo(email);
		mailMessage.setSubject("Potvrdi svoju GeoFighter registraciju.");
		mailMessage.setFrom("ferllowship@gmail.com");
		mailMessage.setText(
			"Klikom na link potvrdi svoju registraciju: " + 
			"http://localhost:8080/confirm?token=" + confirmationToken.getConfirmationToken()
		);
		
		emailService.sendEmail(mailMessage);
		
        response.put("success", "true");
        return response;
	}
	
	@GetMapping(path = "/confirm")
	public Map<String, String> confirm(@RequestParam("token") String token) {
		ConfirmationToken confirmationToken = confirmationTokenRepository.findByConfirmationToken(token);
		
		Map<String, String> response = new HashMap<>();
		
		if (confirmationToken == null) {
			response.put("error", "Link za potvrdu je istekao ili nije valjan.");
			return response;
		}
		
		Player player = playerRepository.findByEmail(confirmationToken.getPlayer().getEmail());
		player.setEnabled(true);
		playerRepository.save(player);
		
        response.put("success", "true");
        return response;
	}
	
}