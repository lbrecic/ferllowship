package hr.fer.progi.ferllowship.geofighter.security;

import java.nio.charset.StandardCharsets;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

import com.google.common.hash.Hashing;

import hr.fer.progi.ferllowship.geofighter.dao.PlayerRepository;
import hr.fer.progi.ferllowship.geofighter.model.Player;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {
	
	@Autowired
	private PlayerRepository playerRepository;
	
    @Override
    public Authentication authenticate(Authentication auth) throws AuthenticationException {
        String username = auth.getName();
        String password = auth.getCredentials().toString();
        
        Player player = playerRepository.findByUsername(username);
		String passwordHash = 
			Hashing.sha256().hashString(password, StandardCharsets.UTF_8).toString();
 
        if (player != null && player.getPasswordHash().equals(passwordHash) && player.getEnabled()) {
            return new UsernamePasswordAuthenticationToken
              (username, password, Collections.emptyList());
        } else {
            throw new 
              BadCredentialsException("Authentication failed.");
        }
    }
 
    @Override
    public boolean supports(Class<?> auth) {
        return auth.equals(UsernamePasswordAuthenticationToken.class);
    }
    
}
