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
    };
  }

  render() {
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
                <DeckCard locationPhoto="" />
                <DeckCard locationPhoto="" />
                <DeckCard locationPhoto="" />
              </div>
            </div>
            <div className="opponentCardsWrapper">
              <div className="opponentCards">
                <OpponentCard />
                <OpponentCard />
                <OpponentCard/>
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
