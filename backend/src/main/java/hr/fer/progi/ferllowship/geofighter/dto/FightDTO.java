package hr.fer.progi.ferllowship.geofighter.dto;

public class FightDTO {

    private long start;

    private long duration;

    private String winner;

    private String loser;

    public FightDTO() {}
    public FightDTO(long start, long duration, String winner, String loser) {
        this.start = start;
        this.duration = duration;
        this.winner = winner;
        this.loser = loser;
    }

    public long getStart() {
        return start;
    }

    public void setStart(long start) {
        this.start = start;
    }

    public long getDuration() {
        return duration;
    }

    public void setDuration(long duration) {
        this.duration = duration;
    }

    public String getWinner() {
        return winner;
    }

    public void setWinner(String winner) {
        this.winner = winner;
    }

    public String getLoser() {
        return loser;
    }

    public void setLoser(String loser) {
        this.loser = loser;
    }

}
