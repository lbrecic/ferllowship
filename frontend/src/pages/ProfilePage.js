import React, { useState } from 'react'
import LocationRequests from '../components/LocationRequests';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartographForm from '../components/CartographForm';
import CartographRequests from '../components/CartographRequests';
import Request from '../components/Request'
import SubmitButton from "../components/SubmitButton";
import PromoteAdmin from '../components/PromoteAdmin'
import '../styles/App.css';
import logo from '../logo.svg';
import cards from '../utils/cards.png';
import stats from '../utils/statistics.png';
import { Link } from "react-router-dom";
import '../styles/Profile.css'; 

class ProfilePage extends React.Component {

    constructor (props) {
        super(props);
        this.showRequest = 0;
        this.promoteWindow = 0;
        this.request = 0;
    }

    state = {
        username: "",
        email: "",
        photoLink: "",
        authorityLevel: ""
    };
    
    async componentDidMount() {        
        try {
          let res = await fetch('/api/players?username=' + localStorage.username);
          let result = await res.json();
    
          if (result && !result.error) {
            this.setState({
              username: result.username,
              email: result.email,
              photoLink: result.photoLink,
              authorityLevel: result.authorityLevel
            });
          }
        } catch (e) {
        }
    }

    setShowRequest = e => {
        this.showRequest = e;
        this.setState(this.state);
    }

    showPromoteWindow = e => {
        this.promoteWindow = e;
        this.setState(this.state);
    }

    setRequest = e => {
        this.request = e;
        this.setState(this.state);
    }

    render() {
        if(this.showRequest === 0 && this.promoteWindow === 0)
        return (
            <>
            <Header />
            <div className="w-full h-screen geo-color full-profile">
                <div className="flex justify-center align-center h-screen">
                    <div className="w-1/4 h-1/4 profile">
                        <div className="h-12"></div>
                        <div className="w-full h-32 "></div>
                        <div className="flex justify-center profilePictureContainer">
                            <img src={ this.state.photoLink } className="App-logo box-shadow profilePicture" alt="logo" />
                        </div>
                    </div>
                    <div className="w-1/2">
                        <div className="h-12"></div>
                        <div className="w-full h-64 p-12">
                            <p className='title white' >
                                <div className='logo-title'> 
                                    { this.state.username }
                                </div>       
                            </p>
                        </div>
                        <div className="w-full h-20 links"></div>
                        <div className="flex justify-center">
                            <div className="w-1/4 text-center"></div>                            
                            <div className="w-1/4 text-center">
                                <Link 
                                    to="/deck"
                                >
                                    <div className="flex justify-center">
                                        <img src={cards} className="h-32" alt="logo" />
                                    </div>
                                    <span>Moje karte</span>
                                </Link>
                            </div>
                            <div className="w-1/4 text-center">
                                <Link 
                                    to="/stats"
                                >
                                    <div className="flex justify-center">
                                        <img src={stats} className="h-32 p-3" alt="logo" />
                                    </div>
                                    <span>Moja statistika</span>
                                </Link>
                            </div>
                            <div className="w-1/4 text-center"></div>
                        </div>
                        <div className="text-center m-8">
                        {this.state.authorityLevel === "admin" &&
                            <SubmitButton
                                text="Promote someone to admin"
                                onClick={() => this.showPromoteWindow(1)}
                            />}
                        </div>
                    </div>
                    <div className="w-1/4">
                        <div className="h-12"></div>
                            {this.state.authorityLevel === "player" && 
                                <CartographForm />}
                            {this.state.authorityLevel === "admin" &&
                                <CartographRequests setShow={ this.setShowRequest }
                                                    setRequest={ this.setRequest }/>}
                            {this.state.authorityLevel === "cartograph" &&
                                <LocationRequests />}
                    </div>
                </div>
            </div>
            <Footer />
            </>
        );

        if(this.showRequest !== 0 || this.promoteWindow === 1)
            return(
            <>
            <Header />
            <div className="w-full h-screen geo-color full-profile">
                <div className="flex justify-center align-center h-screen">
                    <div className="w-1/4 h-1/4 profile">
                        <div className="h-12"></div>
                        <div className="w-full h-32 "></div>
                        <div className="flex justify-center profilePictureContainer">
                            <img src={this.state.photoLink} className="App-logo box-shadow profilePicture" alt="logo" />
                        </div>
                    </div>
                    <div className="w-1/2">
                        <div className="h-12"></div>
                        <div className="w-full h-64 p-12">
                            <p className='title white' >
                                <div className='logo-title'> 
                                    { this.state.username }
                                </div>       
                            </p>
                        </div>
                        <div className="w-full h-20 links"></div>
                        <div className="flex justify-center">
                            <div className="w-1/4 text-center"></div>                            
                            <div className="w-1/4 text-center">
                                <Link 
                                    to="/deck"
                                >
                                    <div className="flex justify-center">
                                        <img src={cards} className="h-32" alt="logo" />
                                    </div>
                                    <span>Moje karte</span>
                                </Link>
                            </div>
                            <div className="w-1/4 text-center">
                                <Link 
                                    to="/stats"
                                >
                                    <div className="flex justify-center">
                                        <img src={stats} className="h-32 p-3" alt="logo" />
                                    </div>
                                    <span>Moja statistika</span>
                                </Link>
                            </div>
                            <div className="w-1/4 text-center"></div>
                        </div>
                        <div className="text-center m-8">
                            <SubmitButton
                                text="Promote someone to admin"
                                onClick={() => this.showPromoteWindow(1)}
                            />
                        </div>
                    </div>
                    <div className="w-1/4">
                        <div className="h-12"></div>
                                {this.promoteWindow === 1 &&
                                    <PromoteAdmin setShow={ this.showPromoteWindow }/>
                                }
                                {this.showRequest !== 0 &&
                                    <Request setShow={ this.setShowRequest } 
                                        setRequest={ this.setRequest }
                                        request={this.request}/>}
                                <CartographRequests setShow={ this.setShowRequest } 
                                                    setRequest={ this.setRequest }/>
                    </div>
                </div>
            </div>
            <Footer />
            </>
            );
    }
}

export default ProfilePage;