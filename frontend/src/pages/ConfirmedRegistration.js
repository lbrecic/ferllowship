import React from 'react';
import logo from '../logo.svg';
import '../tailwind.css';
import '../styles/RegisterForm.css';
import { render } from '@testing-library/react';

const queryString = require('query-string');

class ConfirmedRegistration extends React.Component{

  state = {
    message: ""
  };

  async componentDidMount() {
    const token = queryString.parse(window.location.search).token;
    try{
      let res = await fetch('/api/confirm?token=' + token);
      let result = await res.json();

      if(result && result.success){
        this.setState({
          message: "Uspješna registracija!"
        })
      } else if(result){
        this.setState({
          message: result.error
        })
      }
    
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header App-header-background">
          <img src={logo} className="App-logo animate-pulse" alt="logo" />
          <p className='title white' >
             <div className='confirm-message'> 
                {this.state.message}
             </div>       
          </p>
        </div>
      </div>
    );
  }
    
}
  
export default ConfirmedRegistration;