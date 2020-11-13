import React from 'react';
import Navigation from './Navigation';
import '../styles/tailwind.css';
import '../styles/App.css'
import '../styles/Header.css'
import {Redirect, Route} from "react-router-dom";

import { toast } from 'react-toastify';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect : false
        }
    }

    async doLogout() {    
        try {
            let res = await fetch('/api/logout', {
                method: 'post'
            });
            
            if (res.ok) {
                this.state.redirect = true;
                localStorage.removeItem('username');
                localStorage.removeItem('password');
                localStorage.removeItem('isLoggedIn');
                window.location.reload();
            } else {
                toast("Dogodila se pogreška.")
            }
        } catch (e) {
            toast("Dogodila se pogreška.")
        }
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect push to="/"/>);
        } else {
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
                </header>
            );
        }
    }
}

export default Header;