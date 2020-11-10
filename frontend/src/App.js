import React        from 'react';
import LoginForm    from './LoginForm';
import {observer}   from 'mobx-react';
import RegisterForm     from './RegisterForm';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  //Redirect
} from "react-router-dom";
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import DeckPage from './pages/DeckPage';
import MapPage from './pages/MapPage';
import HelpPage from './pages/HelpPage';
import ContactPage from './pages/ContactPage';
import './tailwind.css';
import './App.css';


class App extends React.Component {

  state = {
    show: false,
    goHome: false
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

  



  render() {
    if(this.state.goHome){
      return(
        <div className="app" >
          <Router>
          <Switch>
              <Route exact path="/"><HomePage /></Route>
              <Route path="/profile"><ProfilePage /></Route>
              <Route path="/deck"><DeckPage /></Route>
              <Route path="/map"><MapPage /></Route>
              <Route path="/help"><HelpPage /></Route>
              <Route path="/contact"><ContactPage /></Route>
          </Switch>
        </Router>
        </div>
      );
    }

      return (    
        <div className="app-login" >
          <div className="container-Login">          
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