package hr.fer.progi.ferllowship.geofighter.dto;

public class GlobalStatDTO implements Comparable<GlobalStatDTO>{

	private String username;
	private Integer points;
	
	public GlobalStatDTO(String username, Integer points) {
		super();
		this.username = username;
		this.points = points;
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

	@Override
	public int compareTo(GlobalStatDTO o) {
		return this.points.compareTo(o.points);
	}
	
}
