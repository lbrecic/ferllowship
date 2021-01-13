import React from "react";
import "../styles/FightPage.css";
import "../styles/ChooseCards.css";
import { withRouter } from "react-router-dom";
import DeckCard from "../components/Card";
import OpponentCard from "../components/OpponentCard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RoundModal from "../components/RoundModal";
import ClipLoader from "react-spinners/ClipLoader";

let cards = [];
let allCards = [];
let show = false;
let chosen = 0;
let userPoints = 0
let opponentPoints = 0;
let userCard = [];
let opponentCard = [];
let winnerCard = [];
let loserCard = [];
let currentRound = 1;
let usedCards = [];

class FightPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: cards,
      allCards: allCards,
      show: show,
      chosen: chosen,
      cardNames: "",
      userPoints: userPoints,
      opponentPoints: opponentPoints,
      userCard: userCard,
      opponentCard: opponentCard,
      winnerCard: winnerCard,
      loserCard: loserCard,
      currentRound: currentRound,
      usedCards: usedCards,
      waiting: props.fightMessages.length == 2 && currentRound == 1 ||
        props.fightMessages.length == 3 && currentRound == 2 ||
        props.fightMessages.length == 4 && currentRound == 3
    };

    if (this.props.fightMessages.length > 0 &&
        this.props.fightMessages[this.props.fightMessages.length - 1].card) {

      opponentCard = this.props.fightMessages[this.props.fightMessages.length - 1].card;
      this.state.opponentCard = this.props.fightMessages[this.props.fightMessages.length - 1].card;
    }

    if (userCard.location) {
      let card = userCard;
      if (card.cardPoints > this.state.opponentCard.cardPoints) {
        winnerCard = card;
        loserCard = this.state.opponentCard;
        ++userPoints;
        this.state.winnerCard = card;
        this.state.loserCard = this.state.opponentCard;
        this.state.userPoints = this.state.userPoints + 1;
      } else if (card.cardPoints < this.state.opponentCard.cardPoints) {
        winnerCard = this.state.opponentCard;
        loserCard = card;
        ++opponentPoints;
        this.state.winnerCard = this.state.opponentCard;
        this.state.loserCard = card;
        this.state.opponentPoints = this.state.opponentPoints + 1;
      } else {
        winnerCard = this.state.opponentCard;
        loserCard = card;
        this.state.winnerCard = this.state.opponentCard;
        this.state.loserCard = card;
      }
    }

    userCard = [];
    this.state.userCard = [];
  }

  async componentDidMount() {
    try {
      let res = await fetch("/api/player/deck?username=" + localStorage.username);
      let result = await res.json();

      if (result) {
        allCards = result;
        this.setState({
          allCards: result,
        });
      }
    } catch (e) {}
  }

  onClose = (e) => {
    show = false;
    ++currentRound;
    this.setState({
      show: false,
      currentRound: this.state.currentRound + 1
    });
  };

  showRound = (e) => {
    show = !this.state.show;
    this.setState({
      show: !this.state.show,
    });
  };

  unchose(card) {
    this.state.cards.filter((c) => c !== card);
    --chosen;
    this.setState({
      cards: this.state.cards.filter((c) => c !== card),
      chosen: this.state.chosen - 1,
    });
    if (this.state.cards.length === 0) {
      this.setState({
        cardNames: "",
      });
    }
  }

  confirmSelection() {
    ++chosen;
    this.setState({
      chosen: this.state.chosen + 1,
    });
  }

  chooseCard(card) {
    if (this.state.cards.indexOf(card) === -1 && this.state.chosen < 3) {
      cards = this.state.cards.concat(card);
      ++chosen;
      this.setState({
        cards: this.state.cards.concat(card),
        chosen: this.state.chosen + 1,
      });

      if (this.state.chosen === 2) {
        this.setState({
          cardNames: this.state.cardNames.concat(card.location.locationName),
        });
      } else {
        this.setState({
          cardNames: this.state.cardNames.concat(card.location.locationName) + ", ",
        });
      }
    }
  }

  chooseInFight(card) {
    if (this.state.usedCards.indexOf(card) === -1) {
      let waiting = this.props.fightMessages.length == 2 && this.state.currentRound == 1 ||
        this.props.fightMessages.length == 3 && this.state.currentRound == 2 ||
        this.props.fightMessages.length == 4 && this.state.currentRound == 3;

      userCard = card;
      usedCards = this.state.usedCards.concat(card);
      show = true;
      this.setState({
        userCard: card,
        usedCards: this.state.usedCards.concat(card),
        show: true,
        waiting: waiting
      });

      if (!waiting) {
        this.determineOutcome(card);
        this.setRoundResults();

        userCard = [];
        this.setState({
          userCard: []
        });
      }

      let fightMessage = {
        player: localStorage.username,
        opponent: this.props.fightMessages[0].player,
        card: card
      };
      
      this.props.stompClient.send('/app/play', {}, JSON.stringify(fightMessage));
    } else {
      toast("This card has been used! Play another one.");
    }
  }

  determineOutcome(card) {
    if (card.cardPoints > this.state.opponentCard.cardPoints) {
      winnerCard = card;
      loserCard = this.state.opponentCard;
      ++userPoints;
      this.setState({
        winnerCard: card,
        loserCard: this.state.opponentCard,
        userPoints: this.state.userPoints + 1,
      });
    } else if (card.cardPoints < this.state.opponentCard.cardPoints) {
      winnerCard = this.state.opponentCard;
      loserCard = card;
      ++opponentPoints;
      this.setState({
        winnerCard: this.state.opponentCard,
        loserCard: card,
        opponentPoints: this.state.opponentPoints + 1,
      });
    } else {
      winnerCard = this.state.opponentCard;
      loserCard = card;
      this.setState({
        winnerCard: this.state.opponentCard,
        loserCard: card,
      });
    }
  }

  setRoundResults() {
    show = true;
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
            waiting={this.state.waiting}
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
