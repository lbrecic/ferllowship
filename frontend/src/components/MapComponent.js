import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { toast } from 'react-toastify';
import EditLocation from "./EditLocation";
import "../styles/MapStyle.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Card } from "react-bootstrap";
import 'leaflet-routing-machine';

import icon from "../utils/collected.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import position from "../utils/position.png";
import uncollected_close from "../utils/uncollected_close.png";
import uncollected_distant from "../utils/uncollected_distant.png";
import new_location_icon from "../utils/new_location_icon.png";
import waiting_location_icon from "../utils/waiting_location_icon.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  //shadowUrl: iconShadow,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

let UncollectedIcon = L.icon({
  iconUrl: uncollected_close,
  //shadowUrl: iconShadow,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

let DistantIcon = L.icon({
  iconUrl: uncollected_distant,
  //shadowUrl: iconShadow,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

let PositionIcon = L.icon({
  iconUrl: position,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

let NewLocationIcon = L.icon({
  iconUrl: new_location_icon,
  //shadowUrl: iconShadow,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

let WaitingLocationIcon = L.icon({
  iconUrl: waiting_location_icon,
  //shadowUrl: iconShadow,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

L.Marker.prototype.options.icon = DefaultIcon;

let map;

function GetMap() {
  map = useMap()
  return null
}

class MapComponent extends Component {

  constructor(props) {
    super(props);
    this.distant = this.props.distant;
    this.newRequests = this.props.newRequests;
    this.inPersonRequests = this.props.inPersonRequests;
    this.state = {
      center: { lat: 45.127804527473224, lng: 16.045532226562504 },
      zoom: 7,
      collected: [],
      uncollected: [],
      distant: [],
      newRequests: [],
      inPersonRequests: [],
      authorityLevel: "player",
      editWindow: false,
      editLocation: 0,
      currentPosition: this.props.currentPosition
    };
  }

  showEdit = e => {
    this.setState({
      editWindow: e
    })
  }

  async osrm() {
    this.tripArray = [0];
    this.osrmAddress = `http://router.project-osrm.org/trip/v1/driving/${this.state.currentPosition.lon},${this.state.currentPosition.lat}`;
    this.state.inPersonRequests.map((location) => {
      this.osrmAddress = this.osrmAddress.concat(`;${location.coordinates.lng},${location.coordinates.lat}`);
      this.tripArray.push(0);
    });
    this.osrmAddress = this.osrmAddress.concat('?source=first');

    try{
      let res = await fetch(`${this.osrmAddress}`);
      let result = await res.json();
      if (result) {
        result.waypoints.map((waypoint) => {
          this.tripArray[waypoint.waypoint_index] = L.latLng(waypoint.location[1], waypoint.location[0]);
        })
        this.tripArray.push(L.latLng(this.state.currentPosition.lat, this.state.currentPosition.lon))
      }
    } catch(e) {
      console.log(e);
    }
    
    L.Routing.control({
      waypoints: this.tripArray
    }).addTo(map);
    this.setState(this.state);
  }

  async acceptApply(locationName){
    try {
      let res = await fetch(`/api/location/requests/update?locationName=${locationName}&status=0`);
      let result = await res.json();
      if (result && result.message) {
        toast(result.message);
      }
    } catch(e){
        toast("Error occured.");
    }
    this.componentDidMount();
  }

  async declineApply(locationName){
    try {
      let res = await fetch(`/api/location/requests/update?locationName=${locationName}&status=1`);
      let result = await res.json();
      if (result && result.message) {
        toast(result.message);
      }
    } catch(e){
        toast("Error occured.");
    }
    this.componentDidMount();
  }

  async validationInPerson(locationName){
    try {
      let res = await fetch(`/api/location/requests/update?locationName=${locationName}&status=3`);
      let result = await res.json();
      if (result && result.message) {
        toast(result.message);
      }
    } catch(e){
        toast("Error occured.");
    }
    this.componentDidMount();
  }

  async collect(locationName) {
    const formData = new FormData();
    formData.append("locationName", locationName);

    try {
      let res = await fetch('/api/location/collect', {
          method: 'post',
          body: formData
      });

      let result = await res.json();
      if (result && result.message) {
        toast(result.message);
      }
    } catch (e) {
        toast("Error occured.");
    }

    this.componentDidMount();
  }

  async componentDidMount() {
    try {
      let res = await fetch('/api/player');
      let result = await res.json();
      if (result) {
        this.setState({
          authorityLevel: result.authorityLevel
        });
      }
    } catch (e) {
        console.log(e);
    }

    if (this.newRequests === true) {
      try {
        let res = await fetch('/api/location/requests?status=2');
        let result = await res.json();
        if (result && result[0] !== null) {
          this.setState({
            newRequests: result
          });
        }
      } catch (e) {
          console.log(e);
      }
    } else if (this.inPersonRequests === true) {
      try {
        let res = await fetch('/api/location/requests?status=3');
        let result = await res.json();
        if (result && result[0] !== null) {
          this.setState({
            inPersonRequests: result
          }, () => {
            if(this.state.currentPosition !== undefined && this.state.currentPosition !== null) 
              this.osrm()
          });
        }
      } catch (e) {
          console.log(e);
      }
    } else {
      try {
        let res = await fetch('/api/location/collected');
        let result = await res.json();
        if (result) {
          this.setState({
            collected: result
          });
        }
      } catch (e) {
          console.log(e);
      }

      try {
        let res = await fetch('/api/location/uncollected-close');
        let result = await res.json();
        if (result) {
          this.setState({
            uncollected: result
          });
        }
      } catch (e) {
          console.log(e);
      }

      if (this.distant)
        try {
          let res = await fetch('/api/location/uncollected-distant');
          let result = await res.json();
          if (result) {
            this.setState({
              distant: result
            });
          }
        } catch (e) {
            console.log(e);
        }
    }
  }

  render() {
    const { center, zoom, collected, uncollected, distant, newRequests, inPersonRequests } = this.state;
    return (
      <>
        <div className="mapContainer">
          <MapContainer center={center} zoom={zoom} className="map">
            <GetMap />
            <TileLayer
              url="https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=JiIiuxyafWjR1SPu3uIu"
              attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
            />

            {collected.map((value, index) => {
                return (
                  <Marker position={value.coordinates}>
                    <Popup>
                      <Card>
                        <Card.Img variant="top" src={value.locationPhoto} />
                        <Card.Body>
                          <Card.Title>{value.locationName}</Card.Title>
                          <Card.Text>
                            Category: {value.category.categoryName}<br />
                            Points: {value.category.categoryPoints}<br />
                            Description: {value.locationDesc}
                          </Card.Text>
                          {this.state.authorityLevel !== 'player' &&
                            <button className="editLocationButton submitButton btn"
                              onClick={() => {this.showEdit(true); this.setState({editLocation: value})}}>
                              Edit
                            </button>
                          }
                        </Card.Body>
                      </Card>
                    </Popup>
                  </Marker>
                );
            })}
            {uncollected.map((value, index) => {
                return (
                  <Marker position={value.coordinates}
                          icon={UncollectedIcon}>
                    <Popup>
                      <Card>
                        <Card.Img variant="top" src={value.locationPhoto} />
                        <Card.Body>
                          <Card.Title>{value.locationName}</Card.Title>
                          <Card.Text>
                            Category: {value.category.categoryName}<br />
                            Points: {value.category.categoryPoints}<br />
                            Description: {value.locationDesc}
                          </Card.Text>
                          {this.state.authorityLevel !== 'player' &&
                            <button className="editLocationButton submitButton btn"
                              onClick={() => {this.showEdit(true); this.setState({editLocation: value})}}>
                              Edit
                            </button>
                          }
                          <button className="editLocationButton submitButton btn"
                              onClick={() => this.collect(value.locationName)}>
                              Collect
                          </button>
                        </Card.Body>
                      </Card>
                    </Popup>
                  </Marker>
                );
            })}
            {distant.map((value, index) => {
                return (
                  <Marker position={value.coordinates}
                          icon={DistantIcon}>
                    <Popup>
                      <Card>
                        <Card.Img variant="top" src={value.locationPhoto} />
                        <Card.Body>
                          <Card.Title>{value.locationName}</Card.Title>
                          <Card.Text>
                            Category: {value.category.categoryName}<br />
                            Points: {value.category.categoryPoints}<br />
                            Description: {value.locationDesc}
                          </Card.Text>
                          {this.state.authorityLevel !== 'player' &&
                            <button className="editLocationButton submitButton btn"
                              onClick={() => {this.showEdit(true); this.setState({editLocation: value})}}>
                              Edit
                            </button>
                          }
                          <button className="editLocationButton submitButton btn distant"
                                 disabled>
                              Collect
                          </button>
                        </Card.Body>
                      </Card>
                    </Popup>
                  </Marker>
                );
            })}
            {newRequests.map((value, index) => {
                return (
                  <Marker position={value.coordinates}
                          icon={NewLocationIcon}>
                    <Popup>
                      <Card>
                        <Card.Img variant="top" src={value.locationPhoto} />
                        <Card.Body>
                          <Card.Title>{value.locationName}</Card.Title>
                          <Card.Text>
                            Category: {value.category.categoryName}<br />
                            Points: {value.category.categoryPoints}<br />
                            Description: {value.locationDesc}
                          </Card.Text>
                          <button className="otherLocationButton submitButton btn"
                            onClick={() => {this.showEdit(true); this.setState({editLocation: value})}}>
                            Edit
                          </button>
                          <button className="otherLocationButton submitButton btn"
                            onClick={() => this.validationInPerson(value.locationName)}>
                            Validation in person needed
                          </button>
                          <div className="buttons">
                            <div className="requestButton">
                              <button className="otherLocationButton submitButton btn"
                                onClick={() => this.acceptApply(value.locationName)}>
                                Accept
                              </button>
                            </div>
                            <div className="requestButton">
                              <button className="otherLocationButton submitButton btn"
                                onClick={() => this.declineApply(value.locationName)}>
                                Decline
                              </button>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Popup>
                  </Marker>
                );
            })}
            {inPersonRequests.map((value, index) => {
                return (
                  <Marker className="inPersonMarker"
                          position={value.coordinates}
                          icon={WaitingLocationIcon}>
                    <Popup>
                      <Card>
                        <Card.Img variant="top" src={value.locationPhoto} />
                        <Card.Body>
                          <Card.Title>{value.locationName}</Card.Title>
                          <Card.Text>
                            Category: {value.category.categoryName}<br />
                            Points: {value.category.categoryPoints}<br />
                            Description: {value.locationDesc}
                          </Card.Text>
                          <button className="otherLocationButton submitButton btn"
                            onClick={() => {this.showEdit(true); this.setState({editLocation: value})}}>
                            Edit
                          </button>
                          <div className="buttons">
                            <div className="requestButton">
                              <button className="otherLocationButton submitButton btn"
                                onClick={() => this.acceptApply(value.locationName)}>
                                Accept
                              </button>
                            </div>
                            <div className="requestButton">
                              <button className="otherLocationButton submitButton btn"
                                onClick={() => this.declineApply(value.locationName)}>
                                Decline
                              </button>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Popup>
                  </Marker>
                );
            })}
          {this.state.currentPosition !== null && this.state.currentPosition !== undefined &&
            <Marker position={this.state.currentPosition}
                    icon={PositionIcon}>
              <Popup>
                <p>Your location</p>
                <p>lat: {this.state.currentPosition.lat}</p>
                <p>lng: {this.state.currentPosition.lon}</p>
                <p>More or less {this.state.currentPosition.accuracy} meters.</p>
              </Popup>
            </Marker>
          }
          </MapContainer>
          {this.state.editWindow &&
            <EditLocation setShow={this.showEdit} 
                          location={this.state.editLocation}
            />
          }
        </div>
      </>
    );
  }

}

export default MapComponent;
