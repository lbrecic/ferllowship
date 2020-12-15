package hr.fer.progi.ferllowship.geofighter.model;

import javax.persistence.*;

@Entity
public class Cartograph extends Player{
	
	@Column(nullable = false, length = 34)
	private String iban;
	
	@Column(name = "id_photo_link", nullable = false, length = 200)
	private String idPhotoLink;
	
	@Column
	private Boolean confirmed;
	
	public Player createPlayer() {
		Player player = new Player();
		player.setActivity(getActivity());
		player.setBanStatus(getBanStatus());
		player.setEmail(getEmail());
		player.setEnabled(getEnabled());
		player.setExperience(getExperience());
		player.setPasswordHash(getPasswordHash());
		player.setPhotoLink(getPhotoLink());
		player.setPoints(getPoints());
		player.setUsername(getUsername());
		return player;
	}

	public Boolean getConfirmed() {
		return confirmed;
	}

	public void setConfirmed(Boolean confirmed) {
		this.confirmed = confirmed;
	}

	public String getIban() {
		return iban;
	}

	public void setIban(String iban) {
		this.iban = iban;
	}

	public String getIdPhotoLink() {
		return idPhotoLink;
	}

	public void setIdPhotoLink(String idPhotoLink) {
		this.idPhotoLink = idPhotoLink;
	}
	
}
