package hr.fer.progi.ferllowship.geofighter.dto;

import java.util.HashMap;
import java.util.Map;

import hr.fer.progi.ferllowship.geofighter.model.Category;

public class LocationDTO {
	
	private String locationName;
	
	private String locationDesc;
	
	private String locationPhoto;
	
	private Integer locationStatus;

	private final Map<String, String> coordinates;
	
	private Category category;
	public LocationDTO(String locationName, String locationDesc, String locationPhoto, Integer locationStatus,
			String lat, String lng, Category category) {
		this.locationName = locationName;
		this.locationDesc = locationDesc;
		this.locationPhoto = locationPhoto;
		this.locationStatus = locationStatus;
		this.coordinates = Map.of("lat", lat, "lng", lng);
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

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public String getLatitude() {
		return coordinates.get("lat");
	}

	public void setLatitude(String latitude) {
		this.coordinates.put("lat", latitude);
	}

	public String getLongitude() {
		return coordinates.get("lng");
	}

	public void setLongitude(String longitude) {
		this.coordinates.put("lng", longitude);
	}

}
