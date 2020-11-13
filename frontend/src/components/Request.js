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
      iban: this.props.request.iban,
      idPhotoLink: this.props.request.idPhotoLink,
      buttonDisabled: false,
    };
  }

  async acceptApply(){
    const formData = new FormData();
    formData.append("username", this.state.username);
    formData.append("status", "accept");
    try{
      let res = await fetch('/api/requests/' + this.state.username, {
        method: 'post',
        body: formData
      });
      let result = await res.json();
      if (result) {
        toast("Prihvaćeno.");
      }
    }catch(e){
      toast("Dogodila se pogreška!");
    }
  }

  async declineApply(){
    const formData = new FormData();
    formData.append("username", this.state.username);
    formData.append("status", "decline");
    try{
      let res = await fetch('/api/requests/' + this.state.username, {
        method: 'post',
        body: formData
      });
      let result = await res.json();
      if (result) {
        toast("Odbijeno.");
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
              <div className="IBAN textBox">IBAN: {this.state.iban}</div>
              <div className="picture">
                <img
                  src={this.state.idPhotoLink}
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
