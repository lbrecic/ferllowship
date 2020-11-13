package hr.fer.progi.ferllowship.geofighter.model;

import java.util.UUID;

import javax.persistence.*;

@Entity
@Table(name = "confirmation")
public class ConfirmationToken {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "token_id", updatable = false, nullable = false)
	private UUID tokenId;
	
    @Column(name="token")
    private String confirmationToken;

    @OneToOne(targetEntity = Player.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "player_id")
    private Player player;
    
    public ConfirmationToken() {}
    
    public ConfirmationToken(Player player) {
        this.player = player;
        confirmationToken = UUID.randomUUID().toString();
    }

	public UUID getTokenId() {
		return tokenId;
	}

	public void setTokenId(UUID tokenId) {
		this.tokenId = tokenId;
	}

	public String getConfirmationToken() {
		return confirmationToken;
	}

	public void setConfirmationToken(String confirmationToken) {
		this.confirmationToken = confirmationToken;
	}

	public Player getPlayer() {
		return player;
	}

	public void setPlayer(Player player) {
		this.player = player;
	}
	
}
