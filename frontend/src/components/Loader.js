import React from 'react';
import logo from '../logo.svg';
import '../styles/App.css';
import '../styles/HomePage.css';

function Loader() {
    return (
      <div className="App background-color">
        <div className="App-header background-color">
          <img src={logo} className="App-logo animate-pulse" alt="logo" />
        </div>
      </div>
    );
  }
  
export default Loader;