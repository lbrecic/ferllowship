import { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "../components/Header";
import Loader from "../components/Loader";
import MapComponent from "../components/MapComponent";
import AddLocation from "../components/AddLocation";

import "../styles/AddLocationButton.css";

class MapPage extends Component {
  state = {
    show: false,
  };

  showWindow = (e) => {
    this.setState({
      show: !this.state.show,
    });
  };

  onClose = (e) => {
    this.setState({
      show: false,
    });
  };

  options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  success = (pos) => {
    var crd = pos.coords;
  
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  
    this.setState({
      currentPosition: {
        lat: crd.latitude,
        lon: crd.longitude,
        accuracy: crd.accuracy
      }
    }, () => console.log(this.state.currentPosition))
  }
  
  errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  async componentDidMount() {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((result) => {
          if (result.state === "granted") {
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(this.success);
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(this.success, this.errors, this.options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
          result.onchange = function () {
            console.log(result.state);
          };
        });
    } else {
      alert("Location not available!");
    }
  }

  async checkIn() {
    const formData = new FormData();
    formData.append("lat", this.state.currentPosition.lat);
    formData.append("lon", this.state.currentPosition.lon);

    if (this.state.currentPosition !== null && this.state.currentPosition !== undefined)
      try {
        await fetch(`/api/player/coordinates`, {
          method: 'post',
          body: formData
          });
      } catch (e) {
          console.log(e);
      }
  }

  render() {
    if (this.state.currentPosition === null || this.state.currentPosition === undefined) {
      return (
        <Loader />
      );
    }
    return (
      <>
        <Header />
        <div className="body">
          <div className="map">
            <MapComponent currentPosition={this.state.currentPosition} />
          </div>
          <div className="addBtn">
            <button
              className="btnLogout btnEdit btnAdd"
              onClick={(e) => {
                  this.showWindow();
              }}
            >
              Make a location request
            </button>
            <button
              className="btnLogout btnEdit btnAdd"
              onClick={(e) => {
                  this.setState({currentPosition: null}); 
                  this.componentDidMount();
                  this.checkIn();
              }}
            >
              Update location
            </button>
            <AddLocation
              location={this.state.currentPosition}
              show={this.state.show}
              onClose={() => this.onClose()}
            />
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(MapPage);
