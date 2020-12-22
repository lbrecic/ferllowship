import React from 'react';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import {Redirect} from "react-router-dom";

import { toast } from 'react-toastify';

const USERNAME_MAX_LENGTH = 128;
const PASSWORD_MAX_LENGTH = 128;

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      buttonDisabled: false,
      redirect : false
    }
  }

  setInputValueUsername(property, val) {
    val = val.trim();
    if (val.length > USERNAME_MAX_LENGTH) {
      return;
    }

    this.setState({
      [property]: val
    })
  }

  setInputValuePassword(property, val) {
    val = val.trim();
    if (val.length > PASSWORD_MAX_LENGTH) {
      return;
    }

    this.setState({
      [property]: val
    })
  }

  resetForm() {
    this.setState({
      username: '',
      password: '',
      buttonDisabled: false
    })
  }

  async doLogin() {
    this.setState({
      buttonDisabled: true
    });

    if (!this.state.username || !this.state.password) {
      if (!this.state.username) {
        toast("Korisničko ime mora biti uneseno.");
      }

      if (!this.state.password) {
        toast("Lozinka mora biti unesena.");
      }

      this.setState({
        buttonDisabled: false
      });

      return;
    }

    const formData = new FormData();
    formData.append("username", this.state.username);
    formData.append("password", this.state.password);

    try {
      let res = await fetch('/api/login', {
        method: 'post',
        body: formData
      });
//    UPUTE:
//    - kod lokalnog developmenta zakomentirati 2) i otkomentirati 1)
//    - tako neka i ostane, 2) otkomentirati samo kada je stvarno potrebno
//    ==================
//    1)
      if (!res.url.endsWith("login")) {
//    ------------------
//    2)
//    if (res.ok) {
//    ==================
        this.state.redirect = true;
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('username', this.state.username);
      } else {
        toast("Korisničko ime ili lozinka nisu ispravni.");
      }
    } catch (e) {
        toast("Dogodila se pogreška.");
    }

    this.setState({
      buttonDisabled: false
    });
  }

  handleKeypress = e => {
    if (e.key === 'Enter') {
      this.doLogin();
    }
  };

  render() {
    return (
      <div className="loginForm" onKeyPress={this.handleKeypress}>
        <div className='title'> GeoFighter </div>

        <InputField
          type='text'
          placeholder='Korisničko ime'
          value={this.state.username ? this.state.username : ''}
          onChange={(val) => this.setInputValueUsername('username', val)}
        />

        <InputField
          type='password'
          placeholder='Lozinka'
          value={this.state.password ? this.state.password : ''}
          onChange={(val) => this.setInputValuePassword('password', val)}
        />

        <SubmitButton
          text='Prijavi se'
          disabled={this.state.buttonDisabled}
          onClick={() => this.doLogin()}
        />
        { this.state.redirect ? (<Redirect push to="/home"/>) : null }
      </div>
    );
  }

}

export default LoginForm;