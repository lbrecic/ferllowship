import React from "react";
import SubmitButton from "./SubmitButton";
import "../styles/Request.css";
import { toast } from "react-toastify";

class LocationRequest extends React.Component {
  constructor(props) {
    super(props);
    this.setShow = this.props.setShow
    this.state = {
        // promjeniti u odgovarajuće atribute, ovi su otprilike
      locationName: this.props.request.locationName,
      playerUsername: this.props.request.playerUsername,
      locationPhotoLink: this.props.request.locationPhotoLink,
      locationCoordinates: this.props.request.locationCoordinates,
      validationInPerson: this.props.request.validationInPerson,
      buttonDisabled: false,
    };
  }

  async acceptApply(){
    try {
        // promjeniti u odgovarajucu adresu
      let res = await fetch('/api/requests/accept?location=' + this.state.locationName);
      let result = await res.json();
      if (result && result.message) {
        toast(result.message);
      }
    } catch(e){
        toast("Dogodila se pogreška.");
    }
  }

  async declineApply(){
    try {
        // promjeniti u odgovarajucu adresu
      let res = await fetch('/api/requests/decline?location=' + this.state.locationName);
      let result = await res.json();
      if (result && result.message) {
        toast(result.message);
      }
    } catch(e){
        toast("Dogodila se pogreška.");
    }
  }

  render() {
      return (
        <div className="overlayRequest">
          <div className="modalRequest">
            <div className="cartographerRequest modal-contentRequest">
              <button onClick={() => this.setShow(0)} 
                    style={{alignSelf:'start', margin:'5px'}}>x</button>
              <div className="username textBox">
                Lokaciju prijavio: {this.state.playerUsername}
              </div>
              <div className="username textBox">
                Lokacija: {this.state.locationName}
              </div>
              <div className="picture">
                <img
                  src={this.state.locationPhotoLink}
                  className="picture"
                  alt="Location picture"
                ></img>
              </div>

            <div className="w-100%">
                <SubmitButton
                className="requestButton"
                text="Prikaži na mapi"
                style={{alignSelf:'center', width:'100%'}}
                onClick={() => this.setShow(0) }
                />
            </div>

            {this.state.validationInPerson == 0 &&
                <div className="w-100%">
                  <SubmitButton
                    className="requestButton"
                    text="Potreban pregled na terenu"
                    onClick={() => this.setShow(0) }
                  />
                </div>
            }

            <div className="buttons">
                <div className="requestButton">
                  <SubmitButton
                    className="requestButton"
                    text="Prihvati"
                    onClick={() => {this.setShow(0); this.acceptApply() } }
                  />
                </div>

                <div className="requestButton">
                  <SubmitButton
                    className="requestButton"
                    text="Odbaci"
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

export default LocationRequest;
