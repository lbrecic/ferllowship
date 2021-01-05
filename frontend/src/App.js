import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { BrowserRouter as Router, Switch, Route, Redirect, withRouter } from "react-router-dom";
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import DeckPage from './pages/DeckPage';
import MapPage from './pages/MapPage';
import HelpPage from './pages/HelpPage';
import GlobalStatsPage from './pages/GlobalStatsPage';
import StatsPage from './pages/StatsPage';
import LoginPage from './pages/LoginPage';
import Chat from './components/Chat';
import './styles/tailwind.css';
import './styles/App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmPage from './pages/ConfirmPage';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [loggedOut, setLoggedOut] = useState(null);

  useEffect(async () => {
    let isMounted = true;
    let res = await fetch('/api/ping');
    if (!res.ok) {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('username');
      if (isMounted) {
        setLoggedOut(true);
      }
    }
    return () => { isMounted = false };
  });

  if (loggedOut) {
    return (<Route {...rest} render={(props) => ( <Redirect to='/' /> )} />);
  } else {
    return (<Route {...rest} render={(props) => ( <Component {...props} /> )} />);
  }
}

const LoggedInRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem('isLoggedIn')
      ? <Redirect to='/home' />
      : <Component {...props} />
  )} />
)

class App extends React.Component {

  render() {
    return (
      <div className="app">
        <Router>
          <Switch>
            <LoggedInRoute exact path="/" component={withRouter(LoginPage)}/>
            <PrivateRoute path="/home" component={withRouter(HomePage)}/>
            <PrivateRoute exact path='/profile/:handle' component={withRouter(ProfilePage)}/>
            <PrivateRoute path="/deck" component={withRouter(DeckPage)}/>
            <PrivateRoute path="/map" component={withRouter(MapPage)}/>
            <PrivateRoute path="/help" component={withRouter(HelpPage)}/>
            <PrivateRoute path="/global-stats" component={withRouter(GlobalStatsPage)}/>
            <PrivateRoute path="/stats" component={withRouter(StatsPage)}/>
            <PrivateRoute path="/chat" component={withRouter(Chat)}/>
            <LoggedInRoute path="/confirm" component={withRouter(ConfirmPage)}/>    
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
