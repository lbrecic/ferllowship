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
                    locationPhoto={this.props.winnerCard.location.locationPhoto}
                    cardPoints={this.props.winnerCard.cardPoints}
                    locationName={this.props.winnerCard.location.locationName}
                    locationDesc={this.props.winnerCard.location.locationDesc}
                ></DeckCard>
            </div>
            <div>
                <span>Loser: </span>
                <DeckCard
                    locationPhoto={this.props.loserCard.location.locationPhoto}
                    cardPoints={this.props.loserCard.cardPoints}
                    locationName={this.props.loserCard.location.locationName}
                    locationDesc={this.props.loserCard.location.locationDesc}
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
