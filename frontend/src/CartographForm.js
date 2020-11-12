import React from "react";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import "./styles/CartographForm.css";
import ImageUploader from "react-images-upload";

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      IBAN: "",
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

  setInputValueIBAN(property, val) {
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
      IBAN: "",
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

    if (!this.validate()) {
      return;
    }

    try {
      let res = await fetch("/api/people", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          IBAN: this.state.IBAN,
        }),
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
      alertMessage = alertMessage + "Unesi IBAN!" + "\n";
    }

    if (!this.state.pictures[0]) {
      isValid = false;
      alertMessage = alertMessage + "Izaberi sliku!" + "\n";
    }

    if (alertMessage !== "") {
      alert(alertMessage);
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
            <div className="title-register">Postani kartograf</div>

            <form>
              <div className="registerDiv">
                <p className="iban">Unesi IBAN:</p>
                <InputField
                  type="text"
                  placeholder="IBAN"
                  value={this.state.IBAN ? this.state.IBAN : ""}
                  onChange={(val) => this.setInputValueIBAN("IBAN", val)}
                />
              </div>

              <p className="cartographPicture">
                Priloži sliku osobne iskaznice:
              </p>
              <div className="imageUploader">
                <ImageUploader
                  singleImage={true}
                  withIcon={false}
                  withLabel={false}
                  withPreview={true}
                  buttonText="Izaberi sliku"
                  onChange={this.onDrop}
                  imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg"]}
                  maxFileSize={5242880}
                />
              </div>
            </form>

            <div className="registerButton">
              <SubmitButton
                text="Pošalji zahtjev"
                disabled={this.state.buttonDisabled}
                onClick={() => this.doRegister()}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
