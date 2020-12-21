package hr.fer.progi.ferllowship.geofighter.dto;

import java.time.Duration;
import java.time.LocalDateTime;

public class FightDTO {

    private LocalDateTime start;

    private Duration duration;

    private PlayerDTO winner;

    private PlayerDTO loser;

    public FightDTO(LocalDateTime start, Duration duration, PlayerDTO winner, PlayerDTO loser) {
        this.start = start;
        this.duration = duration;
        this.winner = winner;
        this.loser = loser;
    }

    public LocalDateTime getStart() {
        return start;
    }

    public void setStart(LocalDateTime start) {
        this.start = start;
    }

    public Duration getDuration() {
        return duration;
    }

    public void setDuration(Duration duration) {
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
