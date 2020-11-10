import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import logo from '../logo.svg';
import '../tailwind.css';
import '../styles/RegisterForm.css';

function HomePage() {
    return (
      <div className="App">
        <Header />
        <div className="App-header App-header-background">
          <img src={logo} className="App-logo animate-pulse" alt="logo" />
          <p className='title white' >
             <div className='logo-title'> 
                GeoFighter
             </div>       
          </p>
        </div>
        <Footer />
      </div>
    );
  }
  
export default HomePage;