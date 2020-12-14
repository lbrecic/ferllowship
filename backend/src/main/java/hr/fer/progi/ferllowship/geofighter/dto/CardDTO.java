package hr.fer.progi.ferllowship.geofighter.dto;

import hr.fer.progi.ferllowship.geofighter.model.Location;

public class CardDTO {
	
	private Integer cardPoints;
	
	private Integer scaleFactor;
	
	private Location location;

	public CardDTO(Integer cardPoints, Integer scaleFactor, Location location) {
		super();
		this.cardPoints = cardPoints;
		this.scaleFactor = scaleFactor;
		this.location = location;
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
	
	
	
	
}
