import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { toast } from 'react-toastify';
import EditLocation from "./EditLocation";
import "../styles/MapStyle.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Card } from "react-bootstrap";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import position from "../utils/position.png";
import uncollected_close from "../utils/uncollected_close.png";
import uncollected_distant from "../utils/uncollected_distant.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41]
});

let UncollectedIcon = L.icon({
  iconUrl: uncollected_close,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

let DistantIcon = L.icon({
  iconUrl: uncollected_distant,
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

L.Marker.prototype.options.icon = DefaultIcon;

class MapComponent extends Component {

  constructor(props) {
    super(props);
    this.distant = this.props.distant;
    this.state = {
      center: { lat: 45.127804527473224, lng: 16.045532226562504 },
      zoom: 7,
      collected: [],
      uncollected: [],
      distant: [],
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
    // try {
    //   let res = await fetch('/api/location/requests?status=0');
    //   let result = await res.json();
    //   if (result) {
    //     this.setState({
    //       data: result
    //     });
    //   }
    // } catch (e) {
    //     console.log(e);
    // }

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
  }

  render() {
    const { center, zoom, collected, uncollected, distant } = this.state;
    return (
      <>
        <div className="mapContainer">
          <MapContainer center={center} zoom={zoom} className="map">

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
