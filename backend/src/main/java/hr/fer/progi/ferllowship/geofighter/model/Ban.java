package hr.fer.progi.ferllowship.geofighter.model;

import java.time.LocalDate;
import java.util.UUID;

import javax.persistence.*;

@Entity
public class Ban {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ban_id", updatable = false, nullable = false)
	private UUID banId;
	
	@Column(name = "ban_end")
	private LocalDate banEnd;
	
	@OneToOne(targetEntity = Player.class, fetch = FetchType.EAGER)
	@JoinColumn(name = "user_id")
	private Player player;
	
	public Ban() {}
	
	public Ban(Player player, LocalDate date) {
		this.player = player;
		this.banEnd = date;
	}

	public UUID getBanId() {
		return banId;
	}

	public LocalDate getBanEnd() {
		return banEnd;
	}

	public void setBanEnd(LocalDate banEnd) {
		this.banEnd = banEnd;
	}

	public Player getPlayer() {
		return player;
	}

	public void setPlayer(Player player) {
		this.player = player;
	}
	
	
}
