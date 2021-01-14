import { Component } from "react";
import { Card, CardGroup } from "react-bootstrap";
import "../styles/Deck.css";
import DeckCard from "./Card.js";

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
    };
  }

  async componentDidMount() {
    try {
      let res = await fetch(
        "/api/player/deck?username=" + localStorage.username
      );
      let result = await res.json();

      if (result) {
        this.setState({
          cards: result,

        });
      }
    } catch (e) {}
  }



  render() {
    return (
      <>
        <div className="deck">
          <CardGroup>
            {this.state.cards.map((card) => (
              <div className="">
              <DeckCard
                    locationPhoto={card.location.locationPhoto}
                    cardPoints={card.cardPoints}
                    locationName={card.location.locationName}
                    locationDesc={card.location.locationDesc}
              />
             </div>
            ))}            
          </CardGroup>
        </div>
      </>
    );
  }
}

export default Deck;
