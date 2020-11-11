import React from "react";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import "./RegisterForm.css";
import ImageUploader from "react-images-upload";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  componentDidMount() {
    fetch("/")
      .then((res) => res.json())
      .then((json) => this.setState({ data: json }));
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
      if (result) {
        toast(result.message);
      }
    } catch (e) {
      toast("Dogodila se pogreška.");
    }

    this.setState({
      buttonDisabled: false
    });
  }

  validate() {
    let isValid = true;

    if (!this.state.username) {
      isValid = false;
      toast("Korisničko ime mora biti uneseno.");
    } else if (this.state.username.length > USERNAME_MAX_LENGTH) {
      isValid = false;
      toast("Korisničko ime je predugačko.");
    }

    if (!this.state.password) {
      isValid = false;
      toast("Lozinka mora biti unesena.");
    } else if (this.state.password.length < PASSWORD_MIN_LENGTH) {
      isValid = false;
      toast("Lozinka mora imati barem 8 znakova.");
    } else if (this.state.password.length > PASSWORD_MAX_LENGTH) {
      isValid = false;
      toast("Lozinka je predugačka.");
    }

    if (!this.state.email) {
      isValid = false;
      toast("Email mora biti unesen.");
    } else if (this.state.email.length > EMAIL_MAX_LENGTH) {
      isValid = false;
      toast("Email je predugačak.");
    } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(this.state.email)) {
      isValid = false;
      toast("Email nije u valjanom formatu.");
    }

    if (!this.state.pictures[0]) {
      isValid = false;
      toast("Slika profila mora biti priložena.");
    }

    return isValid;
  }

  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div className="overlay">
        <div className="modal">
          <div className="registerForm modal-content">
            <div className="title-register">Registriraj se</div>

            <div className="registerDiv">
              <InputField
                type="text"
                placeholder="Korisničko ime"
                value={this.state.username ? this.state.username : ""}
                onChange={(val) => this.setInputValueUsername("username", val)}
              />
            </div>

            <div className="registerDiv">
              <InputField
                type="password"
                placeholder="Lozinka"
                value={this.state.password ? this.state.password : ""}
                onChange={(val) => this.setInputValuePassword("password", val)}
              />
            </div>

            <div className="registerDiv">
              <InputField
                type="email"
                placeholder="Email"
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
                  buttonText='Izaberi sliku profila'
                  onChange={this.onDrop}
                  imgExtension={['.jpg', '.png', '.jpeg']}
                  maxFileSize={5242880}
                />
              </div>
            </div>

            <div className="registerButton">
              <SubmitButton
                text="Registriraj se"
                disabled={this.state.buttonDisabled}
                onClick={() => this.doRegister()}
              />
            </div>

            <div className="registerClose registerButton">
              <button className="btn" onClick={(e) => this.onClose(e)}>
                Zatvori
              </button>
            </div>

          </div>
        </div>

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

export default RegisterForm;
