package hr.fer.progi.ferllowship.geofighter.controller;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import hr.fer.progi.ferllowship.geofighter.dao.BanRepository;
import hr.fer.progi.ferllowship.geofighter.dao.PlayerRepository;
import hr.fer.progi.ferllowship.geofighter.dto.LocationDTO;
import hr.fer.progi.ferllowship.geofighter.dto.MessageDTO;
import hr.fer.progi.ferllowship.geofighter.dto.PlayerDTO;
import hr.fer.progi.ferllowship.geofighter.model.Admin;
import hr.fer.progi.ferllowship.geofighter.model.Ban;
import hr.fer.progi.ferllowship.geofighter.model.Cartograph;
import hr.fer.progi.ferllowship.geofighter.model.Player;
import hr.fer.progi.ferllowship.geofighter.service.CloudinaryService;
import hr.fer.progi.ferllowship.geofighter.service.LocationService;
import hr.fer.progi.ferllowship.geofighter.service.PlayerService;

@RestController
public class AdminController {

	@Autowired
	private PlayerService playerService;

	@Autowired
	private PlayerRepository playerRepository;

	@Autowired
	private BanRepository banRepository;
	
	@Autowired
	private LocationService locationService;

	@Autowired
	private CloudinaryService cloudinaryService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@PreAuthorize("hasAnyRole('ADMIN','CARTOGRAPH','PLAYER')")
	@GetMapping(path = "/allPlayers")
	public List<PlayerDTO> getAllPlayers() {
		return getAll("PLAYER");
	}

	@PreAuthorize("hasAnyRole('ADMIN','CARTOGRAPH','PLAYER')")
	@GetMapping(path = "/allCartographs")
	public List<PlayerDTO> getAllCartographs() {
		return getAll("CARTOGRAPH");
	}

	@PreAuthorize("hasAnyRole('ADMIN','CARTOGRAPH','PLAYER')")
	@GetMapping(path = "/allAdmins")
	public List<PlayerDTO> getAllAdmins() {
		return getAll("ADMIN");
	}

	public List<PlayerDTO> getAll(String role) {
		List<PlayerDTO> response = new ArrayList<>();

		for (PlayerDTO user : playerService.getAllPlayers()) {
			if (user.getAuthorityLevel().toUpperCase().equals(role)) {
				response.add(user);
			}
		}

		return response;
	}

	private enum BAN_STATUS {
		UNBANNED(0), TEMPORARY(1), PERMANENT(2);

		public final int value;

		BAN_STATUS(int value) {
			this.value = value;
		}
	}

	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping(path = "/player/ban")
	public MessageDTO banPlayer(@RequestPart String username, @RequestPart String banStatus,
								@RequestPart String banEnd) {

		Player player = playerRepository.findByUsername(username);

		Integer status = Integer.parseInt(banStatus);

		if (player.getBanStatus() == 1 && status == 1) {
			Ban ban = banRepository.findByPlayer(player);

			String[] date = banEnd.split(" ");
			String dt = date[1] + "-" + date[2] + "-" + date[3];

			final DateTimeFormatter dtf = DateTimeFormatter.ofPattern("MMM-dd-yyyy");
			final LocalDate banDate = LocalDate.parse(dt, dtf);
			ban.setBanEnd(banDate);

			banRepository.save(ban);
		} else if (player.getBanStatus() != 1 && status == BAN_STATUS.TEMPORARY.value) {
			Ban ban = new Ban();
			ban.setPlayer(player);

			String[] date = banEnd.split(" ");
			String dt = date[1] + "-" + date[2] + "-" + date[3];

			final DateTimeFormatter dtf = DateTimeFormatter.ofPattern("MMM-dd-yyyy");
			final LocalDate banDate = LocalDate.parse(dt, dtf);
			ban.setBanEnd(banDate);

			banRepository.save(ban);
		} else if (player.getBanStatus() == 1 && status != 1) {
			Ban ban = banRepository.findByPlayer(player);
			banRepository.delete(ban);
		}

		player.setBanStatus(status);
		playerRepository.save(player);

		return new MessageDTO("Changes saved successfully.");
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping(path = "/player/promote")
	public MessageDTO promotePlayerToAdmin(@RequestParam String email) {
		Player player = playerRepository.findByEmail(email);
		String iban = "";
		String idPhotoLink = "";
		if (player instanceof Admin) {
			return new MessageDTO("Player is already an admin!");
		} else if (player instanceof Cartograph) {
			iban = ((Cartograph) player).getIban();
			idPhotoLink = ((Cartograph) player).getIdPhotoLink();
		}
		playerService.changeRoleToAdmin(player, iban, idPhotoLink);
		
		return new MessageDTO("Player's role successfully changed.");
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping(path = "/player/changeRole")
	public MessageDTO changeRoleOfPlayer(/*@RequestPart String username,
										@RequestPart String newRole*/
			@RequestParam("username") String username,
			@RequestParam("newRole") String newRole) throws IOException {
		Player player = playerRepository.findByUsername(username);
		
		switch(newRole) {
		case "player":
			if (player instanceof Cartograph || player instanceof Admin) {
				// request pri testiranju vraca internal server error,
				// ali uloga korisnika se uspjesno u bazi promijeni u igraca
				playerService.changeRoleToPlayer(player);
			} else {
				return new MessageDTO("User is already just a player!");
			}
			break;
		case "cartograph":
			if (player instanceof Cartograph) {
				return new MessageDTO("Player is already a cartographer!");
			} 
			playerService.changeRoleToCartograph(player, "", "", true);
			break;
		case "admin":
			if (player instanceof Admin) {
				return new MessageDTO("Player is already an admin!");
			} 
			playerService.changeRoleToAdmin(player, "", "");
			break;
		default:
			return new MessageDTO("Role was incorrectly entered!");
		}
		return new MessageDTO("Player's role successfully changed!");
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping(path = "/location/edit")
	public MessageDTO editLocation(@RequestPart String locationName,
									@RequestPart String newLocationName,
            						@RequestPart String locationDesc,
            						@RequestPart MultipartFile locationPhoto,
            						@RequestPart LocationDTO.Coordinates coordinates,
            						@RequestPart String categoryName) throws IOException {
		
		String message = locationService.changeLocationData(locationName,
				newLocationName, locationDesc, locationPhoto, coordinates, categoryName);
		return new MessageDTO(message);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping(path = "/admin/playerEdit")
	public MessageDTO editProfile(@RequestPart String username,
								  @RequestPart String password,
								  @RequestPart String email,
								  @RequestPart MultipartFile picture)
			throws IOException {

		Player player = playerRepository.findByUsername(username);

		if (!password.isBlank()) {	
			player.setPasswordHash(passwordEncoder.encode(password));
		}
		
		if (!email.isBlank()) {
			player.setEmail(email);
		}
		
		byte comparisonBytes[] = new byte[0] /*{0x1a, 0x1c}*/;
		if (!Arrays.equals(picture.getBytes(), comparisonBytes)) {
			player.setPhotoLink(cloudinaryService.upload(picture.getBytes()));
		}

		playerRepository.save(player);

		return new MessageDTO("Changes saved successfully.");
	}
		
}
