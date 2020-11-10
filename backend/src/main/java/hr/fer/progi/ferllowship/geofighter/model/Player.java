package hr.fer.progi.ferllowship.geofighter.model;

import java.util.UUID;

import javax.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Player {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "player_id", updatable = false, nullable = false)
	private UUID playerId;
	
	@Column(unique = true, length = 32)
	private String username;
	
	@Column(name = "pass_hash", nullable = false, length = 256)
	private String passwordHash;
	
	@Column(unique = true, length = 128)
	private String email;
	
	@Column(name = "photo_link", nullable = false, length = 200)
	private String photoLink;
	
	@Column
	private Integer points;
	
	@Column(name = "ban_status")
	private Integer banStatus;
	
	@Column 
	private Boolean enabled;
	
	public Player() {
		
	}

	public Player(String username, String passwordHash, String email, String photoLink) {
		this.username = username;
		this.passwordHash = passwordHash;
		this.email = email;
		this.photoLink = photoLink;
		enabled = false;
	}

	public UUID getUserId() {
		return playerId;
	}

	public void setUserId(UUID playerId) {
		this.playerId = playerId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPasswordHash() {
		return passwordHash;
	}

	public void setPasswordHash(String passwordHash) {
		this.passwordHash = passwordHash;
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
	
}
