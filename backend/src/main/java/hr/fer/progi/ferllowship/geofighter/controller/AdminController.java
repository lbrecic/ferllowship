package hr.fer.progi.ferllowship.geofighter.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.progi.ferllowship.geofighter.dao.PlayerRepository;
import hr.fer.progi.ferllowship.geofighter.dto.AdminDTO;
import hr.fer.progi.ferllowship.geofighter.dto.CartographDTO;
import hr.fer.progi.ferllowship.geofighter.dto.PlayerDTO;
import hr.fer.progi.ferllowship.geofighter.model.Admin;
import hr.fer.progi.ferllowship.geofighter.model.Cartograph;
import hr.fer.progi.ferllowship.geofighter.model.Player;
import hr.fer.progi.ferllowship.geofighter.service.PlayerService;

@RestController
public class AdminController {

	@Autowired
	private PlayerRepository playerRepository;

	@Autowired
	private PlayerService playerService;

	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping(path = "/allPlayers")
	public List<PlayerDTO> getAllPlayers() {
		List<PlayerDTO> playerDTOList = new ArrayList<>();
		List<Player> playerList = playerRepository.findAll();

		for (Player player : playerList) {
			String authorityLevel = playerService.getAuthorityLevelOfPlayer(player);
			PlayerDTO playerDTO;

			switch (authorityLevel) {
				case "admin":
					playerDTO = new AdminDTO(
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
						((Admin) player).getIdPhotoLink()
					);
					break;
				case "cartograph":
					playerDTO = new CartographDTO(
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
						((Cartograph) player).getConfirmed()
					);
					break;
				default:
					playerDTO = new PlayerDTO(
						player.getUsername(),
						player.getPasswordHash(),
						player.getEmail(),
						player.getPhotoLink(),
						player.getPoints(),
						player.getBanStatus(),
						player.getEnabled(),
						player.getActivity(),
						player.getExperience(),
						authorityLevel
					);
					break;
			}

			playerDTOList.add(playerDTO);
		}

		return playerDTOList;
	}
	
}
