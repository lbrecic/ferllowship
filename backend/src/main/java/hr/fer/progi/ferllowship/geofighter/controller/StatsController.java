package hr.fer.progi.ferllowship.geofighter.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.progi.ferllowship.geofighter.dao.FightRepository;
import hr.fer.progi.ferllowship.geofighter.dto.GlobalStatDTO;
import hr.fer.progi.ferllowship.geofighter.dto.PersonalStatsDTO;
import hr.fer.progi.ferllowship.geofighter.dto.PlayerDTO;
import hr.fer.progi.ferllowship.geofighter.model.Fight;
import hr.fer.progi.ferllowship.geofighter.model.Player;
import hr.fer.progi.ferllowship.geofighter.service.PlayerService;

@RestController
public class StatsController {
	
	@Autowired
	private PlayerService playerService;
	
	@Autowired
	private FightRepository fightRepository;
	
	@PreAuthorize("hasAnyRole('ADMIN','CARTOGRAPH','PLAYER')")
	@GetMapping("/stats/personal")
	public PersonalStatsDTO getPersonalStats() {
		Player player = playerService.getLoggedInPlayer();
		List<Fight> allFights = fightRepository.findAll();
		Integer fightsParticipatedIn = 0;
		Integer fightsWon = 0;
		for (Fight fight : allFights) {
			if (fight.getWinner().getUsername().equals(player.getUsername())) { 
				fightsWon++;
				fightsParticipatedIn++;
			} else if (fight.getLoser().getUsername().equals(player.getUsername())) {
				fightsParticipatedIn++;
			}
		}
		
		return new PersonalStatsDTO(fightsParticipatedIn, 
									fightsWon,
									player.getPoints(),
									player.getExperience()
				);
	}
	
	@PreAuthorize("hasAnyRole('ADMIN','CARTOGRAPH','PLAYER')")
	@GetMapping("/stats/global")
	public List<GlobalStatDTO> getGlobalStats() {
		List<GlobalStatDTO> stats = new ArrayList<>();
		
		List<PlayerDTO> allPlayers = playerService.getAllPlayers();
		for (PlayerDTO player : allPlayers) {
			stats.add(new GlobalStatDTO(player.getUsername(), player.getPoints(), player.getPhotoLink()));
		}
		
		Collections.sort(stats, new Comparator<GlobalStatDTO>() {
			@Override
			  public int compare(GlobalStatDTO u1, GlobalStatDTO u2) {
			    return u2.getPoints() - u1.getPoints();
			  }
		});		
		return stats;
	}
	
}
