package hr.fer.progi.ferllowship.geofighter.dto;

public class ErrorDTO {
	
	private String error;
	
	public ErrorDTO(String error) {
		this.error = error;
	}

	public String getError() {
		return error;
	}

	public void getError(String error) {
		this.error = error;
	}
	
}
