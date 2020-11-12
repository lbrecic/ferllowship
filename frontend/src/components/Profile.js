import React from 'react';
import '../App.css';
import logo from '../logo.svg';
import cards from '../utils/cards.png';
import stats from '../utils/statistics.png';
import { Link } from "react-router-dom";
import '../styles/Profile.css';

function Profile(props) {
    return (
        <div className="w-full h-screen geo-color full-profile">
            <div className="flex justify-center align-center h-screen">
                <div className="w-1/4 h-1/4 profile">
                    <div className="h-12"></div>
                    <div className="w-full h-32 "></div>
                    <div className="flex justify-center profilePictureContainer">
                        <img src={logo} className="App-logo box-shadow profilePicture" alt="logo" />
                    </div>
                </div>
                <div className="w-1/2">
                    <div className="h-12"></div>
                    <div className="w-full h-64 p-12">
                        <p className='title white' >
                            <div className='logo-title'> 
                                Korisničko ime
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
                </div>
                <div className="w-1/4">
                    <div className="h-12"></div>
                    {props.component}
                </div>
            </div>
        </div>
    );
}

export default Profile;