import React from "react";
import SubmitButton from "./SubmitButton";
import "../styles/Request.css";
import { toast } from "react-toastify";

class CartographRequest extends React.Component {
  constructor(props) {
    super(props);
    this.setShow = this.props.setShow
    this.state = {
      username: this.props.request.username,
      iban: this.props.request.iban,
      idPhotoLink: this.props.request.idPhotoLink,
      buttonDisabled: false,
    };
  }

  async acceptApply(){
    try {
      let res = await fetch('/api/requests/accept?username=' + this.state.username);
      let result = await res.json();
      if (result && result.message) {
        toast(result.message);
      }
    } catch(e){
        toast("Error occured.");
    }
    window.location.reload();
  }

  async declineApply(){
    try {
      let res = await fetch('/api/requests/decline?username=' + this.state.username);
      let result = await res.json();
      if (result && result.message) {
        toast(result.message);
      }
    } catch(e){
        toast("Error occured.");
    }
    window.location.reload();
  }

  render() {
      return (
        <div className="overlayRequest">
          <div className="modalRequest">
            <div className="cartographerRequest modal-contentRequest">
              <button onClick={() => this.setShow(0)} 
                    style={{alignSelf:'start', margin:'5px'}}>Close</button>
              <div className="username textBox">
                Username: {this.state.username}
              </div>
              <div className="IBAN textBox">IBAN: {this.state.iban}</div>
              <div className="picture">
                <img
                  src={this.state.idPhotoLink}
                  className="picture"
                  alt="Profile pic"
                ></img>
              </div>

              <div className="buttons">
                <div className="requestButton">
                  <SubmitButton
                    className="requestButton"
                    text="Accept"
                    onClick={() => {this.setShow(0); this.acceptApply() } }
                  />
                </div>

                <div className="requestButton">
                  <SubmitButton
                    className="requestButton"
                    text="Decline"
                    onClick={() => { this.setShow(0); this.declineApply() } }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export default CartographRequest;
