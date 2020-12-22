import React from 'react';
import { withRouter } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';
import logo from '../logo.svg';
import '../styles/App.css';
import '../styles/HomePage.css';
import { Link } from "react-router-dom";

function HomePage() {
    return (
      <div className="App background-color">
        <Header />
        <div className="App-header background-color">
          <img src={logo} className="App-logo animate-pulse" alt="logo" />
          <Link className="btnFight" to="/chat">
              Bori se!
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
  
export default withRouter(HomePage);