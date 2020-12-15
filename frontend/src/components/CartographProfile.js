import React from "react";
import Header from "../components/Header";
import EditProfile from "../components/EditProfile";
import "../styles/App.css";
import cards from "../utils/cards.png";
import stats from "../utils/statistics.png";
import { Link } from "react-router-dom";
import "../styles/PlayerProfile.css";
import "../styles/CartographProfile.css";

import LocationRequests from "./LocationRequests";

/*      TO DO
makniti pocetne podatke  */
class CartographProfile extends React.Component {
  state = {
    username: "",
    email: "",
    photoLink:
      "",
    authorityLevel: "player",
    showEdit: false,
    showRequest: false,
  };

  async componentDidMount() {
    try {
      let res = await fetch("/api/players?username=" + localStorage.username);
      let result = await res.json();

      if (result && !result.error) {
        this.setState({
          username: result.username,
          email: result.email,
          photoLink: result.photoLink,
        });
      }
    } catch (e) {}
  }

  showEditWindow = (e) => {
    this.setState({
      showEdit: !this.state.showEdit,
    });
  };

  onCloseEdit = (e) => {
    this.setState({
      showEdit: false,
    });
  };

  setRequest = (e) => {
    this.request = e;
    this.setState(this.state);
  };

  setShowRequest = (e) => {
    this.showRequest = e;
    this.setState(this.state);
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

        <div className="geo-color body">
          <div className="info geo-color">
            <div className="profileInfo">
              <div className="picture">
                <img
                  src={this.state.photoLink}
                  alt="logo"
                  className="box-shadow"
                />
              </div>

              <div className="logo-title">
                <span className="logo-title-light profileName">
                  {this.state.username}
                </span>{" "}
                <br />
                <span className="logo-title-light email">
                  {this.state.email}
                </span>
              </div>
            </div>

            <div className="links">
              <div className=" text-center link">
                <Link to="/deck">
                  <div className="flex justify-center">
                    <img src={cards} className="karte" alt="logo" />
                  </div>
                  <span className="logo-title-light textKarte">Moje karte</span>
                </Link>
              </div>

              <div className="text-center link">
                <Link to="/stats">
                  <div className="flex justify-center">
                    <img src={stats} className="statistika" alt="logo" />
                  </div>
                  <span className="logo-title-light textStatistika">
                    Moja statistika
                  </span>
                </Link>
              </div>

              <p className=" white">
                <button
                  className="btnLogout btnEdit"
                  onClick={(e) => {
                    this.showEditWindow();
                  }}
                >
                  Uredi profil
                </button>
                <EditProfile
                  show={this.state.showEdit}
                  onClose={() => this.onCloseEdit()}
                />
              </p>
            </div>
          </div>

          <div className="w-1/4 form geo-color requests">
            <div className="h-12"></div>
              <LocationRequests
                setShow={this.setShowRequest}
                setRequest={this.setRequest}
              />
          </div>
        </div>
      </>
    );
  }
}

export default CartographProfile;
