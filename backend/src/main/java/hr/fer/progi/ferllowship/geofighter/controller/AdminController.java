package hr.fer.progi.ferllowship.geofighter.controller;

import java.util.ArrayList;
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
		List<PlayerDTO> response = new ArrayList<>();
		
		for (PlayerDTO user : playerService.getAllPlayers())
			if (user.getAuthorityLevel().toUpperCase().equals("PLAYER"))
				response.add(user);
		
		return response;
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping(path = "/allCartographs")
	public List<PlayerDTO> getAllCartographs() {
		List<PlayerDTO> response = new ArrayList<>();
		
		for (PlayerDTO user : playerService.getAllPlayers())
			if (user.getAuthorityLevel().toUpperCase().equals("CARTOGRAPH"))
				response.add(user);
		
		return response;
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping(path = "/allAdmins")
	public List<PlayerDTO> getAllAdmins() {
		List<PlayerDTO> response = new ArrayList<>();
		
		for (PlayerDTO user : playerService.getAllPlayers())
			if (user.getAuthorityLevel().toUpperCase().equals("ADMIN"))
				response.add(user);
		
		return response;
	}
}
