import React from 'react';
import { Link } from "react-router-dom";
import '../styles/tailwind.css';
import '../styles/Navigation.css';

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

async function load(change = false) {
    if(change === true) {
      await sleep(200);
      window.location.reload();
    }
}

class Menu extends React.Component {
    render() {
        return (
            <div>
                <div className="text-center w-full">
                    <div className='title white logo-title'> 
                        GeoFighter
                    </div>
                </div>
                <div className="w-full">
                    <div className="h-20"></div>
                    <div className="flex text-center justify-between align-center mb-4">
                        <div class="w-1/5 bg-white h-32"></div>
                        <div class="w-1/4 bg-gray-400 h-32 linkBox lightGreen1">
                            <Link 
                                to="/home" 
                                onClick={() => this.props.show(false)}
                            >
                                <div className="static top-0 left-0 z-1 w-full h-full"><div className="text">Home</div></div>
                            </Link>
                        </div>
                        <div class="w-1/5 bg-white h-32"></div>
                        <div class="w-1/4 bg-gray-500 h-32 linkBox lightGreen2">
                            <Link 
                                to="/map"
                                onClick={() => this.props.show(false)}
                            >
                                <div className="static top-0 left-0 z-1 w-full h-full"><div className="text">Map</div></div>
                            </Link>
                        </div>
                        <div class="w-1/5 bg-white h-32"></div>
                    </div>
                    <div className="flex text-center justify-center align-center mb-4">
                        <div class="w-1/5 bg-white h-32"></div>
                        <div class="w-1/4 bg-gray-400 h-32 linkBox lightGreen3">
                            <Link 
                                to={`/profile/${localStorage.username}`}
                                onClick={() => {
                                    this.props.show(false);
                                    load(true);
                                }}
                            >
                                <div className="static top-0 left-0 z-1 w-full h-full"><div className="text">Profile</div></div>
                            </Link>
                        </div>
                        <div class="w-1/5 bg-white h-32"></div>
                        <div class="w-1/4 bg-gray-500 h-32 linkBox darkGreen1">
                            <Link 
                                to="/deck"
                                onClick={() => this.props.show(false)}
                            >
                                <div className="static top-0 left-0 z-1 w-full h-full"><div className="text">Deck</div></div>
                            </Link>
                        </div>
                        <div class="w-1/5 bg-white h-32"></div>
                    </div>
                    <div className="flex text-center justify-center align-center mb-4">
                        <div class="w-1/5 bg-white h-32"></div>
                        <div class="w-1/4 bg-gray-400 h-32 linkBox darkGreen2">
                            <Link 
                                to="/help"
                                onClick={() => this.props.show(false)}
                            >
                                <div className="static text-center left-0 z-1 w-full h-full"><div className="text">Help</div></div>
                            </Link>
                        </div>
                        <div class="w-1/5 bg-white h-32"></div>
                        <div class="w-1/4 bg-gray-500 h-32 linkBox darkGreen3">
                            <Link 
                                to="/global-stats"
                                onClick={() => this.props.show(false)}
                            >
                                <div className="static top-0 left-0 z-1 w-full h-full"><div className="gsText">Global statistics</div></div>
                            </Link>
                        </div>
                        <div class="w-1/5 bg-white h-32"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Menu;