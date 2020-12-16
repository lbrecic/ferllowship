package hr.fer.progi.ferllowship.geofighter.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.progi.ferllowship.geofighter.dto.PlayerDTO;
import hr.fer.progi.ferllowship.geofighter.service.PlayerService;

@RestController
public class AdminController {

	@Autowired
	private PlayerService playerService;

	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping(path = "/allPlayers")
	public List<PlayerDTO> getAllPlayers() {
		return playerService.getAllPlayers();
	}
	
}
