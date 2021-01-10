import React from "react";
import Header from "../components/Header";
import CartographForm from "../components/CartographForm";
import EditProfile from "../components/EditProfile";
import Ban from "../components/Ban";
import "../styles/App.css";
import cards from "../utils/cards.png";
import stats from "../utils/statistics.png";
import { Link } from "react-router-dom";
import "../styles/PlayerProfile.css";

class PlayerProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: this.props.user.username,
      email: this.props.user.email,
      photoLink: this.props.user.photoLink,
      anotherPlayer: this.props.user.anotherPlayer,
      authorityLevel: "",
      showEdit: false,
      showBan: false
    }
  }

  /*componentDidMount() {
    console.log(this.state)
  }
  */
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

  showBanWindow = (e) => {
    this.setState({
      showBan: !this.state.showBan
    });
  };

  onCloseEdit = (e) => {
    this.setState({
      showEdit: false,
    });
  };

  showCartograph = (e) => {
    this.setState({
      showCartograph: !this.state.showCartograph,
    });
  };

  onCloseCartograph = (e) => {
    this.setState({
      showCartograph: false,
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
                </span>
                <span className="logo-title-light email">
                  {this.state.email}
                </span>
                <br />
                <span className="logo-title-light title">
                  Player
                </span>

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
                    onClose={() => this.onCloseEdit()}
                    user={this.state}
                  />
                
              </div>
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
                    onClose={() => this.onCloseEdit()}
                    user={this.state}
                  />
                </p>}
            </div>
          </div>

          

          <div className="w-1/4 form geo-color">
            <div className="h-12"></div>
            {this.state.anotherPlayer === false && <CartographForm />}
          </div>

        </div>
      </>
    );
  }
}

export default PlayerProfile;
