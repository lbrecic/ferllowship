package hr.fer.progi.ferllowship.geofighter.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.progi.ferllowship.geofighter.dao.PlayerRepository;
import hr.fer.progi.ferllowship.geofighter.dto.ErrorDTO;
import hr.fer.progi.ferllowship.geofighter.dto.PlayerDTO;
import hr.fer.progi.ferllowship.geofighter.model.Admin;
import hr.fer.progi.ferllowship.geofighter.model.Cartograph;
import hr.fer.progi.ferllowship.geofighter.model.Player;

@RestController
public class PlayerController {
	
	@Autowired
	private PlayerRepository playerRepository;
	
	@GetMapping(path = "/players")
	public ResponseEntity<?> getPlayer(@RequestParam String username) {
		Player player = playerRepository.findByUsername(username);
		if (player == null) {
			return ResponseEntity.ok(new ErrorDTO("Igrač ne postoji."));
		}
		
		String authorityLevel;
		if (player instanceof Admin) {
			authorityLevel = "admin";
		} else if (player instanceof Cartograph && ((Cartograph) player).getConfirmed()) {
			authorityLevel = "cartograph";
		} else {
			authorityLevel = "player";
		}

		return ResponseEntity.ok(
			new PlayerDTO(
				player.getUsername(), 
				player.getEmail(), 
				player.getPhotoLink(), 
				authorityLevel)
		);
	}

}
