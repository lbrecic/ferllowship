package hr.fer.progi.ferllowship.geofighter.dto;

public class CartographDTO extends PlayerDTO {
	
	private String iban;
	
	private String idPhotoLink;
	
	private Boolean confirmed;

	public CartographDTO(String username, String passHash, String email, String photoLink, Integer points,
			Integer banStatus, Boolean enabled, Boolean activity, Integer experience, String authorityLevel,
			String iban, String idPhotoLink, Boolean confirmed) {
		super(username, passHash, email, photoLink, points, banStatus, enabled, activity, experience, authorityLevel);
		this.iban = iban;
		this.idPhotoLink = idPhotoLink;
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

	public Boolean getConfirmed() {
		return confirmed;
	}

	public void setConfirmed(Boolean confirmed) {
		this.confirmed = confirmed;
	}
	
}
