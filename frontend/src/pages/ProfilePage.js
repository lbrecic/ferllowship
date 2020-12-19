import React from 'react'
import PlayerProfile from '../components/PlayerProfile'
import CartographProfile from '../components/CartographProfile'
import AdminProfile from '../components/AdminProfile'
import '../styles/Profile.css'; 

class ProfilePage extends React.Component {
    constructor (props) {
        super(props);
        this.showCartographRequest = 0;
        this.cartographRequest = 0;
        this.showLocationRequest = 0;
        this.locationRequest = 0;
        this.promoteWindow = 0;
        this.allUsersWindow = 0;
        this.locationsInPerson = 0;
        this.state = {
            username: "lukas",
            email: "lb@fer.hr",
            photoLink: "",
            authorityLevel: "cartograph",
            show: false
        };
    }

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

    setShowCartographRequest = e => {
        this.showCartographRequest = e;
        this.setState(this.state);
    }

    setCartographRequest = e => {
        this.cartographRequest = e;
        this.setState(this.state);
    }

    setShowLocationRequest = e => {
        this.showLocationRequest = e;
        this.setState(this.state);
    }

    setLocationRequest = e => {
        this.locationRequest = e;
        this.setState(this.state);
    }

    showPromoteWindow = e => {
        this.promoteWindow = e;
        this.setState(this.state);
    }

    showLocationsInPerson = e => {
        this.locationsInPerson = e;
        this.setState(this.state);
    }

    showEditWindow = e => {
        this.setState({
          show: !this.state.show
        })
    }
    
    onClose = e => {
        this.setState({
          show: false
        })
    };
    

    render() {
        if (this.state.authorityLevel === 'player')
            return (<PlayerProfile />);
        if (this.state.authorityLevel === 'cartograph')
            return (<CartographProfile />);
        if (this.state.authorityLevel === 'admin')
            return (<AdminProfile />);
    }
}
export default ProfilePage;
