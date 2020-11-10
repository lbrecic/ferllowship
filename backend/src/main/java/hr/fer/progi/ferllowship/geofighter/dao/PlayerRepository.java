package hr.fer.progi.ferllowship.geofighter.dao;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

import hr.fer.progi.ferllowship.geofighter.model.Player;

public interface PlayerRepository extends CrudRepository<Player, UUID> {
	
	Player findByEmail(String email);
	
	Player findByUsername(String username);
	
}
