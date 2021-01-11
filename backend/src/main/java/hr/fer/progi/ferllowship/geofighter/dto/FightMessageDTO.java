package hr.fer.progi.ferllowship.geofighter.dto;

public class FightMessageDTO {

    private String player;

    private String opponent;

    private CardDTO card;

    public FightMessageDTO() {
    }

    public FightMessageDTO(String player, String opponent, CardDTO card) {
        this.player = player;
        this.opponent = opponent;
        this.card = card;
    }

    public String getPlayer() {
        return player;
    }

    public void setPlayer(String player) {
        this.player = player;
    }

    public String getOpponent() {
        return opponent;
    }

    public void setOpponent(String opponent) {
        this.opponent = opponent;
    }

    public CardDTO getCard() {
        return card;
    }

    public void setCard(CardDTO card) {
        this.card = card;
    }

}
