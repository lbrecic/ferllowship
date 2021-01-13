import React from "react";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import "../styles/RegisterForm.css";
import ImageUploader from "react-images-upload";

import { toast } from 'react-toastify';

const USERNAME_MAX_LENGTH = 128;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 128;
const EMAIL_MAX_LENGTH = 128;

class RegisterForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      buttonDisabled: false,
      show: false,
      pictures: [],
    };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(picture) {
    this.setState({
      pictures: this.state.pictures.concat(picture),
    });
  }

  setInputValueUsername(property, val) {
    val = val.trim();
    if (val.length > USERNAME_MAX_LENGTH) {
      return;
    }

    this.setState({
      [property]: val,
    });
  }

  setInputValuePassword(property, val) {
    val = val.trim();
    if (val.length > PASSWORD_MAX_LENGTH) {
      return;
    }

    this.setState({
      [property]: val,
    });
  }

  setInputValueEmail(property, val) {
    val = val.trim();
    if (val.length > EMAIL_MAX_LENGTH) {
      return;
    }

    this.setState({
      [property]: val,
    });
  }

  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  };

  resetForm() {
    this.setState({
      username: "",
      password: "",
      email: "",
      buttonDisabled: false,
    });
  }

  async doRegister() {
    this.setState({
      buttonDisabled: true
    });

    if (!this.validate()) {
      this.setState({
        buttonDisabled: false
      });
      return;
    }

    const formData = new FormData();
    formData.append("username", this.state.username);
    formData.append("password", this.state.password);
    formData.append("email", this.state.email);
    formData.append("picture", this.state.pictures[0]);

    try {
      let res = await fetch('/api/register', {
        method: 'post',
        body: formData
      });

      let result = await res.json();
      if (result && result.message) {
        toast(result.message);
      }
    } catch (e) {
      toast("Error occured.");
    }

    this.setState({
      buttonDisabled: false
    });
  }

  validate() {
    let isValid = true;

    if (!this.state.username) {
      isValid = false;
      toast("Input username!");
    } else if (this.state.username.length > USERNAME_MAX_LENGTH) {
      isValid = false;
      toast("Username is too long!");
    }

    if (!this.state.password) {
      isValid = false;
      toast("Input password!");
    } else if (this.state.password.length < PASSWORD_MIN_LENGTH) {
      isValid = false;
      toast("Password must be at least 8 charachters long.");
    } else if (this.state.password.length > PASSWORD_MAX_LENGTH) {
      isValid = false;
      toast("Password is too long.");
    }

    if (!this.state.email) {
      isValid = false;
      toast("Input e-mail!");
    } else if (this.state.email.length > EMAIL_MAX_LENGTH) {
      isValid = false;
      toast("E-mail is too long.");
    } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(this.state.email)) {
      isValid = false;
      toast("E-mail is not in valid format.");
    }

    if (!this.state.pictures[0]) {
      isValid = false;
      toast("Attach profile picture!");
    }

    return isValid;
  }

  handleKeypress = e => {
    if (e.key === 'Enter') {
      this.doRegister();
    }
  };

  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div className="overlay">
        <div className="modal">
          <div className="registerForm modal-content" onKeyPress={this.handleKeypress}>
            <div className="registerTitle">Register</div>
            <form>
              <div className="registerDiv">
                <InputField
                  type="text"
                  placeholder="Username"
                  id = "username"
                  value={this.state.username ? this.state.username : ""}
                  onChange={(val) =>
                    this.setInputValueUsername("username", val)
                  }
                />
              </div>

              <div className="registerDiv">
                <InputField
                  type="password"
                  placeholder="Password"
                  id = "password"
                  value={this.state.password ? this.state.password : ""}
                  onChange={(val) =>
                    this.setInputValuePassword("password", val)
                  }
                />
              </div>

              <div className="registerDiv">
                <InputField
                  type="email"
                  placeholder="E-mail"
                  value={this.state.email ? this.state.email : ""}
                  onChange={(val) => this.setInputValueEmail("email", val)}
                />
              </div>

              <div className="imageUploader">
                <div className="lijepi-obrub">
                  <ImageUploader
                    singleImage={true}
                    withIcon={true}
                    withLabel={false}
                    withPreview={true}
                    buttonText="Choose profile picture"
                    onChange={this.onDrop}
                    imgExtension={[".jpg", ".png", ".jpeg"]}
                    maxFileSize={5242880}
                  />
                </div>
              </div>
            </form>

            <div className="registerButton">
              <SubmitButton
                text="Register"
                disabled={this.state.buttonDisabled}
                onClick={() => this.doRegister()}
              />
            </div>

            <div className="registerClose registerButton">
              <button className="btn" onClick={(e) => this.onClose(e)}>
                Close
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }

}

export default RegisterForm;
