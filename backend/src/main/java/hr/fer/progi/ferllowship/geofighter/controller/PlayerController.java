package hr.fer.progi.ferllowship.geofighter.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.progi.ferllowship.geofighter.dao.PlayerRepository;
import hr.fer.progi.ferllowship.geofighter.dto.PlayerDTO;
import hr.fer.progi.ferllowship.geofighter.model.Admin;
import hr.fer.progi.ferllowship.geofighter.model.Cartograph;
import hr.fer.progi.ferllowship.geofighter.model.Player;

@RestController
public class PlayerController {
	
	@Autowired
	private PlayerRepository playerRepository;
	
	@GetMapping(path = "/player")
	public PlayerDTO getLoggedInPlayer() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		Player player = playerRepository.findByUsername(auth.getName());
		
		String authorityLevel;
		if (player instanceof Admin) {
			authorityLevel = "admin";
		} else if (player instanceof Cartograph && ((Cartograph) player).getConfirmed()) {
			authorityLevel = "cartograph";
		} else {
			authorityLevel = "player";
		}

		return new PlayerDTO(
			player.getUsername(), 
			player.getEmail(), 
			player.getPhotoLink(), 
			authorityLevel
		);
	}

}
