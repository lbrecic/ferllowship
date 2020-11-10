import React from "react";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import "./RegisterForm.css";
import ImageUploader from "react-images-upload";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    if (val.length > 128) {
      return;
    }

    this.setState({
      [property]: val,
    });
  }

  setInputValuePassword(property, val) {
    val = val.trim();
    if (val.length > 128) {
      return;
    }

    this.setState({
      [property]: val,
    });
  }

  setInputValueEmail(property, val) {
    val = val.trim();
    if (val.length > 128) {
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
      //buttonDisabled: true,
      show: false,
    });

    console.log(this.state.show);

    // if (!this.state.username) {
    //   return;
    // }

    // if (!this.state.password) {
    //   return;
    // }

    // if (!this.state.email) {
    //   return;
    // }

    if(!this.validate()){
      return;
    }

    const formData = new FormData();
    formData.append("username", this.state.username);
    formData.append("password", this.state.password);
    formData.append("email", this.state.email);
    formData.append("picture", this.state.pictures[0]);

    try{
      let res = await fetch('/api/register', {
        method: 'post',
        body : formData
      });

      // let result = await res.json();
      // if(result && result.success){
      //   UserStore.isLoggedIn = true;
      //   UserStore.username = result.username;
      // } else if(result  && result.success === false){
      //   this.resetForm();
      //   alert(result.msg);
      // }
    } catch (e) {
      console.log(e);
      this.resetForm();
    }
  }

  validate() {
    let isValid = true;
    let alertMessage = "";

    if (!this.state.username) {
      isValid = false;
      toast("Unesi korisničko ime!");
    }

    if (!this.state.email) {
      isValid = false;
      toast("Unesi email!");
        }

    if (!this.state.password) {
      isValid = false;
      toast("Unesi lozinku!");
    }

    if (!this.state.pictures[0]) {
      isValid = false;
      toast("Priloži sliku profila!");
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
                  singleImage = {true}
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
        <ToastContainer className="toast" bodyClassName="toastBody" toastClassName="toast" pauseOnFocusLoss={false} hideProgressBar={true}/>
      </div>
    );
  }
}

export default RegisterForm;
