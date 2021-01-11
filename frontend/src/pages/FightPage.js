import React from "react";
import "../styles/FightPage.css";
import "../styles/ChooseCards.css";
import { withRouter } from "react-router-dom";
import DeckCard from "../components/Card";
import OpponentCard from "../components/OpponentCard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastBody } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import RoundModal from "../components/RoundModal";
import ClipLoader from "react-spinners/ClipLoader";

let cards = [];
let allCards = [];
let chosen = 0;

class FightPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: cards,
      allCards: allCards,
      show: false,
      chosen: chosen,
      cardNames: "",
      userPoints: 0,
      opponentPoints: 0,
      userCard: [],
      opponentCard: [],
      currentRound: 0,
      usedCards: [],
      winnerCard: [],
      loserCard: [],
    };
    //this.chooseCard = this.chooseCard.bind(this);
  }

  async componentDidMount() {
    try {
      let res = await fetch(
        "/api/player/deck?username=" + localStorage.username
      );
      let result = await res.json();

      if (result) {
        allCards = result;
        this.setState({
          allCards: result,
          opponentCard: allCards[2],
          winnerCard: allCards[1],
        });
      }
    } catch (e) {}
  }

  onClose = (e) => {
    this.setState({
      show: false,
    });
  };

  showRound = (e) => {
    this.setState({
      show: !this.state.show,
    });
  };

  unchose(card) {
    this.state.cards.filter((c) => c !== card);
    this.setState({
      cards: this.state.cards.filter((c) => c !== card),
      chosen: this.state.chosen - 1,
    });
    --chosen;
    if (this.state.cards.length === 0) {
      this.setState({
        cardNames: "",
      });
    }
  }

  confirmSelection() {
    this.setState({
      chosen: this.state.chosen + 1,
    });
    ++chosen;
  }

  chooseCard(card) {
    if (this.state.cards.indexOf(card) === -1 && this.state.chosen < 3) {
      cards = this.state.cards.concat(card);
      this.setState({
        cards: this.state.cards.concat(card),
        chosen: this.state.chosen + 1,
      });
      ++chosen;
      console.log(JSON.stringify(this.state.allCards));
      if (this.state.chosen === 2) {
        this.setState({
          cardNames: this.state.cardNames.concat(card.location.locationName),
        });
      } else {
        this.setState({
          cardNames:
            this.state.cardNames.concat(card.location.locationName) + ", ",
        });
      }
    }
  }

  chooseInFight(card) {
    if (this.state.usedCards.indexOf(card) === -1) {
      this.setState({
        userCard: card,
        currentRound: this.state.currentRound + 1,
        usedCards: this.state.usedCards.concat(card),
      });

      if (card.cardPoints > this.state.opponentCard.cardPoints) {
        this.setState({
          winnerCard: card,
          loserCard: this.state.opponentCard,
          userPoints: this.state.userPoints + 1,
        });
      } else if (card.cardPoints < this.state.opponentCard.cardPoints) {
        this.setState({
          winnerCard: this.state.opponentCard,
          loserCard: card,
          opponentPoints: this.state.opponentPoints + 1,
        });
      } else {
        this.setState({
          winnerCard: this.state.opponentCard,
          loserCard: card,
        });
      }
      this.setRoundResults();
      // var string =
      //   this.state.currentRound + 1 + ": " + card.location.locationName;
      // toast(string);
    } else {
      toast("This card has been used! Play another one.");
    }
  }

  setRoundResults() {
    this.setState({
      show: true,
    });
  }

  render() {
    if (this.state.chosen < 4) {
      if (this.props.fightMessages.length === 0) {
        return (
          <div className="App background-color">
              <div className="App-header background-color">
                  <ClipLoader color={"white"} size={50}/>
              </div>
          </div>
        );
      }
      return (
        <>
          <div className="chooseBody geo-color">
            <div className="fightTitle">
              <span>Fight</span>
            </div>
            <div className="chosenCards">
              <div>
                Chosen:{" "}
                {this.state.cards.map((card) => (
                  <>{card.location.locationName + " "}</>
                ))}
              </div>
              {this.state.chosen === 3 && (
                <button
                  className="readyBtn"
                  onClick={() => {
                    this.confirmSelection();

                    let fightMessage = {
                      player: localStorage.username,
                      opponent: this.props.fightMessages[0].player
                    };

                    this.props.stompClient.send('/app/play', {}, JSON.stringify(fightMessage));
                  }}
                >
                  Ready!
                </button>
              )}
            </div>
            <div className="chooseCards">
              {this.state.allCards.map((card) => (
                <div onClick={() => this.chooseCard(card)}>
                  <DeckCard
                    locationPhoto={card.location.locationPhoto}
                    cardPoints={card.cardPoints}
                    locationName={card.location.locationName}
                    locationDesc={card.location.locationDesc}
                  ></DeckCard>
                  {this.state.cards.indexOf(card) !== -1 && (
                    <button
                      className="unchoseBtn"
                      onClick={() => this.unchose(card)}
                    >
                      {" "}
                      Remove{" "}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      );
    }

    if (this.props.fightMessages.length === 1) {
      return (
        <div className="App background-color">
          <div className="App-header background-color">
            <ClipLoader color={"white"} size={50} />
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="fightBody geo-color">
          <div className="fightTitle">
            <span>Fight</span>
          </div>
          <div className="fightCards geo-color">
            <div className="opponentCardsWrapper">
              <div className="opponentCards">
                <OpponentCard />
                <OpponentCard />
                <OpponentCard />
              </div>
              <div className="opponentPoints">
                {" "}
                <span>{this.state.opponentPoints} Opponent's cards </span>
              </div>
            </div>
            <div className="userCardsWrapper geo-color">
              <span>Your cards {this.state.userPoints}</span>
              <div className="userCards geo-color">
                {this.state.cards.map((card) => (
                  <div onClick={() => this.chooseInFight(card)}>
                    <DeckCard
                      locationPhoto={card.location.locationPhoto}
                      cardPoints={card.cardPoints}
                      locationName={card.location.locationName}
                      locationDesc={card.location.locationDesc}
                    ></DeckCard>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <RoundModal
            show={this.state.show}
            onClose={() => this.onClose()}
            winnerCard={this.state.winnerCard}
            loserCard={this.state.loserCard}
          />
        </div>
      </>
    );
  }
}

export default withRouter(FightPage);
