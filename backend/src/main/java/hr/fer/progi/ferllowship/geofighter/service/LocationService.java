package hr.fer.progi.ferllowship.geofighter.service;

import java.io.IOException;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import hr.fer.progi.ferllowship.geofighter.dao.CategoryRepository;
import hr.fer.progi.ferllowship.geofighter.dao.LocationRepository;
import hr.fer.progi.ferllowship.geofighter.dto.LocationDTO;
import hr.fer.progi.ferllowship.geofighter.model.Location;

@Service
public class LocationService {
	
	@Autowired
	private LocationRepository locationRepository;

	@Autowired
	private CategoryRepository categoryRepository;
	
	@Autowired
	private CloudinaryService cloudinaryService;
	
	public String changeLocationData(String locationName,
									String newLocationName,
									String locationDesc,
									MultipartFile locationPhoto,
									LocationDTO.Coordinates coordinates,
									String categoryName,
									String status) throws IOException {
		
		Location location = locationRepository.findByLocationName(locationName);
		if (location == null) {
			return "No such location in database!";
		}
		
		if (!newLocationName.isBlank()) {
			location.setLocationName(newLocationName);
		}
		if (!locationDesc.isBlank()) {
			location.setLocationDesc(locationDesc);
		}
		if (!Arrays.equals(locationPhoto.getBytes(), new byte[0])) {
			location.setLocationPhoto(cloudinaryService.upload(locationPhoto.getBytes()));
		}
		if (coordinates.lat >= -90 && coordinates.lat <= 90 && 
				coordinates.lng > -180 && coordinates.lng <= 180) {
			location.setCoordinates(coordinates.lat + ";" + coordinates.lng);
		}
		if (!categoryName.isBlank()) {
			location.setCategory(categoryRepository.findByCategoryName(categoryName));
		}
		if (!status.isBlank()) {
			int statusValue = Integer.parseInt(status);
			if (statusValue >= 0 && statusValue <= 3) {
				location.setLocationStatus(statusValue);
			}
		}
		locationRepository.save(location);

		return "Location changes successfully saved.";
	}
}
