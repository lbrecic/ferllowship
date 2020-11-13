package hr.fer.progi.ferllowship.geofighter.model;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.UUID;

import javax.persistence.*;

@Entity
public class Fight {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "fight_id", updatable = false, nullable = false)
	private UUID fightId;
	
	@Column
	private LocalDateTime start;
	
	@Column
	private Duration duration;
	
	@ManyToOne(targetEntity = Player.class, fetch = FetchType.EAGER)
	@JoinColumn(name = "user_id", insertable = false, updatable = false)
	private Player winner;
	
	@ManyToOne(targetEntity = Player.class, fetch = FetchType.EAGER)
	@JoinColumn(name = "user_id", insertable = false, updatable = false)
	private Player loser;
	
	public Fight(LocalDateTime start, Duration duration, Player winner, Player loser) {
		this.start = start;
		this.duration = duration;
		this.winner = winner;
		this.loser = loser;
	}
	
	public Fight() {}

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

	public Player getWinner() {
		return winner;
	}

	public void setWinner(Player winner) {
		this.winner = winner;
	}

	public Player getLoser() {
		return loser;
	}

	public void setLoser(Player loser) {
		this.loser = loser;
	}

	public UUID getFightId() {
		return fightId;
	}
}
