package hr.fer.progi.ferllowship.geofighter.dto;

public class PersonalStatsDTO {
	
	Integer fightsParticipatedIn;
	Integer fightsWon;
	Integer points;
	Integer experience;
	
	public PersonalStatsDTO(Integer fightsParticipatedIn, Integer fightsWon,
							Integer points, Integer experience) {
		super();
		this.fightsParticipatedIn = fightsParticipatedIn;
		this.fightsWon = fightsWon;
		this.points = points;
		this.experience = experience;
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
	
}
