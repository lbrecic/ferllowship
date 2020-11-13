package hr.fer.progi.ferllowship.geofighter.model;

import java.util.UUID;

import javax.persistence.*;

@Entity
public class Category {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "category_id", updatable = false, nullable = false)
	private UUID categoryId;
	
	@Column(name = "category_name", length = 32)
	private String categoryName;
	
	@Column(name = "category_points")
	private Integer categoryPoints;
	
	public Category() {}
	
	public Category(String name, Integer points) {
		this.categoryName = name;
		this.categoryPoints = points;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public Integer getCategoryPoints() {
		return categoryPoints;
	}

	public void setCategoryPoints(Integer categoryPoints) {
		this.categoryPoints = categoryPoints;
	}

	public UUID getCategoryId() {
		return categoryId;
	}
	
}
