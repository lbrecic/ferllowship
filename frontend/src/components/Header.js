import React from 'react';
import Navigation from './Navigation';
import '../styles/tailwind.css';
import '../styles/App.css'

function Header() {
    return (
        <header className="absolute w-full bg-white background-color">
            <div className="flex justify-between items-center border-b p-3">
                <span className="logo-title-light">
                    GeoFighter
                </span>
                <Navigation />
            </div>
        </header>
    )
}

export default Header;