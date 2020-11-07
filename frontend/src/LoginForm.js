import React from 'react';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import UserStore from './stores/UserStore';


class LoginForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      buttonDisabled: false
    }
  }

  setInputValueUsername(property, val){
    val = val.trim();
    if(val.length > 128){
      return;
    }

    this.setState({
      [property]:val
    })
  }

  setInputValuePassword(property, val){
    val = val.trim();
    if(val.length > 128){
      return;
    }

    this.setState({
      [property]:val
    })
  }

  resetForm(){
    this.setState({
      username: '',
      password: '',
      buttonDisabled: false
    })
  }

  async doLogin(){
    if(!this.state.username){
      return;
    }

    if(!this.state.password){
      return;
    }

    this.setState({
      buttonDisabled:true
    })

    try{
      let res = await fetch('', {
        method: 'post',
        headers: {
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
        },
        body : JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      });
      // let result = await res.json();
      // if(result && result.success){
      //   UserStore.isLoggedIn = true;
      //   UserStore.username = result.username;
      // } else if(result  && result.success === false){
      //   this.resetForm();
      //   alert(result.msg);
      // }

    }catch(e){
      console.log(e);
      this.resetForm();
    }

  }

  render() {
    return ( 
    <div className="loginForm" >
        <div className='title'>
        GeoFighter
        </div>
        
        
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

        
        
    </div>
    );
  }
}

export default LoginForm;