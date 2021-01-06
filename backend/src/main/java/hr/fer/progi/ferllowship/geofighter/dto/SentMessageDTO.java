package hr.fer.progi.ferllowship.geofighter.dto;

public class SentMessageDTO {

    private String from;
    private String to;
    private String message;

    public SentMessageDTO() {
    }

    public SentMessageDTO(String from, String to, String message) {
        this.from = from;
        this.to = to;
        this.message = message;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
