package hr.fer.progi.ferllowship.geofighter.configuration;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import hr.fer.progi.ferllowship.geofighter.dao.BanRepository;
import hr.fer.progi.ferllowship.geofighter.dao.PlayerRepository;
import hr.fer.progi.ferllowship.geofighter.model.Admin;
import hr.fer.progi.ferllowship.geofighter.model.Ban;
import hr.fer.progi.ferllowship.geofighter.model.Cartograph;
import hr.fer.progi.ferllowship.geofighter.model.Player;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

	@Autowired
	private PlayerRepository playerRepository;

	@Autowired
	private BanRepository banRepository;

	@Override
	public Authentication authenticate(Authentication auth) throws AuthenticationException {
		String username = auth.getName();
		String password = auth.getCredentials().toString();

		Player player = playerRepository.findByUsername(username);

		if (player != null && passwordEncoder().matches(password, player.getPasswordHash()) && player.getEnabled()) {

			if (player.getBanStatus() == 1) {
				Ban ban = banRepository.findByPlayer(player);

				if (ban.getBanEnd().isBefore(LocalDate.now())) {
					player.setBanStatus(0);
					playerRepository.save(player);
					banRepository.delete(ban);
				} else {
					throw new BadCredentialsException("Authentication failed.");
				}

			} else if (player.getBanStatus() == 2) {
				throw new BadCredentialsException("Authentication failed.");
			}

			List<GrantedAuthority> authorities = new ArrayList<>();

			if (player instanceof Admin) {
				authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
			} else if (player instanceof Cartograph && ((Cartograph) player).getConfirmed()) {
				authorities.add(new SimpleGrantedAuthority("ROLE_CARTOGRAPH"));
			} else {
				authorities.add(new SimpleGrantedAuthority("ROLE_PLAYER"));
			}

			return new UsernamePasswordAuthenticationToken(username, password, authorities);

		} else {
			throw new BadCredentialsException("Authentication failed.");
		}
	}

	@Override
	public boolean supports(Class<?> auth) {
		return auth.equals(UsernamePasswordAuthenticationToken.class);
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

}
