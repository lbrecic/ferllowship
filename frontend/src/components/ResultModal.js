import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/ResultModal.css";

class ResultModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userPoints: [],
      opponentPoints: [],  
      showResult: false,
    };
  }

  async componentDidUpdate(props) {
    if (this.props.showResult && !this.props.initiated && this.props.userPoints != this.props.opponentPoints) {
      let winner;
      let loser;

      if (this.props.userPoints > this.props.opponentPoints) {
        winner = localStorage.username;
        loser = this.props.opponentUsername;
      } else {
        winner = this.props.opponentUsername;
        loser = localStorage.username;
      }

      console.log(this.props.start)

      const formData = new FormData();
      formData.append("start", this.props.start);
      formData.append("duration", Math.floor((Date.now() - this.props.start) / 1000));
      formData.append("winner", winner);
      formData.append("loser", loser);
  
      try {
        let res = await fetch('/api/saveFight', {
          method: 'post',
          body: formData
        });
        if (res.ok) {
          toast("Results saved.")
        } else {
          toast("Error occured.");
        }
      } catch (e) {
          toast("Error occured.");
      }
    }
  }

  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  };

  render() {
    if (!this.props.showResult) {
      return null;
    }

    if (this.props.userPoints > this.props.opponentPoints) {
      return (
        <div className="overlay">
          <div className="resultModal">
            <div className="wonMessage">
              <span > Congratulations! <br/> You won! </span>
              <div className="registerClose registerButton">
                <Link to="/home" onClick={() => this.onClose()}>
                  <button className="btn">
                    Home
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.props.userPoints < this.props.opponentPoints) {
      return (
        <div className="overlay">
          <div className="resultModal">
            <div className="lostMessage">
              <span > Sorry... <br/> You lost. </span>
              <div className="resultButton ">
                <Link to="/home" onClick={() => this.onClose()}>
                  <button className="btn">
                    Home
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="overlay">
          <div className="resultModal">
            <div className="lostMessage">
              <span > It's a tie! <br/> Results won't be saved. <br/> You can play a rematch to determine the winner. </span>
              <div className="resultButton ">
                <Link to="/home" onClick={() => this.onClose()}>
                  <button className="btn">
                    Home
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default ResultModal;
