package hr.fer.progi.ferllowship.geofighter.dto;

public class PlayerDTO {
	
	private String username;
	
	private String passHash;
	
	private String email;
	
	private String photoLink;
	
	private Integer points;
	
	private Integer banStatus;
	
	private Boolean enabled;
	
	private Boolean activity;
	
	private Integer experience;
	
	private String authorityLevel;

	public PlayerDTO(String username, String passHash, String email, String photoLink, Integer points,
			Integer banStatus, Boolean enabled, Boolean activity, Integer experience, String authorityLevel) {
		this.username = username;
		this.passHash = passHash;
		this.email = email;
		this.photoLink = photoLink;
		this.points = points;
		this.banStatus = banStatus;
		this.enabled = enabled;
		this.activity = activity;
		this.experience = experience;
		this.authorityLevel = authorityLevel;
	}
	
	public PlayerDTO(String username, String email, String photoLink, Integer points,
			Integer banStatus, Boolean enabled, Boolean activity, Integer experience, String authorityLevel) {
		this.username = username;
		this.email = email;
		this.photoLink = photoLink;
		this.points = points;
		this.banStatus = banStatus;
		this.enabled = enabled;
		this.activity = activity;
		this.experience = experience;
		this.authorityLevel = authorityLevel;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassHash() {
		return passHash;
	}

	public void setPassHash(String passHash) {
		this.passHash = passHash;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhotoLink() {
		return photoLink;
	}

	public void setPhotoLink(String photoLink) {
		this.photoLink = photoLink;
	}

	public Integer getPoints() {
		return points;
	}

	public void setPoints(Integer points) {
		this.points = points;
	}

	public Integer getBanStatus() {
		return banStatus;
	}

	public void setBanStatus(Integer banStatus) {
		this.banStatus = banStatus;
	}

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	public Boolean getActivity() {
		return activity;
	}

	public void setActivity(Boolean activity) {
		this.activity = activity;
	}

	public Integer getExperience() {
		return experience;
	}

	public void setExperience(Integer experience) {
		this.experience = experience;
	}

	public String getAuthorityLevel() {
		return authorityLevel;
	}

	public void setAuthorityLevel(String authorityLevel) {
		this.authorityLevel = authorityLevel;
	}
}
