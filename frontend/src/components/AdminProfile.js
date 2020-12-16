import React from "react";
import Header from "../components/Header";
import CartographRequests from "../components/CartographRequests";
import CartographRequest from "../components/CartographRequest";
import SubmitButton from "../components/SubmitButton";
import PromoteAdmin from "../components/PromoteAdmin";
import AllUsersWindow from "../components/AllUsersWindow";
import "../styles/AdminProfile.css";
import cards from "../utils/cards.png";
import stats from "../utils/statistics.png";
import { Link } from "react-router-dom";

class AdminProfile extends React.Component {
  constructor(props) {
    super(props);
    this.showCartographRequest = 0;
    this.cartographRequest = 0;
    this.promoteWindow = 0;
    this.allUsersWindow = 0;
  }

  state = {
    username: "",
    email: "",
    photoLink: "",
    authorityLevel: "admin",
    show: false,
  };

  async componentDidMount() {
    try {
      let res = await fetch("/api/player?username=" + localStorage.username);
      let result = await res.json();

      if (result && !result.error) {
        this.setState({
          username: result.username,
          email: result.email,
          photoLink: result.photoLink,
          authorityLevel: result.authorityLevel,
        });
      }
    } catch (e) {}
  }

  setShowCartographRequest = (e) => {
    this.showCartographRequest = e;
    this.setState(this.state);
  };

  setCartographRequest = (e) => {
    this.cartographRequest = e;
    this.setState(this.state);
  };

  showPromoteWindow = (e) => {
    this.promoteWindow = e;
    this.setState(this.state);
  };

  showAllUsersWindow = (e) => {
    console.log(e);
    this.allUsersWindow = e;
    this.setState(this.state);
  };

  showEditWindow = (e) => {
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
    if (
      this.showCartographRequest === 0 &&
      this.promoteWindow === 0 &&
      this.allUsersWindow === 0
    )
      return (
        <>
          <Header />
          <div className="geo-color adminBody">
            <div className="adminProfileInfo">
              <div className="adminPicture">
                <img
                  src={this.state.photoLink}
                  alt="logo"
                  className="box-shadow"
                />
              </div>

              <div className="logo-title">
                <span className="logo-title-light profileName">
                  {this.state.username}
                </span>
                <br />
                <span className="logo-title-light email">
                  {this.state.email}
                </span>
              </div>

              <div className="adminBtns">
                <SubmitButton
                  className="adminBtn"
                  text="Show all users"
                  onClick={() => this.showAllUsersWindow(1)}
                />
                <SubmitButton
                  className="adminBtn"
                  text="Promote someone to admin"
                  onClick={() => this.showPromoteWindow(1)}
                />
              </div>
            </div>
            <div className="adminLinks">
              <div className=" text-center link ">
                <Link to="/deck">
                  <div className="flex justify-center">
                    <img src={cards} className="karte" alt="logo" />
                  </div>
                  <span className="logo-title-light textKarte">Moje karte</span>
                </Link>
              </div>

              <div className="text-center link ">
                <Link to="/stats">
                  <div className="flex justify-center">
                    <img src={stats} className="statistika" alt="logo" />
                  </div>
                  <span className="logo-title-light textStatistika">
                    Moja statistika
                  </span>
                </Link>
              </div>

              {/* <p className=" white">
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
              </p> */}
            </div>

            <div className="w-1/4 form geo-color adminForm">
              <div className="h-12"></div>
              <CartographRequests />
            </div>
          </div>
        </>
      );

    if (
      this.showCartographRequest !== 0 ||
      this.promoteWindow === 1 ||
      this.allUsersWindow === 1
    )
      return (
        <>
          <Header />
          <div className="geo-color adminBody">
            <div className="adminInfo geo-color">
              <div className="adminProfileInfo">
                <div className="adminPicture">
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

                <div className="adminBtns">
                  <SubmitButton
                    className="adminBtn"
                    text="Show all users"
                    onClick={() => this.showAllUsersWindow(1)}
                  />
                  <SubmitButton
                    className="adminBtn"
                    text="Promote someone to admin"
                    onClick={() => this.showPromoteWindow(1)}
                  />
                </div>
              </div>

              <div className="adminLinks">
                <div className=" text-center adminLink ">
                  <Link to="/deck">
                    <div className="flex justify-center">
                      <img src={cards} className="karte" alt="logo" />
                    </div>
                    <span className="logo-title-light textKarte">
                      Moje karte
                    </span>
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

                {/* <p className=" white">
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
                </p> */}
              </div>
            </div>
            <div className="w-1/4 form geo-color adminForm">
              <div className="h-12"></div>
              <CartographRequests />
            </div>
            <div className="w-1/4">
              <div className="h-12"></div>
              {this.allUsersWindow === 1 && (
                <AllUsersWindow setShow={this.showAllUsersWindow} />
              )}
              {this.promoteWindow === 1 && (
                <PromoteAdmin setShow={this.showPromoteWindow} />
              )}
              {this.showCartographRequest !== 0 && (
                <CartographRequest
                  setShow={this.setShowCartographRequest}
                  setRequest={this.setCartographRequest}
                  request={this.cartographRequest}
                />
              )}
              <CartographRequests
                setShow={this.setCartographRequest}
                setRequest={this.setCartographRequest}
              />
            </div>
          </div>
        </>
      );
  }
}

export default AdminProfile;
