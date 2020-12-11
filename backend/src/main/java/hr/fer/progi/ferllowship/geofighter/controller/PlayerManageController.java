package hr.fer.progi.ferllowship.geofighter.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.progi.ferllowship.geofighter.model.Player;
import hr.fer.progi.ferllowship.geofighter.service.PlayerManageService;

@RestController
public class PlayerManageController {
	
	@Autowired
	private PlayerManageService playerManageService;

	@GetMapping(path = "/profile/manage")
	public List<Player> getPlayerManageList() {
		return playerManageService.getPlayerList();
	}
}
