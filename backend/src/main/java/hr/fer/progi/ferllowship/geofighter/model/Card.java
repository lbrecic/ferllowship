package hr.fer.progi.ferllowship.geofighter.model;

import java.util.UUID;

import javax.persistence.*;

@Entity
public class Card {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "card_id", updatable = false, nullable = false)
	private UUID cardId;
	
	@Column(name = "card_points")
	private Integer cardPoints;
	
	@Column(name = "scale_factor")
	private Integer scaleFactor;
	
	@ManyToOne(targetEntity = Location.class, fetch = FetchType.EAGER)
	@JoinColumn(name = "location_id")
	private Location location;
	
	@ManyToOne(targetEntity = Player.class, fetch = FetchType.EAGER)
	@JoinColumn(name = "player_id")
	private Player player;
	
	public Card() {}
	
	public Card(Integer points, Integer factor, Location location, Player player) {
		this.cardPoints = points;
		this.scaleFactor = factor;
		this.location = location;
		this.player = player;
	}

	public Integer getCardPoints() {
		return cardPoints;
	}

	public void setCardPoints(Integer cardPoints) {
		this.cardPoints = cardPoints;
	}

	public Integer getScaleFactor() {
		return scaleFactor;
	}

	public void setScaleFactor(Integer scaleFactor) {
		this.scaleFactor = scaleFactor;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public Player getPlayer() {
		return player;
	}

	public void setPlayer(Player player) {
		this.player = player;
	}

	public UUID getCardId() {
		return cardId;
	}
}
