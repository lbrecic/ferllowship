package hr.fer.progi.ferllowship.geofighter.controller;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;

import hr.fer.progi.ferllowship.geofighter.dao.PlayerRepository;
import hr.fer.progi.ferllowship.geofighter.dto.CardDTO;
import hr.fer.progi.ferllowship.geofighter.model.Card;
import hr.fer.progi.ferllowship.geofighter.model.Player;

public class DeckController {
	
	@Autowired
	private PlayerRepository playerRepository;
	
	@PreAuthorize("hasAnyRole('ADMIN','CARTOGRAPH','PLAYER')")
	@GetMapping(path = "/player/deck")
	public List<CardDTO> getPlayerDeck() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		Player player = playerRepository.findByUsername(auth.getName());
		
		List<CardDTO> deck = new LinkedList<>();
		List<Card> cards = player.getDeck();
		
		for (Card card : cards) {
			deck.add(new CardDTO(
					card.getCardPoints(),
					card.getScaleFactor(),
					card.getLocation()
					));
		}
		
		return deck;
	}
}
