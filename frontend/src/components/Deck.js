import { Component } from "react";
import { Card, CardGroup } from "react-bootstrap";
import "../styles/Deck.css";
import DeckCard from "./Card.js";

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  render() {
    return (
      <>
        <div className="deck">
          <CardGroup>
            <div className="">
              <DeckCard
                locationName="Belisce 1"
                locationPhoto="https://www.tzbelisce.net/wp-content/uploads/2014/03/GAT-600x449.jpg"
                cardPoints="215"
              />
            </div>

            <div className="">
              <DeckCard
                locationName="Belisce 2"
                locationPhoto="https://radio-belisce.net/wp-content/uploads/elementor/thumbs/zelene-o7m2gybrxykds4auvobjs4t5xruidr8022639ta3jk.jpg"
                cardPoints="415"
              />
            </div>

            <div className="">
              <DeckCard
                locationName="Belisce 3"
                locationPhoto="https://lokalni.vecernji.hr/media/daguerre/3d/c6/33958519e178b534d305.png"
                cardPoints="135"
              />
            </div>

            <div className="">
              <DeckCard
                locationName="Belisce 4"
                locationPhoto="https://static.gradonacelnik.hr/uploads/2019/10/01-R-SOL-E-GradskaUprava-Small-1.jpg"
                cardPoints="187"
              />
            </div>
          </CardGroup>
        </div>
      </>
    );
  }
}

export default Deck;
