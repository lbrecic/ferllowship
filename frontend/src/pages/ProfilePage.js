import React from "react";
import "../styles/App.css";
import "../styles/Profile.css";
import AdminProfile from "../components/AdminProfile";
import PlayerProfile from "../components/PlayerProfile";
import CartographProfile from "../components/CartographProfile";

class ProfilePage extends React.Component {
  state = {
    username: "",
    email: "",
    photoLink: "",
    authorityLevel: "",
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

  render() {
    if (this.state.authorityLevel === "admin") {
      return <AdminProfile />;
    }

    if (this.state.authorityLevel === "cartograph") {
      return <CartographProfile />;
    }

    return <PlayerProfile />;
  }
}

export default ProfilePage;
