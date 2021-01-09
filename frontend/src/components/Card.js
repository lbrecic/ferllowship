import { Component } from "react";
import { Card } from "react-bootstrap";

class DeckCard extends Component{
    constructor(props) {
        super(props);
        this.state = {
          locationName: this.props.locationName,
          locationPhoto : this.props.locationPhoto,
          cardPoints: this.props.cardPoints,
          locationDesc : this.props.locationDesc,
        };
      }

      render(){
          return(
          <>
            <Card style={{height: "350px", width: "220px"}}>
                 <Card.Img variant="top" src={this.state.locationPhoto} />
                 <Card.Body>
                   <Card.Title>{this.state.locationName}</Card.Title>
                   <Card.Text>
                    <small className="text-muted">{this.state.locationDesc}</small>
                   </Card.Text>
                 </Card.Body>
                 <Card.Footer>
                 Points: {this.state.cardPoints}                   
                 </Card.Footer>
               </Card>
           </>
           )
      }
}

export default DeckCard;