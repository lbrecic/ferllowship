import React        from 'react';
import LoginForm    from './LoginForm';
import {observer}   from 'mobx-react';
import RegisterForm     from './RegisterForm';

import './App.css';



class App extends React.Component {

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



  render() {


      return ( 
        <div className="app" >
          <div className="container">          
            <LoginForm />
            <div className="register">               
            Nemaš račun?  
              
            <button className="btn" onClick={e=> {this.showRegister();}}
              text='Registriraj se'> Registriraj se </button>
            
            <RegisterForm  show={this.state.show} onClose={() => this.onClose()} />             
             
          
          </div>               
          
          </div>     
        </div>
        );


    
  }
}

export default observer(App);