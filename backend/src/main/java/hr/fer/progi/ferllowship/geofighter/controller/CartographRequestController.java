package hr.fer.progi.ferllowship.geofighter.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import hr.fer.progi.ferllowship.geofighter.dao.CartographRepository;
import hr.fer.progi.ferllowship.geofighter.dao.PlayerRepository;
import hr.fer.progi.ferllowship.geofighter.model.Cartograph;
import hr.fer.progi.ferllowship.geofighter.model.Player;
import hr.fer.progi.ferllowship.geofighter.service.CloudinaryService;

@RestController
public class CartographRequestController {
	
	@Autowired
	private CartographRepository cartographRepository;
	
	@Autowired
	private PlayerRepository playerRepository;
	
	@Autowired
	private CloudinaryService cloudinaryService;
	
	@PostMapping(path = "/cartographRequest")
	public Map<String, String> createRequest(
			@RequestPart("username") String username,
			@RequestPart("iban") String iban,
			@RequestPart("picture") MultipartFile picture) {
		
		Map<String, String> response = new HashMap<>();
		
		Player player = playerRepository.findByUsername(username);
		if (player == null) {
			response.put("error", "Igrač ne postoji.");
			return response;
		}
		
		String idPhotoLink = cloudinaryService.createLink(picture);
		
		Cartograph cartograph = new Cartograph();
		cartograph.setUsername(player.getUsername());
		cartograph.setPasswordHash(player.getPasswordHash());
		cartograph.setEmail(player.getEmail());
		cartograph.setPhotoLink(player.getPhotoLink());
		cartograph.setEnabled(player.getEnabled());
		cartograph.setConfirmed(false);
		cartograph.setIban(iban);
		cartograph.setIdPhotoLink(idPhotoLink);
		
		cartographRepository.save(cartograph);

		response.put("success", "Prijava uspješno zaprimljena.");
        return response;
	}
	
	@GetMapping(path = "/requests")
	public List<Map<String, String>>getRequests() {
		List<Map<String, String>> response = new ArrayList<>();
		
		for (Cartograph cartograph : cartographRepository.findAll()) {
			if (!cartograph.getConfirmed()) {
				Map<String, String> cartographMap = new HashMap<>();
				cartographMap.put("username", cartograph.getUsername());
				cartographMap.put("iban", cartograph.getIban());
				cartographMap.put("email", cartograph.getEmail());
				cartographMap.put("idPhotoLink", cartograph.getIdPhotoLink());
				response.add(cartographMap);
			}
		}
		
        return response;
	}
	
	@PostMapping(path = "/requests/{username}")
	public Map<String, String> approveOrDeclineRequest(
			@RequestParam("username") String username,
			@RequestParam("status") boolean status) {
		
		Map<String, String> response = new HashMap<>();
		
		if (status) {
			Cartograph cartograph = cartographRepository.findByUsername(username);
			cartograph.setConfirmed(true);
		}
		
        return response;
	}
	
}
