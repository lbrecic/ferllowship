import { Component } from "react";
import { Card, CardGroup } from "react-bootstrap";
import "../styles/Card.css";

class DeckCard extends Component{
    constructor(props) {
        super(props);
        this.state = {
          locationName: this.props.locationName,
          locationPhoto : this.props.locationPhoto,
          cardPoints: this.props.cardPoints,
        };
      }

      render(){
          return(
          <>
            <Card>
                 <Card.Img variant="top" src={this.state.locationPhoto} />
                 <Card.Body>
                   <Card.Title>{this.state.locationName}</Card.Title>
                   <Card.Text>
                     Points: {this.state.cardPoints}
                   </Card.Text>
                 </Card.Body>
                 <Card.Footer>
                   <small className="text-muted">Last updated 3 mins ago</small>
                 </Card.Footer>
               </Card>
           </>
           )
      }
}

export default DeckCard;