import React from "react";
import SubmitButton from "./SubmitButton";
import "../styles/Request.css";

class Request extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      date: this.props.date,
      IBAN: this.props.IBAN,
      picture: this.props.picture,
      buttonDisabled: false,
    };
  }

  render() {
    return (
      <div className="overlayRequest">
        <div className="modalRequest">
          <div className="cartographerRequest modal-contentRequest">
            <div className="username textBox">
              Korisničko ime: {this.username}
            </div>
            <div className="IBAN textBox">IBAN: </div>
            <div className="picture">
              <img
                src={this.picture}
                className="picture"
                alt="Profile pic"
              ></img>
            </div>
            <div className="date textBox ">Datum prijave: {this.date} </div>

            <div className="buttons">
              <div className="requestButton">
                <SubmitButton
                  className="requestButton"
                  text="Prihvati"
                  onClick={() => {}}
                />
              </div>

              <div className="requestButton">
                <SubmitButton
                  className="requestButton"
                  text="Odbaci"
                  onClick={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Request;
