package hr.fer.progi.ferllowship.geofighter.dao;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

import hr.fer.progi.ferllowship.geofighter.model.ConfirmationToken;

public interface ConfirmationTokenRepository extends CrudRepository<ConfirmationToken, UUID> {

	ConfirmationToken findByConfirmationToken(String confirmationToken);
	
}
