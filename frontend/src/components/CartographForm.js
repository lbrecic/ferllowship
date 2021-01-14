import React from "react";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import "../styles/CartographForm.css";
import ImageUploader from "react-images-upload";
import { toast } from "react-toastify";

class CartographForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      IBAN: "",
      buttonDisabled: false,
      show: true,
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



  async doApply() {
    this.setState({
      show: false,
    });

    if(!this.validate()){
      return;
    }
    const formData = new FormData();
    formData.append("username", localStorage.username);
    formData.append("iban", this.state.IBAN);
    formData.append("picture", this.state.pictures[0]);

    try { 
      let res = await fetch("/api/requests", {
        method: "post",
        body: formData
      });
      let result = await res.json();
      console.log(result);
      if (result && result.message) {
        toast(result.message);
      }
    } catch (e) {
      toast("Error occured.");
    }
  }

  validate() {
    let isValid = true;

    if (!this.state.IBAN) {
      isValid = false;
     toast("Input IBAN!");
    }

    if (!this.state.pictures[0]) {
      isValid = false;
      toast("Attach picture of your ID card!");
    }
    return isValid;
  }

  render() {
    return (
          <div className="registerForm modal-contentForm">
            <div className="title-register">Become a cartographer</div>

            <div className="registerDiv">
            <p className="iban">Input IBAN:</p>
              <InputField
                type="text"
                placeholder="IBAN"
                value={this.state.IBAN ? this.state.IBAN : ""}
                onChange={(val) => this.setInputValueIBAN("IBAN", val)}
              />
            </div>

            <p className="cartographPicture">Attach picture of your ID card:</p>
            <div className="imageUploaderForm">
            <div className="lijepi-obrubForm">
              <ImageUploader className="uploadWindow"
                singleImage={true}
                withIcon={false}
                withLabel={false}
                withPreview={true}
                buttonText="Choose image"
                onChange={this.onDrop}
                imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg"]}
                maxFileSize={5242880}
              />
              </div>
            </div>


            <div className="registerButton">
              <SubmitButton
                text="Send request"
                disabled={this.state.buttonDisabled}
                onClick={() => this.doApply()}
              />
            </div>
          </div>
    );
  }
}

export default CartographForm;
