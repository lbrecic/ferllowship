package hr.fer.progi.ferllowship.geofighter.model;

import javax.persistence.*;

@Entity
public class Cartograph extends Player{
	
	@Column(nullable = false, length = 34)
	private String iban;
	
	@Column(name = "id_photo_link", nullable = false, length = 200)
	private String idPhotoLink;

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
