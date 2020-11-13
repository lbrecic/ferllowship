import React from "react";
import SubmitButton from "./SubmitButton";
import "../styles/Request.css";
import { toast } from "react-toastify";

class Request extends React.Component {
  constructor(props) {
    super(props);
    this.setShow = this.props.setShow
    this.state = {
      username: this.props.request.username,
      IBAN: this.props.request.IBAN,
      picture: this.props.request.picture,
      buttonDisabled: false,
    };
  }

  async acceptApply(){
    const formData = new FormData();
    formData.append("username", this.props.username);
    formData.append("status", true);
    try{
      let res = await fetch('/api/requests', {
        method: 'post',
        body: formData
      });
      let result = await res.json();
      if (result && result.success) {
        toast("Uspješno!");
      }
    }catch(e){
      toast("Dogodila se pogreška!");
    }
  }

  async declineApply(){
    const formData = new FormData();
    formData.append("username", this.props.username);
    formData.append("status", false);
    try{
      let res = await fetch('/api/requests', {
        method: 'post',
        body: formData
      });
      let result = await res.json();
      if (result && result.success) {
        toast("Uspješno!");
      }
    }catch(e){
      toast("Dogodila se pogreška!");
    }
  }

  render() {
      return (
        <div className="overlayRequest">
          <div className="modalRequest">
            <div className="cartographerRequest modal-contentRequest">
              <button onClick={() => this.setShow(0)} 
                    style={{alignSelf:'start', margin:'5px'}}>x</button>
              <div className="username textBox">
                Korisničko ime: {this.state.username}
              </div>
              <div className="IBAN textBox">IBAN: {this.state.IBAN}</div>
              <div className="picture">
                <img
                  src={this.state.picture}
                  className="picture"
                  alt="Profile pic"
                ></img>
              </div>

              <div className="buttons">
                <div className="requestButton">
                  <SubmitButton
                    className="requestButton"
                    text="Prihvati"
                    onClick={() => {this.setShow(0); this.acceptApply() } }
                  />
                </div>

                <div className="requestButton">
                  <SubmitButton
                    className="requestButton"
                    text="Odbaci"
                    onClick={() => { this.setShow(0); this.declineApply() } }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export default Request;
