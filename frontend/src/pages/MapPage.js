import { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "../components/Header";
import Loader from "../components/Loader";
import MapComponent from "../components/MapComponent";
import AddLocation from "../components/AddLocation";

import "../styles/AddLocationButton.css";

class MapPage extends Component {
  state = {
    authorityLevel: 'player',
    options: false,
    distant: false,
    newRequests: false,
    inPersonRequests: false,
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
  
    this.setState({
      currentPosition: {
        lat: crd.latitude,
        lon: crd.longitude,
        accuracy: crd.accuracy
      }
    })
  }
  
  errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  async componentDidMount() {
    try {
      let res = await fetch(`/api/player`);
      let result = await res.json();

      if (result && !result.error) {
        this.setState({
          authorityLevel: result.authorityLevel
        });
      }
    } catch (e) {}
    
    this.coordinates();
  }

  async coordinates() {
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
            <MapComponent currentPosition={this.state.currentPosition}
                          distant={this.state.distant}
                          newRequests={this.state.newRequests}
                          inPersonRequests={this.state.inPersonRequests} />
          </div>
          <div className="addBtn mapButtons">
            {this.state.options === true &&
              <button
                className="btnLogout btnEdit btnAdd"
                onClick={(e) => {
                    this.showWindow();
                }}
              >
                Make a location request
              </button>
            }
            {this.state.options === true &&
              <button
                className="btnLogout btnEdit btnAdd"
                onClick={(e) => {
                    this.setState({distant: false, currentPosition: null}); 
                    this.coordinates();
                    this.checkIn();
                }}
              >
                Update location
              </button>
            }
            {this.state.distant === false &&
            this.state.options === true &&
              <button
                className="btnLogout btnEdit btnAdd"
                onClick={(e) => {
                    this.setState({
                      distant: true, 
                      newRequests: false,
                      inPersonRequests: false,
                      currentPosition: null
                    });
                    this.coordinates();
                    this.checkIn();
                }}
              >
                Show uncollected cards
              </button>
            }
            {this.state.distant === true &&
            this.state.options === true &&
              <button
                className="btnLogout btnEdit btnAdd"
                onClick={(e) => {
                    this.setState({distant: false, currentPosition: null});
                    this.coordinates();
                    this.checkIn();
                }}
              >
                Hide uncollected cards
              </button>
            }
            {this.state.authorityLevel !== 'player' &&
              this.state.newRequests === false &&
              this.state.options === true &&
              <button
                className="btnLogout btnEdit btnAdd"
                onClick={(e) => {
                    this.setState({
                      distant: false, 
                      newRequests: true,
                      inPersonRequests: false,
                      currentPosition: null
                    });
                    this.coordinates();
                    this.checkIn();
                }}
              >
                Show new requests
              </button>
            }
            {this.state.authorityLevel !== 'player' &&
              this.state.newRequests === true &&
              this.state.options === true &&
              <button
                className="btnLogout btnEdit btnAdd"
                onClick={(e) => {
                    this.setState({newRequests: false, currentPosition: null});
                    this.coordinates();
                    this.checkIn();
                }}
              >
                Hide new requests
              </button>
            }
            {this.state.authorityLevel !== 'player' &&
              this.state.inPersonRequests === false &&
              this.state.options === true &&
              <button
                className="btnLogout btnEdit btnAdd"
                onClick={(e) => {
                    this.setState({
                      distant: false, 
                      newRequests: false,
                      inPersonRequests: true,
                      currentPosition: null
                    });
                    this.coordinates();
                    this.checkIn();
                }}
              >
                Show requests waiting validation in person
              </button>
            }
            {this.state.authorityLevel !== 'player' &&
              this.state.inPersonRequests === true &&
              this.state.options === true &&
              <button
                className="btnLogout btnEdit btnAdd"
                onClick={(e) => {
                    this.setState({inPersonRequests: false, currentPosition: null});
                    this.coordinates();
                    this.checkIn();
                }}
              >
                Hide requests waiting validation in person
              </button>
            }
            {this.state.options === false &&
              <button
                className="btnLogout btnEdit btnAdd"
                onClick={(e) => {
                    this.setState({options: true});
                }}
              >
                Options
              </button>
            }
            {this.state.options === true &&
              <button
                className="btnLogout btnEdit btnAdd"
                onClick={(e) => {
                    this.setState({options: false});
                }}
              >
                Hide options
              </button>
            }
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
