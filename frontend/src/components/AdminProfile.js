import React from "react";
import Header from "../components/Header";
import CartographRequests from "../components/CartographRequests";
import CartographRequest from "../components/CartographRequest";
import SubmitButton from "../components/SubmitButton";
import PromoteAdmin from "../components/PromoteAdmin";
import AllUsersWindow from "../components/AllUsersWindow";
import LocationRequestsAdmin from "../components/LocationRequestsAdmin";
import EditProfile from "../components/EditProfile";
import Ban from "../components/Ban";
import "../styles/PlayerProfile.css";
import "../styles/AdminProfile.css"
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
    this.locationRequestsWindow = 0;
    this.state = {
      username: this.props.user.username,
      email: this.props.user.email,
      photoLink: this.props.user.photoLink,
      anotherPlayer: this.props.user.anotherPlayer,
      authorityLevel: "",
      showEdit: false
    }
  }

  async componentDidMount() {        
    try {
        let res = await fetch('/api/player');
        let result = await res.json();
  
        if (result && !result.error) {
            this.setState({
              authorityLevel: result.authorityLevel
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
    this.allUsersWindow = e;
    this.setState(this.state);
  };

  showLocationRequestsWindow = (e) => {
    this.locationRequestsWindow = e;
    this.setState(this.state);
  };

  showEditWindow = (e) => {
    this.setState({
      showEdit: !this.state.showEdit,
    });
  };

  onClose = (e) => {
    this.setState({
      show: false,
      showEdit: false,
      showBan: false
    });
  };

  render() {
    if (
      this.showCartographRequest === 0 &&
      this.promoteWindow === 0 &&
      this.allUsersWindow === 0 && 
      this.locationRequestsWindow === 0
    )
      return (
        <>
          <Header />
          <div className="geo-color body">
            <div className="info geo-color">
              <div className="adminProfileInfo">
                <div className="picture">
                  <img
                    src={this.state.photoLink}
                    alt="logo"
                    className="box-shadow"
                  />
                </div>

                <div className="logo-title top">
                  <span className="logo-title-light profileName">
                    {this.state.username}
                  </span>
                  <span className="logo-title-light email">
                    {this.state.email}
                  </span>
                  <br />
                  <span className="logo-title-light title">
                    Administrator
                  </span>

                  {(this.state.anotherPlayer === true || this.state.authorityLevel === 'admin')&&
                    <button 
                      className="btnLogout btnEdit"
                      onClick={(e) => {
                        this.showBanWindow();
                    }}>
                      Ban
                    </button>}
                    <Ban
                      show={this.state.showBan}
                      onClose={() => this.onClose()}
                      user={this.state}
                    />
                  
                </div>
            
                {this.state.anotherPlayer === false &&
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
                    <SubmitButton
                      className="adminBtn"
                      text="Location requests"
                      onClick={() => this.showLocationRequestsWindow(1)}
                    />
                  </div>
                }
              </div>
            

              <div className="links">
                <div className=" text-center link ">
                  <Link to="/deck">
                    <div className="flex justify-center">
                      <img src={cards} className="karte" alt="logo" />
                    </div>
                    {this.state.anotherPlayer === true &&
                      <span className="logo-title-light textStatistika">
                        {this.state.username}-cards
                      </span>
                    }
                    {this.state.anotherPlayer === false &&
                      <span className="logo-title-light textStatistika">
                        My cards
                      </span>
                    }
                  </Link>
                </div>

                <div className="text-center link">
                  <Link to="/stats">
                    <div className="flex justify-center">
                      <img src={stats} className="statistika" alt="logo" />
                    </div>
                    {this.state.anotherPlayer === true &&
                      <span className="logo-title-light textStatistika">
                        {this.state.username}-statistics
                      </span>
                    }
                    {this.state.anotherPlayer === false &&
                      <span className="logo-title-light textStatistika">
                        My statistics
                      </span>
                    }
                    
                  </Link>
                </div>

                <p className=" white">
                  <button
                    className="btnLogout btnEdit"
                    onClick={(e) => {
                      this.showEditWindow();
                    }}
                  >
                    Edit profile
                  </button>
                  <EditProfile
                    show={this.state.showEdit}
                    onClose={() => this.onClose()}
                    user={this.state}
                  />
                </p>
              </div>
            </div>

            <div className="w-1/4 form geo-color requests">
              <div className="h-12"></div>
                {this.state.anotherPlayer === false &&
                  <CartographRequests
                    setShow={this.setShowCartographRequest}
                    setRequest={this.setCartographRequest}
                  />
                }
            </div>
          </div>
        </>
      );

    if (
      this.showCartographRequest !== 0 ||
      this.promoteWindow === 1 ||
      this.allUsersWindow === 1 ||
      this.locationRequestsWindow === 1
    )
      return (
        <>
          <Header />
          <div className="geo-color body">
            <div className="info geo-color">
              <div className="adminProfileInfo">
                <div className="picture">
                  <img
                    src={this.state.photoLink}
                    alt="logo"
                    className="box-shadow"
                  />
                </div>

                <div className="logo-title top">
                  <span className="logo-title-light profileName">
                    {this.state.username}
                  </span>
                  <span className="logo-title-light email">
                    {this.state.email}
                  </span>
                  <br />
                  <span className="logo-title-light title">
                    Administrator
                  </span>

                  {(this.state.anotherPlayer === true || this.state.authorityLevel === 'admin')&&
                  <button 
                    className="btnLogout btnEdit"
                    onClick={(e) => {
                      this.showBanWindow();
                    }}>
                    Ban
                  </button>}
                  <Ban
                    show={this.state.showBan}
                    onClose={() => this.onClose()}
                    user={this.state}
                  />
  
                  
                </div>
            
                {this.state.anotherPlayer === false &&
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
                    <SubmitButton
                      className="adminBtn"
                      text="Location requests"
                      onClick={() => this.showLocationRequestsWindow(1)}
                    />
                  </div>
                }
              </div>
            

              <div className="links">
                <div className=" text-center link ">
                  <Link to="/deck">
                    <div className="flex justify-center">
                      <img src={cards} className="karte" alt="logo" />
                    </div>
                    {this.state.anotherPlayer === true &&
                      <span className="logo-title-light textStatistika">
                        {this.state.username}-cards
                      </span>
                    }
                    {this.state.anotherPlayer === false &&
                      <span className="logo-title-light textStatistika">
                        My cards
                      </span>
                    }
                  </Link>
                </div>

                <div className="text-center link">
                  <Link to="/stats">
                    <div className="flex justify-center">
                      <img src={stats} className="statistika" alt="logo" />
                    </div>
                    {this.state.anotherPlayer === true &&
                      <span className="logo-title-light textStatistika">
                        {this.state.username}-statistics
                      </span>
                    }
                    {this.state.anotherPlayer === false &&
                      <span className="logo-title-light textStatistika">
                        My statistics
                      </span>
                    }
                    
                  </Link>
                </div>

                <p className=" white">
                  <button
                    className="btnLogout btnEdit"
                    onClick={(e) => {
                      this.showEditWindow();
                    }}
                  >
                    Edit profile
                  </button>
                  <EditProfile
                    show={this.state.showEdit}
                    onClose={() => this.onClose()}
                    user={this.state}
                  />
                </p>
              </div>
            </div>

            <div className="w-1/4 form geo-color requests">
              <div className="h-12"></div>
                {this.state.anotherPlayer === false &&
                  <CartographRequests
                    setShow={this.setShowCartographRequest}
                    setRequest={this.setCartographRequest}
                  />
                }
            </div>
            {this.allUsersWindow === 1 && (
              <AllUsersWindow setShow={this.showAllUsersWindow} />
            )}
            {this.promoteWindow === 1 && (
              <PromoteAdmin setShow={this.showPromoteWindow} />
            )}
            {this.locationRequestsWindow === 1 && (
              <LocationRequestsAdmin setShow={this.showLocationRequestsWindow} />
            )}
            {this.showCartographRequest !== 0 && (
              <CartographRequest
                setShow={this.setShowCartographRequest}
                setRequest={this.setCartographRequest}
                request={this.cartographRequest}
              />
            )}
          </div>
        </>
      );
  }
}

export default AdminProfile;