import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import logo from '../logo.svg';
import '../styles/App.css'


function HomePage() {
    return (
      <div className="App background-color">
        <Header />
        <div className="App-header background-color">
          <img src={logo} className="App-logo animate-pulse" alt="logo" />
             <div className='title white logo-title'> 
                GeoFighter
             </div>
        </div>
        <Footer />
      </div>
    );
  }
  
export default HomePage;