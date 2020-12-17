import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import logo from '../logo.svg';
import '../styles/App.css';
import '../styles/HomePage.css';

function HomePage() {
    return (
      <div className="App background-color">
        <Header />
        <div className="App-header background-color">
          <img src={logo} className="App-logo animate-pulse" alt="logo" />
          <button className="btnFight" onClick={() => {}}>
              Bori se!
          </button>
        </div>
        <Footer />
      </div>
    );
  }
  
export default HomePage;