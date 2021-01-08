import React from "react";
import "../styles/FightPage.css";
import { withRouter } from "react-router-dom";
import DeckCard from "../components/Card";

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
            <div className="userCards">
              <DeckCard locationPhoto="" />
              <DeckCard locationPhoto="" />
              <DeckCard locationPhoto="" />
            </div>
            <div className="opponentCards"> 
                <DeckCard locationPhoto="" />
                <DeckCard locationPhoto="" />
                <DeckCard locationPhoto="" />
            </div>   
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(FightPage);
