import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/MapPage.css";
import "leaflet/dist/leaflet.css";
import Leaflet from "leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import AddLocation from '../components/AddLocation'

let DefaultIcon = Leaflet.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});


Leaflet.Marker.prototype.options.icon = DefaultIcon;

class MapPage extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     Locations: [],
  //     currentLocation: { lat: 45.815399, lng: 15.966568 },
  //     zoom: 12,
  //   };
  // }


   render() {
  //   const { currentLocation, zoom } = this.state;

    return (
      <>
        <Header />
        <div id="mapid">
          
        </div>
        
        <Footer />
      </>
    );
  }
}

export default MapPage;
