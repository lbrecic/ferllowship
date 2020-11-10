import React from 'react';
import Navigation from './Navigation';
import '../styles/RegisterForm.css';
import '../tailwind.css';

function Header() {
    return (
        <header className="flex justify-between items-center border-b p-3 h-14">
            <span className="logo-title-light">
                GeoFighter
            </span>

            <Navigation />
        </header>
    )
}

export default Header;