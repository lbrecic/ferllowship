import React from 'react';
import { withRouter } from "react-router-dom";
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import '../styles/App.css';

class LoginPage extends React.Component {

  state = {
    show: false,
    username: '',
    password: ''
  };

  showRegister = e => {
    this.setState({
      show: !this.state.show
    })
  }

  onClose = e => {
    this.setState({
      show: false
    })
  };

  setOnLogin() {
    //to do 
  };

  render() {
    return (
      <div className="container-Login">
        <LoginForm setOnLogin={() => this.setOnLogin()} />
        <div className="register"> 
          You don't have an account? 
          <button className="btn" onClick={e => { this.showRegister(); }}
            text='Registriraj se'> Register </button>
          <RegisterForm show={this.state.show} onClose={() => this.onClose()} />
        </div>
      </div>
    );
  }
}

export default withRouter(LoginPage);