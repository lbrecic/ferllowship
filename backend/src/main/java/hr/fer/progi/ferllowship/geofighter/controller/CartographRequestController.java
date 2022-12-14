package hr.fer.progi.ferllowship.geofighter.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import hr.fer.progi.ferllowship.geofighter.dao.CartographRepository;
import hr.fer.progi.ferllowship.geofighter.dao.PlayerRepository;
import hr.fer.progi.ferllowship.geofighter.dto.CartographDTO;
import hr.fer.progi.ferllowship.geofighter.dto.MessageDTO;
import hr.fer.progi.ferllowship.geofighter.model.Cartograph;
import hr.fer.progi.ferllowship.geofighter.model.Player;
import hr.fer.progi.ferllowship.geofighter.service.CloudinaryService;
import hr.fer.progi.ferllowship.geofighter.service.PlayerService;

@RestController
public class CartographRequestController {
	
	@Autowired
	private CartographRepository cartographRepository;
	
	@Autowired
	private PlayerRepository playerRepository;
	
	@Autowired
	private CloudinaryService cloudinaryService;

	@Autowired
	private PlayerService playerService;
	
	@PreAuthorize("hasRole('PLAYER')")
	@PostMapping(path = "/requests")
	public MessageDTO createRequest(@RequestPart String username,
	                                @RequestPart String iban,
	                                @RequestPart MultipartFile picture) 
	                                throws IOException {

		Player player = playerService.getLoggedInPlayer();
		String idPhotoLink = cloudinaryService.upload(picture.getBytes());
		playerService.changeRoleToCartograph(player, iban, idPhotoLink, false);
		return new MessageDTO("Request successfully received.");
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping(path = "/requests")
	public List<CartographDTO> getRequests() {
		List<CartographDTO> response = new ArrayList<>();
		
		for (Cartograph cartograph : cartographRepository.findAll()) {
			if (!cartograph.getConfirmed()) {
				response.add(
					new CartographDTO(
						cartograph.getUsername(),
						cartograph.getPasswordHash(),
						cartograph.getEmail(),
						cartograph.getPhotoLink(),
						cartograph.getPoints(),
						cartograph.getBanStatus(),
						cartograph.getEnabled(),
						cartograph.getActivity(),
						cartograph.getExperience(),
						"cartograph",
						cartograph.getIban(),
						cartograph.getIdPhotoLink(),
						cartograph.getConfirmed()
					)
				);
			}
		}
		
        return response;
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping(path = "/requests/accept")
	public MessageDTO acceptRequest(@RequestParam String username) {
		Cartograph cartograph = cartographRepository.findByUsername(username);
		if (cartograph == null) {
			return new MessageDTO("Request not found.");
		}

		cartograph.setConfirmed(true);
		cartographRepository.save(cartograph);

		return new MessageDTO("Request accepted.");
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping(path = "/requests/decline")
	public MessageDTO declineRequest(@RequestParam String username) {
		Cartograph cartograph = cartographRepository.findByUsername(username);
		if (cartograph == null) {
			return new MessageDTO("Request not found.");
		}

		playerService.changeRoleToPlayer(cartograph);

		return new MessageDTO("Request declined.");
	}
	
}
