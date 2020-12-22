import { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "../components/Header";
import MapComponent from "../components/MapComponent";
import AddLocation from "../components/AddLocation";

import "../styles/AddLocationButton.css";
import { toast } from "react-toastify";

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
              onClick={(e) => {
                if (localStorage.getItem("selectedLocation")) {
                  this.showWindow();
                } else {
                  toast("Odaberi lokaciju na karti.")
                }
              }}
            >
              Prijavi lokaciju
            </button>
            <AddLocation
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
