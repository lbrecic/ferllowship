package hr.fer.progi.ferllowship.geofighter.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hr.fer.progi.ferllowship.geofighter.dao.PlayerRepository;
import hr.fer.progi.ferllowship.geofighter.model.Player;

@Service
public class PlayerManageService {
	
	@Autowired
	private PlayerRepository playerList;
	
	public List<Player> getPlayerList() {
		return playerList.findAll();
	}
}
