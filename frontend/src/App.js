import React from 'react';
import { observer } from 'mobx-react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import DeckPage from './pages/DeckPage';
import MapPage from './pages/MapPage';
import HelpPage from './pages/HelpPage';
import GlobalStatsPage from './pages/GlobalStatsPage';
import StatsPage from './pages/StatsPage';
import LoginPage from './pages/LoginPage';
import ConfirmedRegistration from './pages/ConfirmPage';
import './styles/tailwind.css';
import './styles/App.css';
import Request from './components/Request';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            <Route path="/global-stats"><GlobalStatsPage /></Route>
            <Route path="/stats"><StatsPage /></Route>
            <Route path="/confirm"><ConfirmedRegistration /></Route>
            <Route path="/test"><Request /></Route>
          </Switch>
        </Router>
        <ToastContainer
          className="toast"
          bodyClassName="toastBody"
          toastClassName="toast"
          pauseOnFocusLoss={false}
          hideProgressBar={true}
        />
      </div>
    );

  }

}

export default observer(App);
