package hr.fer.progi.ferllowship.geofighter.controller;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.progi.ferllowship.geofighter.dao.PlayerRepository;
import hr.fer.progi.ferllowship.geofighter.dto.ErrorDTO;
import hr.fer.progi.ferllowship.geofighter.dto.PlayerDTO;
import hr.fer.progi.ferllowship.geofighter.model.Cartograph;
import hr.fer.progi.ferllowship.geofighter.model.Player;

@RestController
public class PlayerController {
	
	@Autowired
	private PlayerRepository playerRepository;
	
	@GetMapping(path = "/player")
	public ResponseEntity<?> getPlayer(@RequestParam String username) {
		Player player = playerRepository.findByUsername(username);
		if (player == null) {
			return ResponseEntity.ok(new ErrorDTO("Igrač ne postoji."));
		}
		
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		Collection<? extends GrantedAuthority> authorities = auth.getAuthorities();
		
		boolean isAdmin = authorities.stream()
			.anyMatch(r -> r.getAuthority().equals("ROLE_ADMIN"));
		boolean isCartograph = authorities.stream()
			.anyMatch(r -> r.getAuthority().equals("ROLE_CARTOGRAPH"));

		if (player instanceof Cartograph && ((Cartograph) player).getConfirmed() && !isCartograph) {
			List<GrantedAuthority> updatedAuthorities = new ArrayList<>();
			updatedAuthorities.add(new SimpleGrantedAuthority("ROLE_CARTOGRAPH"));
			
			Authentication newAuth = new UsernamePasswordAuthenticationToken(
				auth.getPrincipal(), 
				auth.getCredentials(), 
				updatedAuthorities
			);
			
			SecurityContextHolder.getContext().setAuthentication(newAuth);
			isCartograph = true;
		}

		String authorityLevel;
		if (isAdmin) {
			authorityLevel = "admin";
		} else if (isCartograph) {
			authorityLevel = "cartograph";
		} else {
			authorityLevel = "player";
		}

		return ResponseEntity.ok(
			new PlayerDTO(
				player.getUsername(), 
				player.getEmail(), 
				player.getPhotoLink(), 
				authorityLevel
			)
		);
	}

}
