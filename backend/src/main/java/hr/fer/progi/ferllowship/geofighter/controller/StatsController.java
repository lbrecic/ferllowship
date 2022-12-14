package hr.fer.progi.ferllowship.geofighter.controller;

import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.progi.ferllowship.geofighter.dao.FightRepository;
import hr.fer.progi.ferllowship.geofighter.dto.FightDTO;
import hr.fer.progi.ferllowship.geofighter.dto.GlobalStatsDTO;
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
	@GetMapping("/stats/fights")
	public List<FightDTO> getAllFights() {
		Player player = playerService.getLoggedInPlayer();

		return fightRepository.findAll().stream()
			.filter(fight ->
				fight.getWinner().getUsername().equals(player.getUsername()) ||
				fight.getLoser().getUsername().equals(player.getUsername())
			)
			.map(fight ->
				new FightDTO(
					fight.getStart().atZone(ZoneId.systemDefault()).toEpochSecond(),
					fight.getDuration().getSeconds(),
					fight.getWinner().getUsername(),
					fight.getLoser().getUsername()
				)
			)
			.sorted(Comparator.comparing(FightDTO::getStart).reversed())
			.limit(10)
			.collect(Collectors.toList());
	}
	
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

		List<PlayerDTO> allPlayers = playerService.getAllPlayers();
		allPlayers.sort(Comparator.comparing(PlayerDTO::getPoints).reversed());
		Integer rank = IntStream.range(0, allPlayers.size())
			.filter(i -> allPlayers.get(i).getUsername().equals(player.getUsername()))
			.findFirst()
			.orElse(-1);

		Integer fightsLost = fightsParticipatedIn - fightsWon;
		return new PersonalStatsDTO(
			fightsParticipatedIn,
			fightsWon,
			fightsLost,
			player.getPoints(),
			player.getExperience(),
			rank
		);
	}
	
	@PreAuthorize("hasAnyRole('ADMIN','CARTOGRAPH','PLAYER')")
	@GetMapping("/stats/global")
	public List<GlobalStatsDTO> getGlobalStats() {
		List<GlobalStatsDTO> stats = new ArrayList<>();
		
		List<PlayerDTO> allPlayers = playerService.getAllPlayers();
		for (PlayerDTO player : allPlayers) {
			stats.add(new GlobalStatsDTO(player.getUsername(), player.getPoints(), player.getPhotoLink()));
		}

		stats.sort(Comparator.comparing(GlobalStatsDTO::getPoints).reversed());

		int rank = 1;
		for (GlobalStatsDTO stat : stats) {
			stat.setRank(rank++);
		}

		return stats;
	}
	
}
