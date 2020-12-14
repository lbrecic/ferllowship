package hr.fer.progi.ferllowship.geofighter.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import hr.fer.progi.ferllowship.geofighter.dao.PlayerRepository;
import hr.fer.progi.ferllowship.geofighter.model.Admin;
import hr.fer.progi.ferllowship.geofighter.model.Cartograph;
import hr.fer.progi.ferllowship.geofighter.model.Player;

@Service
public class PlayerService {

    @Autowired
    private PlayerRepository playerRepository;

    public Player getLoggedInPlayer() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return playerRepository.findByUsername(auth.getName());
    }

    public String getAuthorityLevelOfPlayer(Player player) {
        String authorityLevel;
        if (player instanceof Admin) {
            authorityLevel = "admin";
        } else if (player instanceof Cartograph && ((Cartograph) player).getConfirmed()) {
            authorityLevel = "cartograph";
        } else {
            authorityLevel = "player";
        }

        return  authorityLevel;
    }

    public String getAuthorityLevelOfLoggedInPlayer() {
        Player player = getLoggedInPlayer();
        return getAuthorityLevelOfPlayer(player);
    }

    public void updateRoleOfLoggedInPlayer(String role) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        List<GrantedAuthority> updatedAuthorities = new ArrayList<>();
        updatedAuthorities.add(new SimpleGrantedAuthority(role));
        Authentication newAuth = new UsernamePasswordAuthenticationToken(
            auth.getPrincipal(),
            auth.getCredentials(),
            updatedAuthorities
        );
        SecurityContextHolder.getContext().setAuthentication(newAuth);
    }

}
