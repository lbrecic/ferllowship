package hr.fer.progi.ferllowship.geofighter.dao;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import hr.fer.progi.ferllowship.geofighter.model.Ban;
import hr.fer.progi.ferllowship.geofighter.model.Player;

public interface BanRepository extends JpaRepository<Ban, UUID> {
	Ban findByPlayer(Player player);
}
