import React from "react";
import SubmitButton from "./SubmitButton";
import InputField from "./InputField";
import "../styles/Request.css";

class PromoteAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.setShow = this.props.setShow
    this.state = {
        email: ""
    }
  }

  setInputValue(property, val) {
    val = val.trim();
    if (val.length > 128) {
      return;
    }

    this.setState({
      [property]: val,
    });
  }

  render() {
      return (
        <div className="overlayRequest">
          <div className="modalRequest">
            <div className="cartographerRequest modal-contentRequest">
              <button onClick={() => this.setShow(0)} 
                    style={{alignSelf:'start', margin:'5px'}}>x</button>
              <div className="username textBox">
                Promote player to admin
              </div>
              <div className="registerDiv">
                <p className="email">Unesi email igrača:</p>
                <InputField
                    type="text"
                    placeholder="email"
                    value={this.state.email ? this.state.email : ""}
                    onChange={(val) => this.setInputValue("email", val)}
                />
                </div>

              <div className="buttons">
                <div className="requestButton">
                  <SubmitButton
                    className="requestButton"
                    text="Prihvati"
                    onClick={() => this.setShow(0)}
                  />
                </div>

                <div className="requestButton">
                  <SubmitButton
                    className="requestButton"
                    text="Odbaci"
                    onClick={() => this.setShow(0)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export default PromoteAdmin;