import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../styles/MapStyle.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Card } from "react-bootstrap";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41]
  });
  
  L.Marker.prototype.options.icon = DefaultIcon;

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

  render() {
      return (
          <>
            <button onClick={() => this.setShow(0)} 
                    style={{alignSelf:'start'}}>Close</button>
            <div className="mapContainer">
                <MapContainer center={this.state.center} zoom={this.state.zoom} className="map">

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

                </MapContainer>
            </div>
        </>
      );
  }
}

export default MapOneLocation;