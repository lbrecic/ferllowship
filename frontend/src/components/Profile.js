import React from 'react';
import '../App.css';
import logo from '../logo.svg';
import cards from '../utils/cards.png';
import stats from '../utils/statistics.png';
import { Link } from "react-router-dom";

function Profile(props) {
    return (
        <div className="w-full h-screen geo-color mobile-block">
            <div className="flex justify-center align-center h-screen">
                <div className="w-1/4">
                    <div className="h-12"></div>
                    <div className="w-full h-32"></div>
                    <div className="flex justify-center">
                        <img src={logo} className="App-logo border border-black border-4 box-shadow" alt="logo" />
                    </div>
                </div>
                <div className="w-1/2">
                    <div className="h-12"></div>
                    <div className="w-full h-64 p-12">
                        <p className='title white' >
                            <div className='logo-title'> 
                                Your username
                            </div>       
                        </p>
                    </div>
                    <div className="w-full h-20"></div>
                    <div className="flex justify-center">
                        <div className="w-1/4 text-center"></div>                            
                        <div className="w-1/4 text-center">
                            <Link 
                                to="/deck"
                            >
                                <div className="flex justify-center">
                                    <img src={cards} className="h-32" alt="logo" />
                                </div>
                                <span>Your deck</span>
                            </Link>
                        </div>
                        <div className="w-1/4 text-center">
                            <Link 
                                to="/stats"
                            >
                                <div className="flex justify-center">
                                    <img src={stats} className="h-32 p-3" alt="logo" />
                                </div>
                                <span>Your statistic</span>
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