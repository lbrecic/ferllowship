package hr.fer.progi.ferllowship.geofighter.dao;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import hr.fer.progi.ferllowship.geofighter.model.Player;

public interface PlayerRepository extends JpaRepository<Player, UUID> {
	
	Player findByEmail(String email);
	
	Player findByUsername(String username);
	
	List<Player> findAll();
	
}
