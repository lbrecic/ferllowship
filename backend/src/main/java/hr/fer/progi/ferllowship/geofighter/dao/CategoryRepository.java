package hr.fer.progi.ferllowship.geofighter.dao;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

import hr.fer.progi.ferllowship.geofighter.model.Category;

public interface CategoryRepository extends CrudRepository<Category, UUID> {}
