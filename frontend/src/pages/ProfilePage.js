import React from 'react'
import { withRouter } from "react-router-dom";
import Loader from '../components/Loader'
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
        this.state = {}
    }

    async componentDidMount() {
        const handle = this.props.match.params.handle;
        try {
          let res = handle === localStorage.username ? await fetch(`/api/player`) : await fetch(`/api/anotherPlayer?username=${handle}`);
          let result = await res.json();
    
          if (result && !result.error) {
            this.setState({
              user: result,
              anotherPlayer: handle !== localStorage.username
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
        if (this.state.user === undefined)
            return <Loader />
        if (this.state.user.authorityLevel === 'player')
            return (<PlayerProfile user={this.state}/>);
        if (this.state.user.authorityLevel === 'cartograph')
            return (<CartographProfile user={this.state}/>);
        if (this.state.user.authorityLevel === 'admin')
            return (<AdminProfile user={this.state}/>);
    }
}
export default withRouter(ProfilePage);
