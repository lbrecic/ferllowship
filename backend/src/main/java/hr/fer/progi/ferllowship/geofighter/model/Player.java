package hr.fer.progi.ferllowship.geofighter.model;

import java.util.UUID;

import javax.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Player {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "user_id", updatable = false, nullable = false)
	private UUID userId;
	
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

	public UUID getUserId() {
		return userId;
	}

	public void setUserId(UUID userId) {
		this.userId = userId;
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
	
}
