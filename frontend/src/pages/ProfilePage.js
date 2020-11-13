import React, { useState } from 'react'
import LocationRequests from '../components/LocationRequests';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartographForm from '../components/CartographForm';
import CartographRequests from '../components/CartographRequests';
import Request from '../components/Request'
import PromoteAdmin from '../components/PromoteAdmin'
import '../styles/App.css';
import logo from '../logo.svg';
import cards from '../utils/cards.png';
import stats from '../utils/statistics.png';
import { Link } from "react-router-dom";
import '../styles/Profile.css';

function ProfilePage() {
    const user = "admin";
    const [show, setShow] = useState(0);
    const [request, setRequest] = useState(0);

    if(show === 0)
    return (
        <>
        <Header />
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
                        {user === "igrac" && 
                            <CartographForm />}
                        {user === "admin" &&
                            <CartographRequests setShow={ setShow } 
                                                setRequest={ setRequest }/>}
                        {user === "kartograf" &&
                            <LocationRequests />}
                </div>
            </div>
        </div>
        <Footer />
        </>
    );

    if(show > 0)
        return(
        <>
        <Header />
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
                            <Request setShow={ setShow } 
                                    setRequest={ setRequest }
                                    username={request}/>
                            <CartographRequests setShow={ setShow } 
                                                setRequest={ setRequest }/>
                </div>
            </div>
        </div>
        <Footer />
        </>
        );
}

export default ProfilePage;