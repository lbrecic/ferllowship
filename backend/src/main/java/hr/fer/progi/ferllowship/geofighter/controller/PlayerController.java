package hr.fer.progi.ferllowship.geofighter.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.progi.ferllowship.geofighter.dao.PlayerRepository;
import hr.fer.progi.ferllowship.geofighter.model.Admin;
import hr.fer.progi.ferllowship.geofighter.model.Cartograph;
import hr.fer.progi.ferllowship.geofighter.model.Player;

@RestController
public class PlayerController {
	
	@Autowired
	private PlayerRepository playerRepository;
	
	@GetMapping(path = "/player")
	public Map<String, String> getPlayer(@RequestParam("username") String username) {
		Map<String, String> response = new HashMap<>();
		
		Player player = playerRepository.findByUsername(username);
		if (player == null) {
			response.put("error", "Igrač ne postoji.");
			return response;
		}
		
		response.put("username", player.getUsername());
		response.put("email", player.getEmail());
		response.put("photoLink", player.getPhotoLink());
		
		if (player instanceof Admin) {
			response.put("authorityLevel", "admin");
		} else if (player instanceof Cartograph && ((Cartograph) player).getConfirmed()) {
			response.put("authorityLevel", "cartograph");
		} else {
			response.put("authorityLevel", "player");
		}

        return response;
	}

}
