import React from "react";
import "../styles/RoundModal.css";
import DeckCard from "./Card";

class RoundModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winnerCard: this.props.winnerCard,
      loserCard: this.props.loserCard,
      show: false,
    };
  }

  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  };

  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div className="overlay">
        <div className="roundModal">
          <div className="roundResults">
            <div className="winnerCard">
                <span>Winner: </span>
                <DeckCard
                    locationPhoto={this.state.winnerCard.location.locationPhoto}
                    cardPoints={this.state.winnerCard.cardPoints}
                    locationName={this.state.winnerCard.location.locationName}
                    locationDesc={this.state.winnerCard.location.locationDesc}
                ></DeckCard>
            </div>
            <div>
                <span>Loser: </span>
                <DeckCard
                    locationPhoto={this.state.loserCard.location.locationPhoto}
                    cardPoints={this.state.loserCard.cardPoints}
                    locationName={this.state.loserCard.location.locationName}
                    locationDesc={this.state.loserCard.location.locationDesc}
                ></DeckCard>
            </div>
            <div className="registerClose registerButton">
              <button className="btn" onClick={(e) => this.onClose(e)}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RoundModal;
