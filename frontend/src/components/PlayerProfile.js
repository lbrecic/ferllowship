import React from "react";
import Header from "../components/Header";
import CartographForm from "../components/CartographForm";
import EditProfile from "../components/EditProfile";
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
      showEdit: false
    }
  }

  componentDidMount() {
    console.log(this.state)
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
              </div>
            </div>

            <div className="links">
              <div className=" text-center link ">
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

              {this.state.anotherPlayer === false &&
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
