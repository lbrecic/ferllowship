package hr.fer.progi.ferllowship.geofighter.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import hr.fer.progi.ferllowship.geofighter.dao.CartographRepository;
import hr.fer.progi.ferllowship.geofighter.dao.ConfirmationTokenRepository;
import hr.fer.progi.ferllowship.geofighter.dao.PlayerRepository;
import hr.fer.progi.ferllowship.geofighter.dto.CartographDTO;
import hr.fer.progi.ferllowship.geofighter.dto.MessageDTO;
import hr.fer.progi.ferllowship.geofighter.model.Cartograph;
import hr.fer.progi.ferllowship.geofighter.model.ConfirmationToken;
import hr.fer.progi.ferllowship.geofighter.model.Player;
import hr.fer.progi.ferllowship.geofighter.service.CloudinaryService;

@RestController
public class CartographRequestController {
	
	@Autowired
	private CartographRepository cartographRepository;
	
	@Autowired
	private PlayerRepository playerRepository;
	
	@Autowired
	private ConfirmationTokenRepository confirmationTokenRepository;
	
	@Autowired
	private CloudinaryService cloudinaryService;
	
	@PostMapping(path = "/requests")
	public MessageDTO createRequest(@RequestPart String username,
	                                @RequestPart String iban,
	                                @RequestPart MultipartFile picture) 
	                                throws IOException {
		
		Player player = playerRepository.findByUsername(username);
		if (player == null) {
			return new MessageDTO("Igrač ne postoji.");
		}
		
		Cartograph cartograph = player.createCartograph();
		cartograph.setIban(iban);
		cartograph.setIdPhotoLink(cloudinaryService.upload(picture.getBytes()));
		
		ConfirmationToken token = confirmationTokenRepository.findByPlayer(player);
		if (token != null) {
			confirmationTokenRepository.delete(token);			
		}
		playerRepository.delete(player);
		playerRepository.flush();
		cartographRepository.save(cartograph);
		
		return new MessageDTO("Prijava uspješno zaprimljena.");
	}
	
	@GetMapping(path = "/requests")
	public List<CartographDTO> getRequests() {
		List<CartographDTO> response = new ArrayList<>();
		
		for (Cartograph cartograph : cartographRepository.findAll()) {
			if (!cartograph.getConfirmed()) {
				response.add(
					new CartographDTO(
						cartograph.getUsername(), 
						cartograph.getIban(), 
						cartograph.getEmail(), 
						cartograph.getIdPhotoLink()
					)
				);
			}
		}
		
        return response;
	}
	
	@GetMapping(path = "/requests/accept")
	public MessageDTO acceptRequest(@RequestParam String username) {
		Cartograph cartograph = cartographRepository.findByUsername(username);
		if (cartograph == null) {
			return new MessageDTO("Zahtjev nije pronađen.");
		}
		
		cartograph.setConfirmed(true);
		cartographRepository.save(cartograph);
		
		return new MessageDTO("Zahtjev prihvaćen.");
	}
	
	@GetMapping(path = "/requests/decline")
	public MessageDTO declineRequest(@RequestParam String username) {
		Cartograph cartograph = cartographRepository.findByUsername(username);
		if (cartograph == null) {
			return new MessageDTO("Zahtjev nije pronađen.");
		}
		
		cartographRepository.delete(cartograph);
		cartographRepository.flush();
		playerRepository.save(cartograph.createPlayer());
		
		return new MessageDTO("Zahtjev odbijen.");
	}
	
}
