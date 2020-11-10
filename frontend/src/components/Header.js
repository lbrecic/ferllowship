import React from 'react';
import Navigation from './Navigation';
import '../styles/RegisterForm.css';
import '../tailwind.css';

function Header() {
    return (
        <header className="absolute w-full bg-white">
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