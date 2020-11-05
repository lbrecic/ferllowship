import React from 'react';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import UserStore from './stores/UserStore';
import './RegisterForm.css'

class RegisterForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          username: '',
          password: '',
          email: '',
          buttonDisabled: false, 
          show: false
        }
      }
    
      setInputValue(property, val){
        val = val.trim();
        if(val.length > 12){
          return;
        }
    
        this.setState({
          [property]:val
        })
      }
    

      onClose = e => {
        this.props.onClose && this.props.onClose(e);
      };

    
      resetForm(){
        this.setState({
          username: '',
          password: '',
          email: '',
          buttonDisabled: false
        })
      }
    
      async doRegister(){
        if(!this.state.username){
          return;
        }
    
        if(!this.state.password){
          return;
        }

        if(!this.state.email){
            return;
          }
    
        this.setState({
          buttonDisabled:true
        })
    
        try{
          let res = await fetch('/login', {
            method: 'post',
            headers: {
              'Accept' : 'application/json',
              'Content-Type': 'application/json'
            },
            body : JSON.stringify({
              username: this.state.username,
              password: this.state.password,
              email: this.state.email
            })
          });
    
          let result = await res.json();
          if(result && result.success){
            UserStore.isLoggedIn = true;
            UserStore.username = result.username;
          } else if(result  && result.success === false){
            this.resetForm();
            alert(result.msg);
          }
    
        }catch(e){
          console.log(e);
          this.resetForm();
        }
    
      }
    
      render() {
        if(!this.props.show){
          return null;
        } 

        return ( 
        <div className="modal"> 
        <div className="registerForm modal-content" >
            <div className='title'>
            Registriraj se
            </div>
            
            <div className="registerDiv">
            <InputField  
              type='text'
              placeholder='Korisničko ime'
              value={this.state.username ? this.state.username : ''}
              onChange={(val) => this.setInputValue('username', val)} />
            </div>
            

            <div className="registerDiv">
            <InputField  
              type='password'
              placeholder='Lozinka'
              value={this.state.password ? this.state.password : ''}
              onChange={(val) => this.setInputValue('password', val)}
    
            />
            </div>
            
            <div className="registerDiv">
            <InputField  
              type='email'
              placeholder='Email'
              value={this.state.email? this.state.email : ''}
              onChange={(val) => this.setInputValue('email', val)}
    
            />

            </div>
            <div className="registerButton">
            <SubmitButton 
              text='Registriraj se'
              disabled={this.state.buttonDisabled}
              onClick={() => this.doRegister()}
            /> 
            </div>

            <div className=" registerClose registerButton">
            <button className="btn"
              onClick = {e => this.onClose(e)}>
              Zatvori
             </button>
            </div>
          </div>
        </div>
        );
      }
    }


export default RegisterForm;