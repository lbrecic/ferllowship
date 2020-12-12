import React from "react";
import InputField from "./InputField";
import "../styles/EditProfile.css";

import { toast } from 'react-toastify';

const USERNAME_MAX_LENGTH = 128;
const EMAIL_MAX_LENGTH = 128;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 128;

/*  TO DO:  PROMJENA SLIKE? */
            
class EditProfile extends React.Component {
    
    state = {
        username: "",
        password: "",
        oldPassword: "",
        email: "",
        photoLink: "",
        show: false,
        changedPassword: false
    };
    
    async componentDidMount() {        
        try {
            let res = await fetch('/api/players?username=' + localStorage.username);
            let result = await res.json();
    
            if (result && !result.error) {
                this.setState({
                username: result.username,
                //password: result.password,
                email: result.email,
                photoLink: result.photoLink
                });
            }
        } catch (e) {}
    }

    setInputValueUsername(val) {
        this.setState({
          username: val,
        });
    }
    
    setInputValueEmail(val) {
        this.setState({
          email: val,
        });
      }

    setInputValuePassword(property, val) {
        this.setState({
          [property]: val
        })
        this.setState.changedPassword = true;
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
        if(this.state.changedPassword){
            if (this.state.password.length < PASSWORD_MIN_LENGTH) {
                isValid = false;
                toast("Nova lozinka mora imati barem 8 znakova.");
            } else if (this.state.password.length > PASSWORD_MAX_LENGTH) {
                isValid = false;
                toast("Lozinka je predugačka.");
            }
            if(!this.state.oldPassword){
                toast("Stara lozinka mora biti unesena");
                isValid = false;
            }
        
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
        if(this.validate()) 
            this.edit();
    }
   
    async edit(){
        
        const formData = new FormData();
        if(this.state.changedPassword){
            formData.append("oldPassword", this.state.oldPassword);
            formData.append("password", this.state.password);
        }
        formData.append("username", this.state.username);
        formData.append("email", this.state.email);
    
        try {
            let res = await fetch('/api/profile/edit', {
            method: 'post',
            body: formData
            });
    
            let result = await res.json();
            if (result && result.message) {
              toast(result.message);
            }
        } catch (e) {
            toast("Dogodila se pogreška.");
        }
    
    }
  

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
                            <div className="inputEdit1">
                            <InputField 
                                type="text"
                                value={this.state.username}
                                onChange={(val) => this.setInputValueUsername(val)}
                            />
                            </div>
                            
                        </div>
                        <div className="registerDivEdit">
                        <div className="editInput">
                                Email: </div>
                            <div className="inputEdit2">
                            <InputField
                                type="text"
                                value={this.state.email}
                                onChange={(val) =>this.setInputValueEmail(val)}
                            />
                            </div>
                            
                        </div>
                        <div className="registerDivEdit">
                            <InputField
                                type="password"
                                placeholder='Stara lozinka'
                                onChange={(val) => this.setInputValuePassword('oldPassword', val)}
                            />   
                            <InputField
                                type="password"
                                placeholder='Nova lozinka'
                                onChange={(val) => this.setInputValuePassword('password', val)}
                            />       
                            </div>
                          
                            
                        <button className="btn registerButtonEdit" type='submit' > 
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

