import { Component } from "react";
import Header from "../components/Header";
import MapComponent from "../components/MapComponent";
import "../styles/AddLocationButton.css";

class MapPage extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="body">
          <div className="map">
            <MapComponent />
          </div>
          <div className="addBtn">
            <button
              className="btnLogout btnEdit btnAdd"
              
            >
              Prijavi lokaciju
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default MapPage;
