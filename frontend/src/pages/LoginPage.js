import React from 'react';
import RegisterForm from '../RegisterForm';
import LoginForm from '../LoginForm';
import '../App.css';

class LoginPage extends React.Component {

  state = {
    show: false
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
    // todo
  };

  render() {
    return (
      <div className="container-Login">
        <LoginForm setOnLogin={() => alert(".")} />
        <div className="register"> 
          Nemaš račun? 
          <button className="btn" onClick={e => { this.showRegister(); }}
            text='Registriraj se'> Registriraj se </button>
          <RegisterForm show={this.state.show} onClose={() => this.onClose()} />
        </div>
      </div>
    );
  }

}

export default LoginPage;