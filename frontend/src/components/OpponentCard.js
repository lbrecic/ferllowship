import { Component } from "react";
import { Card } from "react-bootstrap";
import "../styles/Card.css";
import imgBackground from "../utils/background.jpg";

class OpponentCard extends Component{
    constructor(props) {
        super(props);
        this.state = {
        };
      }

      render(){
          return(
          <>
            <Card style={{height: "350px", width: "220px"}}>
                 <Card.Img  src={imgBackground} alt="background"/>
                 <Card.ImgOverlay>
                 <Card.Title></Card.Title>
                   <Card.Text>
                   </Card.Text>
                 </Card.ImgOverlay>                 
               </Card>
           </>
           )
      }
}

export default OpponentCard;