package hr.fer.progi.ferllowship.geofighter.service;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hr.fer.progi.ferllowship.geofighter.dao.FightRepository;
import hr.fer.progi.ferllowship.geofighter.dao.PlayerRepository;
import hr.fer.progi.ferllowship.geofighter.dto.FightDTO;
import hr.fer.progi.ferllowship.geofighter.model.Fight;
import hr.fer.progi.ferllowship.geofighter.model.Player;

@Service
public class FightService {
	
	@Autowired
	private PlayerRepository playerRepository;

	@Autowired
	private FightRepository fightRepository;

	public void saveFight(FightDTO fightDTO) {
		Fight fight = new Fight();
		fight.setStart(LocalDateTime.ofInstant(Instant.ofEpochMilli(fightDTO.getStart()), ZoneId.systemDefault()));
		fight.setDuration(Duration.ofSeconds(fightDTO.getDuration()));
		fight.setWinner(playerRepository.findByUsername(fightDTO.getWinner()));
		fight.setLoser(playerRepository.findByUsername(fightDTO.getLoser()));
		fightRepository.save(fight);
		updateEloRatingOfPlayers(fightDTO.getWinner(), fightDTO.getLoser());
	}
	
	public void updateEloRatingOfPlayers(String winnerUsername, String loserUsername) {
		Player winner = playerRepository.findByUsername(winnerUsername);
		Player loser = playerRepository.findByUsername(loserUsername);
		
		int Kfactor = 20; //mozda napraviti da bude veci K za igrace s manje exp, a manji za one s vise exp
		
		int winnersOldPoints = winner.getPoints();
		int losersOldPoints = loser.getPoints();

		System.out.println(winnersOldPoints);
		System.out.println(losersOldPoints);
				
		double winnersExpectedScore = 1 / (1 + Math.pow(10, (losersOldPoints-winnersOldPoints)/400));
		double losersExpectedScore = 1 / (1 + Math.pow(10, (winnersOldPoints-losersOldPoints)/400));
		
		int winnersNewPoints = (int) (winnersOldPoints + Kfactor * (1 - winnersExpectedScore));
		int losersNewPoints = (int) (losersOldPoints + Kfactor * (-losersExpectedScore));

		System.out.println(winnersNewPoints);
		System.out.println(losersNewPoints);

		winner.setPoints(winnersNewPoints);
		loser.setPoints(losersNewPoints);
		
		//update user experience points
		int winnerExp = winner.getExperience();
		winner.setExperience(winnerExp+10);
		int loserExp = loser.getExperience();
		loser.setExperience(loserExp+5);
		
		playerRepository.save(winner);
		playerRepository.save(loser);
	}
	
}
