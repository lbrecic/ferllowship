package hr.fer.progi.ferllowship.geofighter.dto;

public class GlobalStatsDTO {

	private String username;

	private Integer points;

	private String photoLink;

	private Integer rank;
	
	public GlobalStatsDTO(String username, Integer points, String photoLink) {
		this.username = username;
		this.points = points;
		this.photoLink = photoLink;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Integer getPoints() {
		return points;
	}

	public void setPoints(Integer points) {
		this.points = points;
	}

	public String getPhotoLink() {
		return photoLink;
	}

	public void setPhotoLink(String photoLink) {
		this.photoLink = photoLink;
	}

	public Integer getRank() {
		return rank;
	}

	public void setRank(Integer rank) {
		this.rank = rank;
	}
	
}
