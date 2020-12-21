package hr.fer.progi.ferllowship.geofighter.dto;

public class GlobalStatDTO implements Comparable<GlobalStatDTO>{

	private String username;
	private Integer points;
	private String photoLink;
	
	public GlobalStatDTO(String username, Integer points, String photoLink) {
		super();
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

	@Override
	public int compareTo(GlobalStatDTO o) {
		return this.points.compareTo(o.points);
	}
	
}
