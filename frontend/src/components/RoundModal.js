import React from "react";
import "../styles/RoundModal.css";
import DeckCard from "./Card";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";

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

    if (this.props.waiting) {
      return (
        <div className="overlay">
          <div className="roundModal">
            <div className="roundResults">
              <div className="spinner">
                <p>Waiting for your opponent for too long?</p>
                <p>Click on Home button.</p>
                <br />
                <ClipLoader color={"white"} size={50}/>
                <br />
                <Link to="/home" onClick={() => this.props.goHome()}>
                  <button className="btn">
                    Home
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (this.props.winnerCard.cardPoints === this.props.loserCard.cardPoints) {
      return (
        <div className="overlay">
          <div className="roundModal">
              <div className="tieSpan">
                <span >It's a tie!</span>
              </div>
            
            <div className="roundResults">
              <div>
                <DeckCard
                  locationPhoto={this.props.winnerCard.location.locationPhoto}
                  cardPoints={this.props.winnerCard.cardPoints}
                  locationName={this.props.winnerCard.location.locationName}
                  locationDesc={this.props.winnerCard.location.locationDesc}
                ></DeckCard>
              </div>
              <div>
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
            <div className="loserCard">
              <span>Loser: </span>
              <DeckCard
                locationPhoto={this.props.loserCard.location.locationPhoto}
                cardPoints={this.props.loserCard.cardPoints}
                locationName={this.props.loserCard.location.locationName}
                locationDesc={this.props.loserCard.location.locationDesc}
              ></DeckCard>
            </div>
            <div className="registerClose registerButton">
            {this.props.opponentCard.location.locationName !== this.props.winnerCard.location.locationName ? <p>You won this round!</p> : <p>You lost this round.</p>}
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
