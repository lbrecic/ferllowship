package hr.fer.progi.ferllowship.geofighter.dao;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import hr.fer.progi.ferllowship.geofighter.model.Category;

public interface CategoryRepository extends JpaRepository<Category, UUID> {

	Category findByCategoryName(String categoryName);
	
}
