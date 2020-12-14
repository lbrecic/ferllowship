package hr.fer.progi.ferllowship.geofighter.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;

import hr.fer.progi.ferllowship.geofighter.dao.PlayerRepository;
import hr.fer.progi.ferllowship.geofighter.dto.CardDTO;
import hr.fer.progi.ferllowship.geofighter.model.Card;
import hr.fer.progi.ferllowship.geofighter.model.Player;
import hr.fer.progi.ferllowship.geofighter.service.PlayerService;

public class DeckController {
	
	@Autowired
	private PlayerRepository playerRepository;

	@Autowired
	private PlayerService playerService;
	
	@PreAuthorize("hasAnyRole('ADMIN','CARTOGRAPH','PLAYER')")
	@GetMapping(path = "/player/deck")
	public List<CardDTO> getPlayerDeck() {
		Player player = playerService.getLoggedInPlayer();
		
		List<CardDTO> deck = new ArrayList<>();
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
