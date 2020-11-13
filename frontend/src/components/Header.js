import React from 'react';
import Navigation from './Navigation';
import '../styles/tailwind.css';
import '../styles/App.css'
import '../styles/Header.css'
import {Redirect, Route} from "react-router-dom";

import SubmitButton from './SubmitButton';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect : false
        }
    }

    doLogout() {
        this.setState({
            redirect: true
        });
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        localStorage.removeItem('isLoggedIn');
    }

    render() {
        return (
            <header className="absolute w-full bg-white background-color">
                <div className="flex justify-between items-center border-b p-3">
                    <span className="logo-title-light">
                        GeoFighter
                    </span>
                    <div className="flex justify-between items-center">
                        <div className="logoutButton">
                            <button class="btnLogout" onClick={() => this.doLogout()}>Odjavi se</button> 
                        </div>
                        <Navigation />
                    </div>
                </div>
                { this.state.redirect ? (<Redirect push to="/"/>) : null }
            </header>
        );
    }
}

export default Header;