import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/MapStyle.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: { lat: 45.815399, lng: 15.966568 },
      zoom: 12,
      data: [
        { lat: 45.815399, lng: 15.966568 },
        { lat: 45.835399, lng: 15.966568 },
        { lat: 45.815399, lng: 16.066568 },
      ],
    };
  }

  render() {
    const { currentLocation, zoom, data } = this.state;
    return (
      <>
        <div className="mapContainer">
          <MapContainer center={currentLocation} zoom={zoom} className="map">
            <TileLayer
              url="https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=JiIiuxyafWjR1SPu3uIu"
              attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
            />
            {data.map((value, index) => {
                return <Marker position={value}>
                <Popup>{index}</Popup>
              </Marker>
            })}            
          </MapContainer>
        </div>
      </>
    );
  }
}

export default MapComponent;
