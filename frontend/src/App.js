import React from 'react';
import { observer } from 'mobx-react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import DeckPage from './pages/DeckPage';
import MapPage from './pages/MapPage';
import HelpPage from './pages/HelpPage';
import ContactPage from './pages/ContactPage';
import StatsPage from './pages/StatsPage';
import LoginPage from './pages/LoginPage';
import ConfirmedRegistration from './pages/ConfirmedRegistration';
import './tailwind.css';
import './App.css';

class App extends React.Component {

  render() {
    return (
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
