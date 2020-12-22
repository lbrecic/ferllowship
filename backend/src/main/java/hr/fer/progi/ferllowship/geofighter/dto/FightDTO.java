package hr.fer.progi.ferllowship.geofighter.dto;

import java.time.Duration;
import java.time.LocalDateTime;

public class FightDTO {

    private long start;

    private long duration;

    private PlayerDTO winner;

    private PlayerDTO loser;

    public FightDTO(long start, long duration, PlayerDTO winner, PlayerDTO loser) {
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

    public PlayerDTO getWinner() {
        return winner;
    }

    public void setWinner(PlayerDTO winner) {
        this.winner = winner;
    }

    public PlayerDTO getLoser() {
        return loser;
    }

    public void setLoser(PlayerDTO loser) {
        this.loser = loser;
    }

}
