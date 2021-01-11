package hr.fer.progi.ferllowship.geofighter.service;

import org.springframework.beans.factory.annotation.Autowired;

import hr.fer.progi.ferllowship.geofighter.dao.PlayerRepository;
import hr.fer.progi.ferllowship.geofighter.model.Player;

public class FightService {
	
	@Autowired
	private PlayerRepository playerRepository;
	
	public void updateEloRatingOfPlayers(String winnerUsername, String loserUsername) {
		Player winner = playerRepository.findByUsername(winnerUsername);
		Player loser = playerRepository.findByUsername(loserUsername);
		
		int Kfactor = 20; //mozda napraviti da bude veci K za igrace s manje exp, a manji za one s vise exp
		
		int winnersOldPoints = winner.getPoints();
		int losersOldPoints = loser.getPoints();
				
		double winnersExpectedScore = 1 / (1 + Math.pow(10, (losersOldPoints-winnersOldPoints)/400));
		double losersExpectedScore = 1 / (1 + Math.pow(10, (winnersOldPoints-losersOldPoints)/400));
		
		int winnersNewPoints = (int) (winnersOldPoints + Kfactor * (1 - winnersExpectedScore));
		int losersNewPoints = (int) (losersOldPoints + Kfactor * (-losersExpectedScore));
		
		winner.setPoints(winnersNewPoints);
		loser.setPoints(losersNewPoints);
		
		playerRepository.save(winner);
		playerRepository.save(loser);
	}
	
}
