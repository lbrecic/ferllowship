import React        from 'react';
import UserStore    from './stores/UserStore';
import LoginForm    from './LoginForm';
import SubmitButton from './SubmitButton';
import {observer}   from 'mobx-react';
import RegisterForm     from './RegisterForm';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import RegularButton from './RegularButton';

import './App.css';



class App extends React.Component {

  state = {
    show: false
  };

  // async componentDidMount(){
  //   try{

  //     let res = await fetch('/isLoggedIn',{
  //       method: 'post',
  //       headers : {
  //         'Accept' : 'application/json',
  //         'Content-Type' : 'application/json'
  //       }
  //     });

  //     let result = await res.json();

  //     if(result && result.success){
  //       UserStore.loading = false;
  //       UserStore.isLoggedIn = true;
  //       UserStore.username = result.username;
  //     }else{
  //       UserStore.loading = false;
  //       UserStore.isLoggedIn = false;
  //     }

  //   }catch(e){
  //     UserStore.loading = false;
  //     UserStore.isLoggedIn = false;
  //   }
  // }

  // async doLogout(){
  //   try{

  //     let res = await fetch('/logout',{
  //       method: 'post',
  //       headers : {
  //         'Accept' : 'application/json',
  //         'Content-Type' : 'application/json'
  //       }
  //     });

  //     let result = await res.json();

  //     if(result && result.success){
  //       UserStore.isLoggedIn = false;
  //       UserStore.username = '';
  //     }

  //   }catch(e){
  //     console.log(e);
  //   }
  // }

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


  Register = e => {
    this.setState({
      show: true
    })
  }




  render() {
    // if(UserStore.loading){
    //   return (
    //     <div className="app" >
    //        <div className="container"> 
    //        Ucitavanje...
    //        </div>
    //     </div>
    //   )
    // }else{

    //   if(UserStore.isLoggedIn){
    //     return (
    //       <div className="app" >
    //          <div className="container"> 
    //           Pozdrav, {UserStore.username}!
    //           <SubmitButton text={'Log out'} 
    //           disabled={false} 
    //           onClick={() => this.doLogout()}>
    //           </SubmitButton>
    //          </div>
    //       </div>
    //     )
    //   }

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