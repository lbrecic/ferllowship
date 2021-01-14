package hr.fer.progi.ferllowship.geofighter.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import hr.fer.progi.ferllowship.geofighter.dao.AdminRepository;
import hr.fer.progi.ferllowship.geofighter.dao.CardRepository;
import hr.fer.progi.ferllowship.geofighter.dao.CartographRepository;
import hr.fer.progi.ferllowship.geofighter.dao.FightRepository;
import hr.fer.progi.ferllowship.geofighter.dao.PlayerRepository;
import hr.fer.progi.ferllowship.geofighter.dto.AdminDTO;
import hr.fer.progi.ferllowship.geofighter.dto.CartographDTO;
import hr.fer.progi.ferllowship.geofighter.dto.PlayerDTO;
import hr.fer.progi.ferllowship.geofighter.model.Admin;
import hr.fer.progi.ferllowship.geofighter.model.Card;
import hr.fer.progi.ferllowship.geofighter.model.Cartograph;
import hr.fer.progi.ferllowship.geofighter.model.Fight;
import hr.fer.progi.ferllowship.geofighter.model.Player;
import hr.fer.progi.ferllowship.geofighter.configuration.ActiveUserStore;
import hr.fer.progi.ferllowship.geofighter.configuration.LoggedUser;

@Service
public class PlayerService {

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private CartographRepository cartographRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private FightRepository fightRepository;

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
    
    public List<PlayerDTO> getAllActivePlayersNearMe() {
    	String username = this.getLoggedInPlayer().getUsername();
    	
    	LoggedUser activeUser;
    	
    	try {
    		activeUser = activeUserStore.getUsers().stream()
    											.filter(user -> {
    												return user.getUsername().equals(username);
    											})
    											.findFirst().orElseThrow();
    	} catch (NoSuchElementException ex) {
    		return new ArrayList<PlayerDTO>();
    	}
    	
        return activeUserStore.getUsers().stream()
        		.filter(user -> {
        			return distance(activeUser.getCurrentLat(), 
        							activeUser.getCurrentLon(), 
        							user.getCurrentLat(), 
        							user.getCurrentLon()) < 50.0;
        		})
                .map(user -> {
                    Player player = playerRepository.findByUsername(user.getUsername());
                    return playerToPlayerDTO(player);
                })
                .collect(Collectors.toList());
    }
    
    public static double distance(double lat1, double lon1, double lat2, double lon2) {
    	double R = 6371; // radius of the Earth
    	double dLat = Math.toRadians(lat2 - lat1);
    	double dLon = Math.toRadians(lon2 - lon1);
    	
    	double a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    		    	Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) * 
    		    	Math.sin(dLon/2) * Math.sin(dLon/2);
    	
    	double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    	
    	return R * c;
    }

    public void changeRoleToPlayer(Player player) {
        changeRoleFromTo(player, player.createPlayer());
    }

    public void changeRoleToCartograph(Player player, String iban, String idPhotoLink, boolean confirmed) {
        Cartograph cartograph = player.createCartograph();
        cartograph.setIban(iban);
        cartograph.setIdPhotoLink(idPhotoLink);
        cartograph.setConfirmed(confirmed);
        changeRoleFromTo(player, cartograph);
    }

    public void changeRoleToAdmin(Player player, String iban, String idPhotoLink) {
        Admin admin = player.createAdmin();
        admin.setIban(iban);
        admin.setIdPhotoLink(idPhotoLink);
        changeRoleFromTo(player, admin);
    }

    private void changeRoleFromTo(Player playerInPreviousRole, Player playerInNewRole) {
        List<Fight> fights = fightRepository.findAll();
        List<Fight> savedFights = new ArrayList<>();
        fights.forEach(fight -> {
            if (fight.getWinner().equals(playerInPreviousRole) || fight.getLoser().equals(playerInPreviousRole)) {
                savedFights.add(fight);
            }
        });
        savedFights.forEach(fight -> fightRepository.delete(fight));
        fightRepository.flush();

        List<Card> cards = cardRepository.findAll();
        List<Card> savedCards = new ArrayList<>();
        cards.forEach(card -> {
            if (card.getPlayer().equals(playerInPreviousRole)) {
                savedCards.add(card);
            }
        });
        savedCards.forEach(card -> cardRepository.delete(card));
        cardRepository.flush();

        playerRepository.delete(playerInPreviousRole);
        playerRepository.flush();
        playerRepository.save(playerInNewRole);

        savedFights.forEach(fight -> {
            if (fight.getWinner().equals(playerInPreviousRole)) {
                fight.setWinner(playerInNewRole);
            } else {
                fight.setLoser(playerInNewRole);
            }
            fightRepository.save(fight);
        });

        savedCards.forEach(card -> {
            card.setPlayer(playerInNewRole);
            cardRepository.save(card);
        });
    }

}
