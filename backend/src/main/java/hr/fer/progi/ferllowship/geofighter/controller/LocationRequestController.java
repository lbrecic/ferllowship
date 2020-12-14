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
import org.springframework.web.multipart.MultipartFile;

import hr.fer.progi.ferllowship.geofighter.dao.CategoryRepository;
import hr.fer.progi.ferllowship.geofighter.dao.LocationRepository;
import hr.fer.progi.ferllowship.geofighter.dto.LocationDTO;
import hr.fer.progi.ferllowship.geofighter.dto.MessageDTO;
import hr.fer.progi.ferllowship.geofighter.model.Category;
import hr.fer.progi.ferllowship.geofighter.model.Location;
import hr.fer.progi.ferllowship.geofighter.service.CloudinaryService;

public class LocationRequestController {
	
	@Autowired
	private LocationRepository locationRepository;
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@Autowired
	private CloudinaryService cloudinaryService;
	
	@PreAuthorize("hasRole('PLAYER')")
	@PostMapping(path = "/location/requests")
	public MessageDTO createRequest(@RequestPart String locationName,
	                                @RequestPart String locationDesc,
	                                @RequestPart MultipartFile locationPhoto,
	                                @RequestPart String coordinates,
	                                @RequestPart String categoryName) 
	                                throws IOException {
		
		Location location = new Location();
		
		location.setLocationName(locationName);
		location.setLocationDesc(locationDesc);
		location.setLocationPhoto(cloudinaryService.upload(locationPhoto.getBytes()));
		location.setCoordinates(coordinates);
		
		Category category;
		if (! categoryName.equals("")) {
			category = categoryRepository.findByCategoryName(categoryName);
		} else {
			category = null;
		}
			
		location.setCategory(category);
		
		// 0 - odobrena
		// 1 - odbijena
		// 2 - ceka potvrdu
		// 3 - potreban izlazak na teren
		location.setLocationStatus(2);

		locationRepository.save(location);
		
		return new MessageDTO("Zahtjev uspješno zaprimljen.");
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping(path = "/location/requests")
	public List<LocationDTO> getRequests() {
		List<LocationDTO> response = new ArrayList<>();
		
		for (Location location : locationRepository.findAll()) {
			if (location.getLocationStatus() == 2) {
				
				if (location.getCategory() == null ||
						location.getCoordinates().equals("") ||
						location.getLocationDesc().equals("") ||
						location.getLocationName().equals("")) {
					
					location.setLocationStatus(3);
					
				} else {
					response.add(
							new LocationDTO(
									location.getLocationName(),
									location.getLocationDesc(),
									location.getLocationPhoto(),
									location.getLocationStatus(),
									location.getCoordinates(),
									location.getCategory()
							)
					);
				}
			}
		}
		
        return response;
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping(path = "/location/requests/accept")
	public MessageDTO acceptRequest(@RequestParam String locationName) {
		Location location = locationRepository.findByLocationName(locationName);
		if (location == null) {
			return new MessageDTO("Zahtjev nije pronađen.");
		}
		
		location.setLocationStatus(0);
		locationRepository.save(location);
		
		return new MessageDTO("Zahtjev prihvaćen.");
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping(path = "/location/requests/decline")
	public MessageDTO declineRequest(@RequestParam String locationName) {
		Location location = locationRepository.findByLocationName(locationName);
		if (location == null) {
			return new MessageDTO("Zahtjev nije pronađen.");
		}
		
		// zanima me zasto je u specifikaciji igre 
		// postavljeno da stavljamo 1-odbijena
		// to znaci da ju ne smijemo brisati
		// jer je cilj igre popuniti manjkavu bazu ?
		location.setLocationStatus(1);
		//locationRepository.delete(location);
		//locationRepository.flush();
		
		return new MessageDTO("Zahtjev odbijen.");
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping(path = "/location/requests")
	public List<LocationDTO> getTerrainActionNeeded() {
		List<LocationDTO> response = new ArrayList<>();
		
		for (Location location : locationRepository.findAll()) {
			if (location.getLocationStatus() == 3) {
				response.add(
						new LocationDTO(
								location.getLocationName(),
								location.getLocationDesc(),
								location.getLocationPhoto(),
								location.getLocationStatus(),
								location.getCoordinates(),
								location.getCategory()
						)
				);
			}
		}
		
        return response;
	}
}
