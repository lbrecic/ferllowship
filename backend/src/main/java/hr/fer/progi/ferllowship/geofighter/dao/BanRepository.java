package hr.fer.progi.ferllowship.geofighter.dao;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

import hr.fer.progi.ferllowship.geofighter.model.Ban;

public interface BanRepository extends CrudRepository<Ban, UUID> {}
