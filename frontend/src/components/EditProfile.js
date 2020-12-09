import React from "react";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import "../styles/EditProfile.css";
import ImageUploader from "react-images-upload";

import { toast } from 'react-toastify';
import ChangePassword from "./ChangePassword";

const USERNAME_MAX_LENGTH = 128;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 128;
const EMAIL_MAX_LENGTH = 128;

class EditProfile extends React.Component {
    
    state = {
        username: "",
        password: "",
        email: "",
        photoLink: "",
        show: false
    };
    
    async componentDidMount() {        
        try {
            let res = await fetch('/api/players?username=' + localStorage.username);
            let result = await res.json();
    
            if (result && !result.error) {
                this.setState({
                username: result.username,
                password: result.password,
                email: result.email,
                photoLink: result.photoLink
                });
            }
        } catch (e) {}
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

    validate() {
        let isValid = true;
        if (this.state.username.length > USERNAME_MAX_LENGTH) {
            isValid = false;
            toast("Korisničko ime je predugačko.");
        }

        if (this.state.password.length < PASSWORD_MIN_LENGTH) {
            isValid = false;
            toast("Lozinka mora imati barem 8 znakova.");
        } else if (this.state.password.length > PASSWORD_MAX_LENGTH) {
            isValid = false;
            toast("Lozinka je predugačka.");
        }

        if (this.state.email.length > EMAIL_MAX_LENGTH) {
            isValid = false;
            toast("Email je predugačak.");
        } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(this.state.email)) {
            isValid = false;
            toast("Email nije u valjanom formatu.");
        }

        return isValid;
    }

    mySubmitHandler = (event) => {
        event.preventDefault();
        alert("You are submitting " + this.state.username);
       // this.doRegister(event);
    }
    // myChangeHandler = (event) => {}

    showEditPassword = e => {
        this.setState({
          show: !this.state.show
        })
    }
    
    onCloses = e => {
        this.setState({
          show: false
        })
    };
    

    render() {
        if (!this.props.show) {
            return null;
        }

        return (
        <div className="overlayEdit">
            <div className="modalEdit">
                <div className="modal-contentEdit">
                    <div className="registerTitle">Uredi profil</div>
                    <form onSubmit={this.mySubmitHandler} >
                        <div className="registerDivEdit">
                            <div className="editInput">
                                Username: </div>
                            <InputField className="inputEdit"
                                type="text"
                                value={this.state.username}
                                //onChange= {this.myChangeHandler}
                                onChange={(val) =>
                                    this.setInputValueUsername("username", val)
                                }
                            />
                            
                        </div>
                        
                        <button className="btn editButton" type='button'
                                    onClick={e => { this.showEditPassword(); }} >
                                        Promijeni lozinku
                        </button>
                        <ChangePassword show={this.state.show} onClose={() => this.onCloses()} />
                            
                        <div className="registerDivEdit">
                        <div className="editInput">
                                Email: </div>
                            
                            <InputField className="inputEdit"
                                type="text"
                                value={this.state.email}
                                onChange={(val) =>
                                    this.setInputValueEmail("email", val)
                                }
                            />
                        </div>
                            
                            <button  className="btn registerButtonEdit" type='submit'  > 
                                Spremi promjene 
                            </button>
                       
                            <button className="btn registerButtonEdit" onClick={(e) => this.onClose(e)}>
                                Odustani
                            </button>
                        
                    </form>
                </div>
            </div>
        </div>);
    }

}

export default EditProfile;

