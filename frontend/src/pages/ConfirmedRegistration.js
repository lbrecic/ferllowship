import React from 'react';
import logo from '../logo.svg';
import '../tailwind.css';
import '../styles/RegisterForm.css';
import { render } from '@testing-library/react';

const queryString = require('query-string');

class ConfirmedRegistration extends React.Component{

  
  async getToken(){
    const token = queryString.parse(window.location.search.token);
    try{
      let res = await fetch('/api/confirm?token=' + token);
  
      let result = await res.json();
      if(result && result.success){
      } else if(result  && result.success === false){
      }
    } catch (e) {
      console.log(e);
    }
  }
  

  render() {
    this.getToken();

    return (
      <div className="App">
        <div className="App-header App-header-background">
          <img src={logo} className="App-logo animate-pulse" alt="logo" />
          <p className='title white' >
             <div className='logo-title'> 
                Uspješna registracija!
             </div>       
          </p>
        </div>
      </div>
    );
  }
    
}
  
export default ConfirmedRegistration;