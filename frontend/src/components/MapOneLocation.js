import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "../styles/MapStyle.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import 'leaflet-routing-machine';
import { Card } from "react-bootstrap";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import position from "../utils/position.png";
import { toast } from "react-toastify";

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41]
  });

let PositionIcon = L.icon({
    iconUrl: position,
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

class MapOneLocation extends React.Component {
    constructor(props) {
        super(props);
        this.setShow = this.props.setShow;
        this.location = this.props.location;
        this.state = {
          center: this.props.location.coordinates,
          zoom: 12
        };
      }

  osrm = () => {
      L.Routing.control({
        waypoints: [
            L.latLng(this.state.currentPosition.lat, this.state.currentPosition.lon),
            L.latLng(this.location.coordinates.lat, this.location.coordinates.lng)
        ]
      }).addTo(map);
    this.setState(this.state);
  }

  async componentDidMount() {
    try{
      let res = await fetch('/api/player/coordinates');
      let result = await res.json();
      if (result) {
        this.setState({
          currentPosition: result
        }, () => {
          if(this.state.currentPosition !== undefined && this.state.currentPosition !== null) 
            this.osrm()
        });
      }
    } catch (e) {
        console.log(e);
    }
  }

  render() {
      return (
          <>
            <button onClick={() => this.setShow(0)} 
                    style={{alignSelf:'start'}}>Close</button>
            <div className="mapContainer">
                <MapContainer id='map' center={this.state.center} zoom={this.state.zoom} className="map">
                <GetMap />
                <TileLayer
                url="https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=JiIiuxyafWjR1SPu3uIu"
                attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                />

                <Marker position={this.location.coordinates}>
                    <Popup>
                    <Card>
                        <Card.Img variant="top" src={this.location.locationPhoto} />
                        <Card.Body>
                        <Card.Title>{this.location.locationName}</Card.Title>
                        <Card.Text>
                            Category: {this.location.category.categoryName}<br />
                            Points: {this.location.category.categoryPoints}<br />
                            Description: {this.location.locationDesc}
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    </Popup>
                </Marker>
                {this.state.currentPosition !== null && this.state.currentPosition !== undefined &&
                  <>
                  <Marker position={this.state.currentPosition}
                          icon={PositionIcon}>
                    <Popup>
                      <p>Your location</p>
                      <p>lat: {this.state.currentPosition.lat}</p>
                      <p>lng: {this.state.currentPosition.lon}</p>
                    </Popup>
                  </Marker>
                  </>
                }
                </MapContainer>
            </div>
        </>
      );
  }
}

export default MapOneLocation;