package hr.fer.progi.ferllowship.geofighter.dto;

public class ChatMessageDTO {

    private String from;

    private String to;

    private String message;

    private String time;

    private boolean request;

    public ChatMessageDTO() {
    }

    public ChatMessageDTO(String from, String to, String message, String time, boolean request) {
        this.from = from;
        this.to = to;
        this.message = message;
        this.time = time;
        this.request = request;
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

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public boolean isRequest() {
        return request;
    }

    public void setRequest(boolean request) {
        this.request = request;
    }

}
