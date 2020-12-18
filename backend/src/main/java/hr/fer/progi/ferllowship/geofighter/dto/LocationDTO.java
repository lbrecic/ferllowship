package hr.fer.progi.ferllowship.geofighter.dto;

import hr.fer.progi.ferllowship.geofighter.model.Category;

public class LocationDTO {

	public static class Coordinates {
		public double lat;
		public double lng;

		public Coordinates() {

		}

		public Coordinates(double lat, double lng) {
			this.lat = lat;
			this.lng = lng;
		}
	}
	
	private String locationName;
	
	private String locationDesc;
	
	private String locationPhoto;
	
	private Integer locationStatus;

	private Coordinates coordinates;
	
	private CategoryDTO category;

	public LocationDTO(String locationName, String locationDesc, String locationPhoto, Integer locationStatus,
					   Coordinates coordinates, CategoryDTO category) {
		this.locationName = locationName;
		this.locationDesc = locationDesc;
		this.locationPhoto = locationPhoto;
		this.locationStatus = locationStatus;
		this.coordinates = coordinates;
		this.category = category;
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

	public Coordinates getCoordinates() {
		return coordinates;
	}

	public void setCoordinates(Coordinates coordinates) {
		this.coordinates = coordinates;
	}

	public CategoryDTO getCategory() {
		return category;
	}

	public void setCategory(CategoryDTO category) {
		this.category = category;
	}

}
