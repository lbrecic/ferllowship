import React from 'react';
import { withRouter } from "react-router-dom";
import logo from '../logo.svg';

const queryString = require('query-string');

class ConfirmPage extends React.Component {

  state = {
    message: ""
  };

  async componentDidMount() {
    const token = queryString.parse(window.location.search).token;
    
    try {
      let res = await fetch('/api/confirm?token=' + token);
      let result = await res.json();

      if (result && result.message) {
        this.setState({
          message: result.message
        });
      }
    } catch (e) {
        this.setState({
            message: "Dogodila se pogreška."
        });
    }
  }

  render() {

    return (
      <div className="App">
        <div className="App-header App-header-background">
          <img src={logo} className="App-logo animate-pulse" alt="logo" />
          <div className='title white confirm-message'>
            {this.state.message}
          </div>
        </div>
      </div>
    );
  }

}

export default withRouter(ConfirmPage);