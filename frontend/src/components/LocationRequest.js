import React from "react";
import SubmitButton from "./SubmitButton";
import MapOneLocation from "./MapOneLocation";
import "../styles/Request.css";
import { toast } from "react-toastify";

class LocationRequest extends React.Component {
  constructor(props) {
    super(props);
    this.setShow = this.props.setShow
    this.showOnMap = 0
    this.state = {
      locationName: this.props.request.locationName,
      playerUsername: this.props.request.playerUsername,
      locationPhoto: this.props.request.locationPhoto,
      locationDesc: this.props.request.locationDesc,
      validationInPerson: this.props.request.locationStatus,
      coordinates: this.props.request.coordinates
    };
  }

  async acceptApply(){
    try {
      let res = await fetch('/api/location/requests/update?locationName=' 
                              + this.state.locationName
                              + '&status=0');
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
      let res = await fetch('/api/location/requests/update?locationName=' 
                              + this.state.locationName
                              + '&status=1');
      let result = await res.json();
      if (result && result.message) {
        toast(result.message);
      }
    } catch(e){
        toast("Dogodila se pogreška.");
    }
  }

  async validationInPerson(){
    try {
      let res = await fetch('/api/location/requests/update?locationName=' 
                            + this.state.locationName
                            + '&status=3');
      let result = await res.json();
      if (result && result.message) {
        toast(result.message);
      }
    } catch(e){
        toast("Dogodila se pogreška.");
    }
  }

  showMap(e) {
    this.showOnMap = e;
    if (e !== 0 && e !== 1)
      this.setState(e, () => {
        console.log(this.state.locationName, 'locationName');
      }); 
    else
      this.setState(this.state);
  }

  render() {
    if (this.showOnMap !== 1)
      return (
        <div className="overlayRequest">
          <div className="modalRequest">
            <div className="cartographerRequest modal-contentRequest">
              <button onClick={() => this.setShow(0)} 
                    style={{alignSelf:'start', margin:'5px'}}>Close</button>
              <div className="username textBox">
                Lokacija: {this.state.locationName}
              </div>
              <div className="username textBox">
                Opis lokacije: {this.state.locationDesc}
              </div>
              <div className="picture">
                <img
                  src={this.state.locationPhoto}
                  className="picture"
                  alt="Location picture"
                ></img>
              </div>

            <div className="w-100%">
                <SubmitButton
                  className="requestButton"
                  text="Prikaži na mapi"
                  style={{alignSelf:'center', width:'100%'}}
                  onClick={() => this.showMap(1)}
                />
            </div>

            {this.state.validationInPerson === 0 &&
                <div className="w-100%">
                  <SubmitButton
                    className="requestButton"
                    text="Potreban pregled na terenu"
                    onClick={() => {this.setShow(0); this.validationInPerson() } }
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
      if (this.showOnMap === 1)
        return (
          <div className="overlayRequest">
            <div className="modalRequest">
              <div className="map">
                  <MapOneLocation setShow={this.showMap}
                                  location = {this.props.request}/>
              </div>
            </div>
          </div>
        );
  }
}

export default LocationRequest;
