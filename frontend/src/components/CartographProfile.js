import React from "react";
import Header from "./Header";
import LocationRequests from './LocationRequests';
import LocationRequest from './LocationRequest';
import SubmitButton from "./SubmitButton";
import EditProfile from "./EditProfile";
import LocationsInPerson from './LocationsInPerson';
import Ban from "../components/Ban";
import ChangeRole from '../components/ChangeRole';
import "../styles/App.css";
import cards from "../utils/cards.png";
import stats from "../utils/statistics.png";
import { Link } from "react-router-dom";
import "../styles/PlayerProfile.css";
import "../styles/CartographProfile.css";

/*      TO DO
makniti pocetne podatke  */
class CartographProfile extends React.Component {
  constructor(props) {
    super(props);
    this.locationsInPerson = 0;
    this.showLocationRequest = 0;
    this.state = {
      username: this.props.user.username,
      email: this.props.user.email,
      photoLink: this.props.user.photoLink,
      anotherPlayer: this.props.user.anotherPlayer,
      authorityLevel: "",
      showEdit: false,
      showBan: false,
      showChangeRole: false
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

  showEditWindow = (e) => {
    this.setState({
      showEdit: !this.state.showEdit,
    });
  };

  setShowLocationRequest = e => {
    this.setLocationRequest(e)
    this.showLocationRequest = e;
    this.setState(this.state);
  }

  setLocationRequest = e => {
    this.locationRequest = e;
    this.setState(this.state);
  }

  setRequest = (e) => {
    this.request = e;
    this.setState(this.state);
  };

  setShowRequest = (e) => {
    this.showRequest = e;
    this.setState(this.state);
  };

  showLocationsInPerson = e => {
    this.locationsInPerson = e;
    this.setState(this.state);
  }

  onClose = (e) => {
    this.setState({
      show: false,
      showEdit: false,
      showBan: false,
      showChangeRole: false
    });
  };

  showBanWindow = (e) => {
    this.setState({
      showBan: !this.state.showBan
    });
  };

  showChangeRoleWindow = (e) => {
    this.setState({
      showChangeRole: !this.state.showChangeRole
    });
  };

  render() {
    if (
      this.locationsInPerson === 0 && this.showLocationRequest === 0
    )
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
                  </span>
                  <span className="logo-title-light email">
                    {this.state.email}
                  </span>
                  <br />
                  <span className="logo-title-light title">
                    Cartograph
                  </span>
                </div>
                {this.state.anotherPlayer === false &&
                  <div className="adminBtns">
                      <SubmitButton
                          className="adminBtn"
                          text="Locations for validation in person"
                          onClick={() => this.showLocationsInPerson(1)}
                      />
                  </div>
                }
                  {this.state.authorityLevel === 'admin' &&
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

                  {this.state.authorityLevel === 'admin' &&
                  <button 
                    className="btnLogout btnEdit"
                    onClick={(e) => {
                      this.showChangeRoleWindow();
                  }}>
                    Change role
                  </button>}
                  <ChangeRole
                    show={this.state.showChangeRole}
                    onClose={() => this.onClose()}
                    user={this.state}
                  />
              </div>

              <div className="links">
                <div className=" text-center link">
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
                
                {(this.state.anotherPlayer === false || this.state.authorityLevel === 'admin' )&&
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
                }
              </div>
            </div>

            <div className="w-1/4 form geo-color requests">
              <div className="h-12"></div>
              {this.state.anotherPlayer === false &&
                <LocationRequests
                  setShow={this.setShowLocationRequest}
                  setRequest={this.setLocationRequest}
                />
              }
            </div>
          </div>
        </>
      );

      if (
        this.locationsInPerson === 1 || this.showLocationRequest !== 0
      )
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
                    </span>
                    <span className="logo-title-light email">
                      {this.state.email}
                    </span>
                    <br />
                    <span className="logo-title-light title">
                      Cartograph
                    </span>
                  </div>
  
                  <div className="adminBtns">
                      <SubmitButton
                          text="Locations for validation in person"
                          onClick={() => this.showLocationsInPerson(1)}
                      />
                    </div>
                </div>
  
                <div className="links">
                  <div className=" text-center link">
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
  
                  {(this.state.anotherPlayer === false || this.state.authorityLevel === 'admin' )&&
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
                </p>}
                </div>
              </div>
  
              <div className="w-1/4 form geo-color requests">
                <div className="h-12"></div>
                  <LocationRequests
                    setShow={this.setShowRequest}
                    setRequest={this.setRequest}
                  />
              </div>
              {this.locationsInPerson === 1 &&
                      <LocationsInPerson setShow={ this.showLocationsInPerson }
                                      setShowLocation={ this.setShowLocationRequest }
                                      setRequest={ this.setLocationRequest }/>
                  }
                  {this.showLocationRequest !== 0 &&
                      <LocationRequest setShow={ this.setShowLocationRequest } 
                                      setRequest={ this.setLocationRequest }
                                      request={this.locationRequest}/>
                  }
            </div>
          </>
        );
  }
}

export default CartographProfile;
