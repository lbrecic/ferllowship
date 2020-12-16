import React from 'react';
import { observer } from 'mobx-react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import DeckPage from './pages/DeckPage';
import MapPage from './pages/MapPage';
import HelpPage from './pages/HelpPage';
import GlobalStatsPage from './pages/GlobalStatsPage';
import StatsPage from './pages/StatsPage';
import LoginPage from './pages/LoginPage';
import './styles/tailwind.css';
import './styles/App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmPage from './pages/ConfirmPage';


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem('isLoggedIn')
      ? <Component {...props} />
      : <Redirect to='/' />
  )} />
)

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
            <LoggedInRoute exact path="/" component={LoginPage}/>
            <PrivateRoute path="/home" component={HomePage}/>
            <PrivateRoute path="/profile" component={ProfilePage}/>
            <PrivateRoute path="/deck" component={DeckPage}/>
            <PrivateRoute path="/map" component={MapPage}/>
            <PrivateRoute path="/help" component={HelpPage}/>
            <PrivateRoute path="/global-stats" component={GlobalStatsPage}/>
            <PrivateRoute path="/stats" component={StatsPage}/>
            <PrivateRoute path="/confirm" component={ConfirmPage}/>    

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
