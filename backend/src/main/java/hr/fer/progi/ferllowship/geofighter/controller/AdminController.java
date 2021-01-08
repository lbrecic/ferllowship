package hr.fer.progi.ferllowship.geofighter.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.progi.ferllowship.geofighter.dao.BanRepository;
import hr.fer.progi.ferllowship.geofighter.dao.PlayerRepository;
import hr.fer.progi.ferllowship.geofighter.dto.PlayerDTO;
import hr.fer.progi.ferllowship.geofighter.model.Ban;
import hr.fer.progi.ferllowship.geofighter.model.Player;
import hr.fer.progi.ferllowship.geofighter.service.PlayerService;

@RestController
public class AdminController {

	@Autowired
	private PlayerService playerService;

	@Autowired
	private PlayerRepository playerRepository;

	@Autowired
	private BanRepository banRepository;

	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping(path = "/allPlayers")
	public List<PlayerDTO> getAllPlayers() {
		return getAll("PLAYER");
	}

	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping(path = "/allCartographs")
	public List<PlayerDTO> getAllCartographs() {
		return getAll("CARTOGRAPH");
	}

	@PreAuthorize("hasRole('ADMIN')")
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
	public void banPlayer(@RequestPart String username, @RequestPart String banStatus, @RequestPart String banEnd) {
		Player player = playerRepository.findByUsername(username);

		player.setBanStatus(Integer.parseInt(banStatus));
		playerRepository.save(player);

		if (Integer.parseInt(banStatus) == BAN_STATUS.TEMPORARY.value) {
			Ban ban = new Ban();
			ban.setPlayer(player);
			/*
			 * Format datuma 'mm-dd-yyyy'
			 */
			final DateTimeFormatter dtf = DateTimeFormatter.ofPattern("MM-dd-yyyy");
			final LocalDate banDate = LocalDate.parse(banEnd, dtf);
			ban.setBanEnd(banDate);

			banRepository.save(ban);
		}
	}

}
