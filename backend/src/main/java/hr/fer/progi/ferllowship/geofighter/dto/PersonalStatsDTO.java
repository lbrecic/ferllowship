package hr.fer.progi.ferllowship.geofighter.dto;

public class PersonalStatsDTO {
	
	private Integer fightsParticipatedIn;

	private Integer fightsWon;

	private Integer fightsLost;

	private Integer points;

	private Integer experience;

	private Integer rank;
	
	public PersonalStatsDTO(Integer fightsParticipatedIn, Integer fightsWon, Integer fightsLost,
							Integer points, Integer experience, Integer rank) {
		this.fightsParticipatedIn = fightsParticipatedIn;
		this.fightsWon = fightsWon;
		this.fightsLost = fightsLost;
		this.points = points;
		this.experience = experience;
		this.rank = rank;
	}

	public Integer getFightsParticipatedIn() {
		return fightsParticipatedIn;
	}

	public void setFightsParticipatedIn(Integer fightsParticipatedIn) {
		this.fightsParticipatedIn = fightsParticipatedIn;
	}

	public Integer getFightsWon() {
		return fightsWon;
	}

	public void setFightsWon(Integer fightsWon) {
		this.fightsWon = fightsWon;
	}

	public Integer getFightsLost() {
		return fightsLost;
	}

	public void setFightsLost(Integer fightsLost) {
		this.fightsLost = fightsLost;
	}

	public Integer getPoints() {
		return points;
	}

	public void setPoints(Integer points) {
		this.points = points;
	}

	public Integer getExperience() {
		return experience;
	}

	public void setExperience(Integer experience) {
		this.experience = experience;
	}

	public Integer getRank() {
		return rank;
	}

	public void setRank(Integer rank) {
		this.rank = rank;
	}

}
