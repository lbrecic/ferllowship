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
import FightPage from './pages/FightPage';
import { toast } from 'react-toastify';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

let socket;
let stompClient;
let reconnectInterval;

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
      if (stompClient.connected) {
        stompClient.disconnect();
      }
      toast.dismiss();
    }
    return () => { isMounted = false };
  });

  if (loggedOut) {
    return (<Route {...rest} render={(props) => ( <Redirect to='/' /> )} />);
  } else {
    return (<Route {...rest} render={(props) => ( <Component {...rest} /> )} />);
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

  constructor(props) {
    super(props);
    this.state = {
      stompClient: {},
      messages: []
    }
  }

  componentDidMount() {
    if (localStorage.isLoggedIn) {
      let stompConnect = () => {
          clearInterval(reconnectInterval);

          //toast("Connecting...", { autoClose: false });
          
          socket = new SockJS('/api/chat');
          stompClient = Stomp.over(socket);

          let stompSuccessCallback = frame => {
              toast.dismiss();
              //toast("Connected.");

              stompClient.subscribe('/user/queue/reply', msg => {
                  let receivedMessage = JSON.parse(msg.body);

                  this.setState(prevState => ({
                    messages: [...prevState.messages, receivedMessage]
                  }));

                  toast(receivedMessage.from + " (" + receivedMessage.time + ") > " + receivedMessage.message);
              });

              this.setState({
                  stompClient: stompClient
              });
          };

          let stompFailureCallback = error => {
            if (localStorage.isLoggedIn) {
              //toast("Connection lost. Reconnecting in 15 seconds.");
              reconnectInterval = setInterval(stompConnect, 15000);
            }
          };

          stompClient.connect({}, stompSuccessCallback, stompFailureCallback);
      };

      stompConnect();
    }
  }

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
            <PrivateRoute path="/fight" component={withRouter(FightPage)}/>
            <PrivateRoute path="/chat" component={withRouter(Chat)} stompClient={this.state.stompClient} messages={this.state.messages} />
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
