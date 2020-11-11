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
import StatsPage from './pages/StatsPage';
import LoginPage from './pages/LoginPage';
import './tailwind.css';
import './App.css';
import ConfirmedRegistration from './pages/ConfirmedRegistration';


class App extends React.Component {

  state = {
    show: false,
    goHome: true
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

  setOnLogin() {
    this.setState({
      goHome: true
    })
  };

  render() {
      return(
        <div className="app">
          <Router>
            <Switch>
                <Route exact path="/"><LoginPage /></Route>
                <Route path="/home"><HomePage /></Route>
                <Route path="/profile"><ProfilePage /></Route>
                <Route path="/deck"><DeckPage /></Route>
                <Route path="/map"><MapPage /></Route>
                <Route path="/help"><HelpPage /></Route>
                <Route path="/contact"><ContactPage /></Route>
                <Route path="/stats"><StatsPage /></Route>
                <Route path="/confirm"><ConfirmedRegistration /></Route>

            </Switch>
          </Router>
        </div>
      );
  }
}

export default observer(App);