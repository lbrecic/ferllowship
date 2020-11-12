import React from 'react';
import { Link } from "react-router-dom";
import '../styles/tailwind.css';

function Menu(props) {
    return (
        <div>
            <div className="text-center w-full">
                <p className='title white' >
                    <div className='logo-title'> 
                        GeoFighter
                    </div>       
                </p>
            </div>
            <div className="w-full">
                <div className="h-20"></div>
                <div className="flex text-center justify-between align-center mb-4">
                    <div class="w-1/5 bg-white h-32"></div>
                    <div class="w-1/4 bg-gray-400 h-32">
                        <Link 
                            to="/home" 
                            onClick={() => props.show(false)}
                        >
                            <div className="static top-0 left-0 z-1 w-full h-full">Home</div>
                        </Link>
                    </div>
                    <div class="w-1/5 bg-white h-32"></div>
                    <div class="w-1/4 bg-gray-500 h-32">
                        <Link 
                            to="/map"
                            onClick={() => props.show(false)}
                        >
                            <div className="static top-0 left-0 z-1 w-full h-full">Map</div>
                        </Link>
                    </div>
                    <div class="w-1/5 bg-white h-32"></div>
                </div>
                <div className="flex text-center justify-center align-center mb-4">
                    <div class="w-1/5 bg-white h-32"></div>
                    <div class="w-1/4 bg-gray-400 h-32">
                        <Link 
                            to="/profile"
                            onClick={() => props.show(false)}
                        >
                            <div className="static top-0 left-0 z-1 w-full h-full">Profile</div>
                        </Link>
                    </div>
                    <div class="w-1/5 bg-white h-32"></div>
                    <div class="w-1/4 bg-gray-500 h-32">
                        <Link 
                            to="/deck"
                            onClick={() => props.show(false)}
                        >
                            <div className="static top-0 left-0 z-1 w-full h-full">Deck</div>
                        </Link>
                    </div>
                    <div class="w-1/5 bg-white h-32"></div>
                </div>
                <div className="flex text-center justify-center align-center mb-4">
                    <div class="w-1/5 bg-white h-32"></div>
                    <div class="w-1/4 bg-gray-400 h-32">
                        <Link 
                            to="/help"
                            onClick={() => props.show(false)}
                        >
                            <div className="static top-0 left-0 z-1 w-full h-full">Help</div>
                        </Link>
                    </div>
                    <div class="w-1/5 bg-white h-32"></div>
                    <div class="w-1/4 bg-gray-500 h-32">
                        <Link 
                            to="/contact"
                            onClick={() => props.show(false)}
                        >
                            <div className="static top-0 left-0 z-1 w-full h-full">Contact</div>
                        </Link>
                    </div>
                    <div class="w-1/5 bg-white h-32"></div>
                </div>
            </div>
        </div>
    )
}

export default Menu;