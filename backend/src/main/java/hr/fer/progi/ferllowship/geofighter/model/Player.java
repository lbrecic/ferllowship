package hr.fer.progi.ferllowship.geofighter.model;

import java.util.ArrayList;
import java.util.List;
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
	
	@Column
	private Boolean activity;
	
	@Column
	private Integer experience;
	
	@OneToMany(targetEntity = Fight.class, fetch = FetchType.EAGER)
	@JoinColumn(name = "fight_id")
	private List<Fight> fights;
	
	@OneToMany(targetEntity = Card.class, fetch = FetchType.EAGER)
	@JoinColumn(name = "card_id")
	private List<Card> deck;

	public Player() {
		
	}

	public Player(String username, String passwordHash, String email, String photoLink) {
		this.username = username;
		this.passwordHash = passwordHash;
		this.email = email;
		this.photoLink = photoLink;
		enabled = false;
		activity = false;
		experience = 0;
		fights = new ArrayList<>();
		deck = new ArrayList<>();
	}
	
	public Cartograph createCartograph() {
		Cartograph cartograph = new Cartograph();
		cartograph.setActivity(activity);
		cartograph.setBanStatus(banStatus);
		cartograph.setConfirmed(false);
		cartograph.setEmail(email);
		cartograph.setEnabled(enabled);
		cartograph.setExperience(experience);
		cartograph.setPasswordHash(passwordHash);
		cartograph.setPhotoLink(photoLink);
		cartograph.setPoints(points);
		cartograph.setUsername(username);
		return cartograph;
	}

	public UUID getUserId() {
		return playerId;
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

	public Boolean getActivity() {
		return activity;
	}

	public void setActivity(Boolean activity) {
		this.activity = activity;
	}

	public Integer getExperience() {
		return experience;
	}

	public void setExperience(Integer expirience) {
		this.experience = expirience;
	}

	public List<Fight> getFights() {
		return fights;
	}

	public List<Card> getDeck() {
		return deck;
	}
	
	
	
}
