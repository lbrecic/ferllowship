package hr.fer.progi.ferllowship.geofighter.model;

import java.util.UUID;

import javax.persistence.*;

@Entity
public class Location {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "location_id", updatable = false, nullable = false)
	private UUID locationId;
	
	@Column(name = "location_name", length = 32)
	private String locationName;
	
	@Column(name = "location_desc")
	private String locationDesc;
	
	@Column(name = "location_photo_link", length = 200)
	private String locationPhoto;
	
	@Column(name = "location_status")
	private Integer locationStatus;
	
	@Column(length = 32)
	private String coordinates;
	
	@ManyToOne(targetEntity = Category.class, fetch = FetchType.EAGER)
	@JoinColumn(name = "category_id")
	private Category category;
	
	public Location() {}
	
	public Location(String name, String desc, String photo, String coordinates, Category category) {
		this.locationName = name;
		this.locationDesc = desc;
		this.locationPhoto = photo;
		this.coordinates = coordinates;
		this.category = category;
		locationStatus = 0;
	}

	public String getLocationName() {
		return locationName;
	}

	public void setLocationName(String locationName) {
		this.locationName = locationName;
	}

	public String getLocationDesc() {
		return locationDesc;
	}

	public void setLocationDesc(String locationDesc) {
		this.locationDesc = locationDesc;
	}

	public String getLocationPhoto() {
		return locationPhoto;
	}

	public void setLocationPhoto(String locationPhoto) {
		this.locationPhoto = locationPhoto;
	}

	public Integer getLocationStatus() {
		return locationStatus;
	}

	public void setLocationStatus(Integer locationStatus) {
		this.locationStatus = locationStatus;
	}

	public String getCoordinates() {
		return coordinates;
	}

	public void setCoordinates(String coordinates) {
		this.coordinates = coordinates;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public UUID getLocationId() {
		return locationId;
	}
}
