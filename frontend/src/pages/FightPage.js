import React from "react";
import "../styles/FightPage.css";
import "../styles/ChooseCards.css";
import { withRouter } from "react-router-dom";
import DeckCard from "../components/Card";
import OpponentCard from "../components/OpponentCard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RoundModal from "../components/RoundModal";
import ResultModal from "../components/ResultModal";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
const queryString = require('query-string');

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
let numOfCardsReceived = 0;
let savedFightMessagesLength = 0;
let showResult = false;
let cardNames = "";
let start = 0;

class FightPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: cards,
      allCards: allCards,
      show: show,
      showResult: showResult,
      chosen: chosen,
      cardNames: cardNames,
      userPoints: userPoints,
      opponentPoints: opponentPoints,
      userCard: userCard,
      opponentCard: opponentCard,
      winnerCard: winnerCard,
      loserCard: loserCard,
      currentRound: currentRound,
      usedCards: usedCards,
      numOfCardsReceived: numOfCardsReceived,
      savedFightMessagesLength: savedFightMessagesLength,
      waiting: numOfCardsReceived == 2 && currentRound == 1 ||
        numOfCardsReceived == 3 && currentRound == 2 ||
        numOfCardsReceived == 4 && currentRound == 3
    };

    if (this.props.fightMessages.length > 0 &&
        this.props.fightMessages[this.props.fightMessages.length - 1].player !== this.props.match.params.handle) {
      return;
    }

    if (this.props.fightMessages.length > savedFightMessagesLength) {
      savedFightMessagesLength = this.props.fightMessages.length;
      this.state.savedFightMessagesLength = this.props.fightMessages.length;

      ++numOfCardsReceived;
      this.state.numOfCardsReceived = this.state.numOfCardsReceived + 1;

      this.state.waiting = numOfCardsReceived == 2 && currentRound == 1 ||
        numOfCardsReceived == 3 && currentRound == 2 ||
        numOfCardsReceived == 4 && currentRound == 3;
    }

    if (numOfCardsReceived >= 2 && this.props.fightMessages.length > 0 &&
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
    const initiated = queryString.parse(window.location.search).initiated;

    if (!initiated && start == 0) {
      start = Date.now();
    }

    if (!initiated && this.state.numOfCardsReceived == 0) {
      ++numOfCardsReceived;
      this.setState({
        numOfCardsReceived: this.state.numOfCardsReceived + 1
      });
    }

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

    window.onbeforeunload = () => true;
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', function(event) {
      window.history.pushState(null, document.title, window.location.href);
    });
  }

  onClose = (e) => {
    show = false;
    ++currentRound;
    this.setState({
      show: false,
      currentRound: this.state.currentRound + 1
    });

    if (currentRound == 4) {
      this.setState({
        showResult: true
      });
      cards = [];
      allCards = [];
      show = false;
      chosen = 0;
      userPoints = 0
      opponentPoints = 0;
      userCard = [];
      opponentCard = [];
      winnerCard = [];
      loserCard = [];
      currentRound = 0;
      usedCards = [];
      numOfCardsReceived = 0;
      showResult = false;
      cardNames = "";
    }
  };

  goHome = (e) => {
    window.onbeforeunload = () => {};
    cards = [];
    allCards = [];
    show = false;
    chosen = 0;
    userPoints = 0
    opponentPoints = 0;
    userCard = [];
    opponentCard = [];
    winnerCard = [];
    loserCard = [];
    currentRound = 0;
    usedCards = [];
    numOfCardsReceived = 0;
    showResult = false;
    cardNames = "";
    start = 0;
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
      cardNames = "";
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
        cardNames = this.state.cardNames.concat(card.location.locationName);
        this.setState({
          cardNames: this.state.cardNames.concat(card.location.locationName),
        });
      } else {
        cardNames = this.state.cardNames.concat(card.location.locationName) + ", ";
        this.setState({
          cardNames: this.state.cardNames.concat(card.location.locationName) + ", ",
        });
      }
    }
  }

  chooseInFight(card) {
    if (this.state.usedCards.indexOf(card) === -1) {
      let waiting = numOfCardsReceived == 2 && this.state.currentRound == 1 ||
        numOfCardsReceived == 3 && this.state.currentRound == 2 ||
        numOfCardsReceived == 4 && this.state.currentRound == 3;

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
        opponent: this.props.match.params.handle,
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
      if (this.state.numOfCardsReceived === 0) {
        return (
          <div className="App background-color">
              <div className="App-header background-color">
                  <p>Waiting for your opponent for too long?</p>
                  <p>Click on Home button.</p>
                  <br />
                  <ClipLoader color={"white"} size={50}/>
                  <br />
                  <Link to="/home" onClick={() => this.goHome()}>
                    <button className="btn">
                      Home
                    </button>
                  </Link>
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
            <br />
            <p>Waiting for your opponent for too long? </p>
            <p>Click on Home button.</p>
            <Link to="/home" onClick={() => this.goHome()}>
              <div style={{textAlign: "center"}}>
                <button className="btn" style={{width: "70px"}}>
                  Home
                </button>
              </div>
            </Link>
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
                      opponent: this.props.match.params.handle
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

    if (this.state.numOfCardsReceived === 1) {
      return (
        <div className="App background-color">
          <div className="App-header background-color">
            <p>Waiting for your opponent for too long?</p>
            <p>Click on Home button.</p>
            <br />
            <ClipLoader color={"white"} size={50}/>
            <br />
            <Link to="/home" onClick={() => this.goHome()}>
              <button className="btn">
                Home
              </button>
            </Link>
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="fightBody geo-color">
          <div className="fightTitle">
            <span>Fight</span>
            <br />
            <p>Waiting for your opponent for too long? </p>
            <p>Click on Home button.</p>
            <Link to="/home" onClick={() => this.goHome()}>
              <div style={{textAlign: "center"}}>
                <button className="btn" style={{width: "70px"}}>
                  Home
                </button>
              </div>
            </Link>
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
            opponentCard={this.state.opponentCard}
          />
          <ResultModal
            showResult={this.state.showResult}
            onClose={() => {this.onClose(); start = 0; window.onbeforeunload = () => {}; }}
            userPoints={this.state.userPoints}
            opponentPoints={this.state.opponentPoints}
            initiated={queryString.parse(window.location.search).initiated}
            opponentUsername={this.props.match.params.handle}
            start={start}
          />
        </div>
      </>
    );
  }
}

export default withRouter(FightPage);
