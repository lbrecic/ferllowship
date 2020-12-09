package hr.fer.progi.ferllowship.geofighter.dto;

public class PlayerDTO {
	
	private String username;
	
	private String email;
	
	private String photoLink;
	
	private String authorityLevel;

	public PlayerDTO(String username, String email, String photoLink, String authorityLevel) {
		this.username = username;
		this.email = email;
		this.photoLink = photoLink;
		this.authorityLevel = authorityLevel;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
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

	public String getAuthorityLevel() {
		return authorityLevel;
	}

	public void setAuthorityLevel(String authorityLevel) {
		this.authorityLevel = authorityLevel;
	}
	
}
