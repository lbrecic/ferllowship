package hr.fer.progi.ferllowship.geofighter.dto;

public class AdminDTO extends PlayerDTO {
	
	private String iban;
	
	private String idPhotoLink;

	public AdminDTO(String username, String passHash, String email, String photoLink, Integer points, Integer banStatus,
			Boolean enabled, Boolean activity, Integer experience, String authorityLevel, String iban,
			String idPhotoLink) {
		super(username, passHash, email, photoLink, points, banStatus, enabled, activity, experience, authorityLevel);
		this.iban = iban;
		this.idPhotoLink = idPhotoLink;
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
