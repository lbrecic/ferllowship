package hr.fer.progi.ferllowship.geofighter.dto;

public class CartographDTO {
	
	private String username;
	
	private String iban;
	
	private String email;
	
	private String idPhotoLink;

	public CartographDTO(String username, String iban, String email, String idPhotoLink) {
		this.username = username;
		this.iban = iban;
		this.email = email;
		this.idPhotoLink = idPhotoLink;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getIban() {
		return iban;
	}

	public void setIban(String iban) {
		this.iban = iban;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getIdPhotoLink() {
		return idPhotoLink;
	}

	public void setIdPhotoLink(String idPhotoLink) {
		this.idPhotoLink = idPhotoLink;
	}
	
}
