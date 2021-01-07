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
        toast("Input username!");
      }

      if (!this.state.password) {
        toast("Input password!");
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
      if (res.ok) {
        this.state.redirect = true;
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('username', this.state.username);
      } else {
        toast("Username or password not valid!");
      }
    } catch (e) {
        toast("Error occured.");
    }

    this.setState({
      buttonDisabled: false
    });

    window.location.reload();
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
          placeholder='Username'
          value={this.state.username ? this.state.username : ''}
          onChange={(val) => this.setInputValueUsername('username', val)}
        />

        <InputField
          type='password'
          placeholder='Password'
          value={this.state.password ? this.state.password : ''}
          onChange={(val) => this.setInputValuePassword('password', val)}
        />

        <SubmitButton
          text='Log in'
          disabled={this.state.buttonDisabled}
          onClick={() => this.doLogin()}
        />
        { this.state.redirect ? (<Redirect push to="/home"/>) : null }
      </div>
    );
  }

}

export default LoginForm;