package hr.fer.progi.ferllowship.geofighter.dao;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import hr.fer.progi.ferllowship.geofighter.model.Location;

public interface LocationRepository extends JpaRepository<Location, UUID> {

	Location findByLocationName(String username);
	
}