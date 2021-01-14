import React from "react";
import "../styles/Request.css";

class PromoteAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.setShow = this.props.setShow
    this.state = {
      username: this.props.user.username,
      iban: this.props.user.iban,
      idPhotoLink: this.props.user.idPhotoLink,
      buttonDisabled: false,
    };
  }

  render() {
      return (
        <div className="overlayRequest">
          <div className="modalRequest">
            <div className="cartographerRequest modal-contentRequest">
              <button onClick={() => this.setShow(0)} 
                    style={{alignSelf:'start', margin:'5px'}}>Close</button>
              <div className="textBox">
                Payment data
              </div>
              {this.state.iban !== "" &&
                <div className="IBAN textBox">IBAN: {this.state.iban}</div>
              }
              {this.state.iban === "" &&
                <div className="IBAN textBox">IBAN is not registered! Please, contact admin.</div>
              }
              {this.state.idPhotoLink !== "" &&
                <div className="picture">
                  <img
                    src={this.state.idPhotoLink}
                    className="picture"
                    alt="Profile pic"
                  ></img>
                </div>
              }
              {this.state.idPhotoLink === "" &&
                <div className="IBAN textBox">ID photo is not registered! Please, contact admin.</div>
              }
            </div>
          </div>
        </div>
      );
  }
}

export default PromoteAdmin;