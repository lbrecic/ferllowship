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
import { toast } from 'react-toastify';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import FightPage from './pages/FightPage';

let socket;
let stompClient;
let reconnectInterval;

let currentPosition;

let options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos) {
  var crd = pos.coords;

  currentPosition= {
    lat: crd.latitude,
    lon: crd.longitude,
    accuracy: crd.accuracy
  }

  console.log(currentPosition);
}

function errors(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

async function checkIn() {
  const formData = new FormData();

  if (currentPosition !== null && currentPosition !== undefined) {
    formData.append("lat", currentPosition.lat);
    formData.append("lon", currentPosition.lon);

    try {
      await fetch(`/api/player/coordinates`, {
        method: 'post',
        body: formData
        });
    } catch (e) {
        console.log(e);
    }
  }
}

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

    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((result) => {
          if (result.state === "granted") {
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success);
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
          result.onchange = function () {
            console.log(result.state);
          };
        }).then(() => {
          checkIn();
        });
    } else {
      alert("Location not available!");
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
      receivedMessages: []
    }
  }

  componentDidMount() {
    if (localStorage.isLoggedIn) {
      let stompConnect = () => {
          clearInterval(reconnectInterval);

          toast((<div>Connecting to chat... <br /> Please wait for a connection to be established. </div>), { autoClose: false });
          
          socket = new SockJS('/api/chat');
          stompClient = Stomp.over(socket);

          let stompSuccessCallback = frame => {
              toast.dismiss();
              toast("Connected.");

              stompClient.subscribe('/user/queue/reply', msg => {
                  let receivedMessage = JSON.parse(msg.body);

                  this.setState({
                    receivedMessages: this.state.receivedMessages.concat(receivedMessage),
                  });

                  toast(
                    <div>
                      <p>{receivedMessage.from}</p>
                      <p style={{ whiteSpace: "pre-line" }}>{receivedMessage.message}</p>
                      <p>{receivedMessage.time.substring(0, 5)}</p>
                    </div>
                  );
              });

              this.setState({
                  stompClient: stompClient
              });
          };

          let stompFailureCallback = error => {
            if (localStorage.isLoggedIn) {
              toast.dismiss();
              toast("Connection lost. Reconnecting in 15 seconds.");
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
            <PrivateRoute path="/fight"  component={withRouter(FightPage)} />
            <PrivateRoute exact path='/profile/:handle' component={withRouter(ProfilePage)}/>
            <PrivateRoute path="/deck" component={withRouter(DeckPage)}/>
            <PrivateRoute path="/map" component={withRouter(MapPage)}/>
            <PrivateRoute path="/help" component={withRouter(HelpPage)}/>
            <PrivateRoute path="/global-stats" component={withRouter(GlobalStatsPage)}/>
            <PrivateRoute path="/stats" component={withRouter(StatsPage)}/>
            <PrivateRoute path="/chat" component={withRouter(Chat)} 
            stompClient={this.state.stompClient} receivedMessages={this.state.receivedMessages} />
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
