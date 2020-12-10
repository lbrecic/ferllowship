import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartographForm from "../components/CartographForm";
import EditProfile from "../components/EditProfile";
import "../styles/App.css";
import cards from "../utils/cards.png";
import stats from "../utils/statistics.png";
import { Link } from "react-router-dom";
import "../styles/PlayerProfile.css";

/*      TO DO
makniti pocetne podatke  */
class PlayerProfile extends React.Component {
  state = {
    username: "ime",
    email: "email.email",
    photoLink:
      "https://images.telegram.hr/oTlwxfMQf_77UaG5mrqBIrJkWP-1Afpd0H72rU9U6y0/preset:article2/aHR0cHM6Ly93d3cudGVsZWdyYW0uaHIvd3AtY29udGVudC91cGxvYWRzLzIwMjAvMTIvcHhsLTAyMDQxOC0yMDE4OTE5OS5qcGVn.jpg",
    authorityLevel: "player",
    show: false,
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
        <Header/>

        <div className="geo-color body">
          <div className="info geo-color">
            <div className="profileInfo">
              
              <div className="picture">
              <img src={this.state.photoLink} alt="logo"  className="box-shadow"/>
              </div>

              <div className="logo-title">
                <span className="logo-title-light profileName">{this.state.username}</span> <br/>
                <span className="logo-title-light email">{this.state.email}</span>
              </div>


            </div>

            <div className="links">
              <div className=" text-center link box-shadow">
                <Link to="/deck">
                  <div className="flex justify-center">
                    <img src={cards} className="karte" alt="logo" />
                  </div> 
                  <span className="logo-title-light textKarte">Moje karte</span>
                </Link>
              </div>

              <div className="text-center link box-shadow">
                <Link to="/stats">
                  <div className="flex justify-center">
                    <img src={stats} className="statistika" alt="logo" />
                  </div>
                  <span className="logo-title-light textStatistika">Moja statistika</span>
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
                show={this.state.show}
                onClose={() => this.onClose()}
              />
            </p>
            </div>

            
          </div>

          <div className="w-1/4 form geo-color">
            <div className="h-12"></div>
            <CartographForm />
          </div>      
        </div>    
        <Footer />    
      </>
    );
  }
}

export default PlayerProfile;
