package hr.fer.progi.ferllowship.geofighter.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.progi.ferllowship.geofighter.dto.AdminDTO;
import hr.fer.progi.ferllowship.geofighter.dto.CartographDTO;
import hr.fer.progi.ferllowship.geofighter.dto.PlayerDTO;
import hr.fer.progi.ferllowship.geofighter.model.Admin;
import hr.fer.progi.ferllowship.geofighter.model.Cartograph;
import hr.fer.progi.ferllowship.geofighter.model.Player;
import hr.fer.progi.ferllowship.geofighter.service.PlayerManageService;

@RestController
public class PlayerManageController {
	
	@Autowired
	private PlayerManageService playerManageService;

	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping(path = "/profile/manage")
	public List<PlayerDTO> getPlayerManageList() {
		List<PlayerDTO> playerDTOList = new ArrayList<>();
		List<Player> playerList = new ArrayList<>();
		playerList = playerManageService.getPlayerList();
		
		for (Player player : playerList) {
			String authorityLevel;
			
			if (player instanceof Admin) {
				authorityLevel = "admin";
				playerDTOList.add(new AdminDTO(
						player.getUsername(),
						player.getPasswordHash(),
						player.getEmail(),
						player.getPhotoLink(),
						player.getPoints(),
						player.getBanStatus(),
						player.getEnabled(),
						player.getActivity(),
						player.getExperience(),
						authorityLevel,
						((Admin) player).getIban(),
						((Admin) player).getIdPhotoLink()));
			} else if (player instanceof Cartograph && ((Cartograph) player).getConfirmed()) {
				authorityLevel = "cartograph";
				playerDTOList.add(new CartographDTO(
						player.getUsername(),
						player.getPasswordHash(),
						player.getEmail(),
						player.getPhotoLink(),
						player.getPoints(),
						player.getBanStatus(),
						player.getEnabled(),
						player.getActivity(),
						player.getExperience(),
						authorityLevel,
						((Cartograph) player).getIban(),
						((Cartograph) player).getIdPhotoLink(),
						((Cartograph) player).getConfirmed()));
			} else {
				authorityLevel = "player";
				playerDTOList.add(new PlayerDTO(
						player.getUsername(),
						player.getPasswordHash(),
						player.getEmail(),
						player.getPhotoLink(),
						player.getPoints(),
						player.getBanStatus(),
						player.getEnabled(),
						player.getActivity(),
						player.getExperience(),
						authorityLevel));
			}
		}
		
		return playerDTOList;
	}
	
}