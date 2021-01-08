package hr.fer.progi.ferllowship.geofighter.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import hr.fer.progi.ferllowship.geofighter.dao.PlayerRepository;
import hr.fer.progi.ferllowship.geofighter.dto.AdminDTO;
import hr.fer.progi.ferllowship.geofighter.dto.CartographDTO;
import hr.fer.progi.ferllowship.geofighter.dto.PlayerDTO;
import hr.fer.progi.ferllowship.geofighter.model.Admin;
import hr.fer.progi.ferllowship.geofighter.model.Cartograph;
import hr.fer.progi.ferllowship.geofighter.model.Player;
import hr.fer.progi.ferllowship.geofighter.configuration.ActiveUserStore;

@Service
public class PlayerService {

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private ActiveUserStore activeUserStore;

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

    public PlayerDTO playerToPlayerDTO(Player player) {
        String authorityLevel = getAuthorityLevelOfPlayer(player);

        switch (authorityLevel) {
            case "admin":
                return new AdminDTO(
                    player.getUsername(),
                    player.getPasswordHash(),
                    player.getEmail(),
                    player.getPhotoLink(),
                    player.getPoints(),
                    player.getBanStatus(),
                    player.getEnabled(),
                    player.getActivity(),
                    player.getExperience(),
                    authorityLevel,
                    ((Admin) player).getIban(),
                    ((Admin) player).getIdPhotoLink()
                );
            case "cartograph":
                return new CartographDTO(
                    player.getUsername(),
                    player.getPasswordHash(),
                    player.getEmail(),
                    player.getPhotoLink(),
                    player.getPoints(),
                    player.getBanStatus(),
                    player.getEnabled(),
                    player.getActivity(),
                    player.getExperience(),
                    authorityLevel,
                    ((Cartograph) player).getIban(),
                    ((Cartograph) player).getIdPhotoLink(),
                    ((Cartograph) player).getConfirmed()
                );
            default:
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

    public List<PlayerDTO> getAllPlayers() {
        return playerRepository.findAll().stream()
            .map(this::playerToPlayerDTO)
            .collect(Collectors.toList());
    }

    public List<PlayerDTO> getAllActivePlayers() {
        return activeUserStore.getUsers().stream()
            .map(user -> {
                Player player = playerRepository.findByUsername(user.getUsername());
                return playerToPlayerDTO(player);
            })
            .collect(Collectors.toList());
    }

}
