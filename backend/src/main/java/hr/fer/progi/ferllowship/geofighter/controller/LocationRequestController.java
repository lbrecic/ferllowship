package hr.fer.progi.ferllowship.geofighter.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import hr.fer.progi.ferllowship.geofighter.dao.CategoryRepository;
import hr.fer.progi.ferllowship.geofighter.dao.LocationRepository;
import hr.fer.progi.ferllowship.geofighter.dto.CategoryDTO;
import hr.fer.progi.ferllowship.geofighter.dto.LocationDTO;
import hr.fer.progi.ferllowship.geofighter.dto.MessageDTO;
import hr.fer.progi.ferllowship.geofighter.model.Location;
import hr.fer.progi.ferllowship.geofighter.service.CloudinaryService;

@RestController
public class LocationRequestController {
	
	@Autowired
	private LocationRepository locationRepository;
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@Autowired
	private CloudinaryService cloudinaryService;

	private enum LOCATION_STATUS {
		ACCEPTED(0),
		DECLINED(1),
		NEEDS_APPROVAL(2),
		NEEDS_FIELD_CONFIRMATION(3);

		public final int value;

		LOCATION_STATUS(int value) {
			this.value = value;
		}
	}

	@PreAuthorize("hasAnyRole('ADMIN','CARTOGRAPH','PLAYER')")
	@PostMapping(path = "/location/requests")
	public MessageDTO createRequest(@RequestPart String locationName,
	                                @RequestPart String locationDesc,
	                                @RequestPart MultipartFile locationPhoto,
	                                @RequestPart LocationDTO.Coordinates coordinates,
	                                @RequestPart String categoryName) 
	                                throws IOException {
		
		Location location = new Location();
		location.setLocationName(locationName);
		location.setLocationDesc(locationDesc);
		location.setLocationPhoto(cloudinaryService.upload(locationPhoto.getBytes()));
		location.setCoordinates(coordinates.lat + ";" + coordinates.lng);
		location.setCategory(categoryRepository.findByCategoryName(categoryName));
		location.setLocationStatus(LOCATION_STATUS.NEEDS_APPROVAL.value);
		locationRepository.save(location);
		
		return new MessageDTO("Zahtjev uspješno zaprimljen.");
	}

	@PreAuthorize("hasAnyRole('ADMIN','CARTOGRAPH','PLAYER')")
	@GetMapping(path = "/location/requests")
	public List<LocationDTO> getRequestsWithStatus(@RequestParam int status) {
		List<LocationDTO> response = new ArrayList<>();
		
		for (Location location : locationRepository.findAll()) {
			if (location.getLocationStatus() == status) {
				double lat = Double.parseDouble(location.getCoordinates().split(";")[0]);
				double lng = Double.parseDouble(location.getCoordinates().split(";")[1]);
				response.add(
					new LocationDTO(
						location.getLocationName(),
						location.getLocationDesc(),
						location.getLocationPhoto(),
						location.getLocationStatus(),
						new LocationDTO.Coordinates(lat, lng),
						new CategoryDTO(
							location.getCategory().getCategoryName(),
							location.getCategory().getCategoryPoints()
						)
					)
				);
			}
		}
		
		if (response.isEmpty()) {
			response.add(null);
		}
		
        return response;
	}

	@PreAuthorize("hasAnyRole('ADMIN','CARTOGRAPH')")
	@GetMapping(path = "/location/requests/update")
	public MessageDTO updateRequestStatus(@RequestParam String locationName,
										  @RequestParam int status) {

		Location location = locationRepository.findByLocationName(locationName);
		if (location == null) {
			return new MessageDTO("Zahtjev nije pronađen.");
		}

		location.setLocationStatus(status);
		locationRepository.save(location);

		return new MessageDTO("Zahtjev obrađen.");
	}

}
