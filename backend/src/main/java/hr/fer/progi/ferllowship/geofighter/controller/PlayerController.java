package hr.fer.progi.ferllowship.geofighter.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.progi.ferllowship.geofighter.dao.PlayerRepository;
import hr.fer.progi.ferllowship.geofighter.dto.PlayerDTO;
import hr.fer.progi.ferllowship.geofighter.model.Admin;
import hr.fer.progi.ferllowship.geofighter.model.Cartograph;
import hr.fer.progi.ferllowship.geofighter.model.Player;

@RestController
public class PlayerController {
	
	@Autowired
	private PlayerRepository playerRepository;
	
	@PreAuthorize("hasAnyRole('ADMIN','CARTOGRAPH','PLAYER')")
	@GetMapping(path = "/player")
	public PlayerDTO getLoggedInPlayer() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		Player player = playerRepository.findByUsername(auth.getName());
				
		String authorityLevel;
		if (player instanceof Admin) {
			authorityLevel = "admin";
		} else if (player instanceof Cartograph && ((Cartograph) player).getConfirmed()) {
			authorityLevel = "cartograph";
		} else {
			authorityLevel = "player";
		}
		
		List<GrantedAuthority> updatedAuthorities = new ArrayList<>();
		updatedAuthorities.add(new SimpleGrantedAuthority("ROLE_" + authorityLevel.toUpperCase()));
		Authentication newAuth = new UsernamePasswordAuthenticationToken(
			auth.getPrincipal(), 
			auth.getCredentials(), 
			updatedAuthorities
		);
		SecurityContextHolder.getContext().setAuthentication(newAuth);

		return new PlayerDTO(
				player.getUsername(),
				player.getPasswordHash(),
				player.getEmail(),
				player.getPhotoLink(),
				player.getPoints(),
				player.getBanStatus(),
				player.getEnabled(),
				player.getActivity(),
				player.getExperience(),
				authorityLevel
		);
	}

}
