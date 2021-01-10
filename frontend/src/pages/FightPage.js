import React from "react";
import "../styles/FightPage.css";
import { withRouter } from "react-router-dom";
import DeckCard from "../components/Card";
import OpponentCard from "../components/OpponentCard";

class FightPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      allCards: [],
      show: true,
      chosen: 0,
      cardNames: "",
    };
    //this.chooseCard = this.chooseCard.bind(this);
  }

  async componentDidMount() {
    try {
      let res = await fetch("/api/player/deck");
      let result = await res.json();

      if (result) {
        this.setState({
          allCards: result,
        });
      }
    } catch (e) {}
  }

  unchose(card) {
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

  confirmSelection(){
      this.setState({
          chosen : this.state.chosen + 1,
      })
  }

  chooseCard(card) {
    if (this.state.cards.indexOf(card) === -1 && this.state.chosen < 3) {
      this.setState({
        cards: this.state.cards.concat(card),
        chosen: this.state.chosen + 1,
      });
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

  render() {
    if (this.state.chosen < 4) {
      return (
        <>
          <div className="fightBody geo-color">
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
                <button className="readyBtn" onClick={() => this.confirmSelection()}>Ready!</button>
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
    return (
      <>
        <div className="fightBody geo-color">
          <div className="fightTitle">
            <span>Fight</span>
          </div>
          <div className="fightCards">
            <div className="userCardsWrapper">
              <span>Your cards</span>
              <div className="userCards">
                {this.state.cards.map((card) => (
                  <div>
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
            <div className="opponentCardsWrapper">
              <div className="opponentCards">
                <OpponentCard />
                <OpponentCard />
                <OpponentCard />
              </div>
              <span>Opponent's cards</span>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(FightPage);
