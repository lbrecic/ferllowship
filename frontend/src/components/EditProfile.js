import React from "react";
import InputField from "./InputField";
import "../styles/EditProfile.css";
import ImageUploader from "react-images-upload";
import { toast } from 'react-toastify';

//const USERNAME_MAX_LENGTH = 128;
const EMAIL_MAX_LENGTH = 128;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 128;
            
class EditProfile extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
           // username: "",
            password: "",
            oldPassword: "",
            email: "",
            photoLink: "",
            pictures:[],
            show: false,
            changedPassword: false,
            //chanedUsername: false,
            changedPicture: false,
            open: false
        };
        this.onDrop = this.onDrop.bind(this);
    }

    toggle() {
        this.setState({
          open: !this.state.open
        });
    }
    onDrop(picture) {
        this.setState({
          pictures: this.state.pictures.concat(picture),
          changedPicture: !this.state.changedPicture
        });
    }
    
    async componentDidMount() {        
        try {
            let res = await fetch('/api/player?username=' + localStorage.username);
            let result = await res.json();
    
            if (result && !result.error) {
                this.setState({
                //username: result.username,
                //password: result.password,
                email: result.email,
                photoLink: result.photoLink
                });
            }
        } catch (e) {}
    }
/*
    setInputValueUsername(val) {
        this.setState({
          username: val,
          chanedUsername: true
        });
        
    }
  */  
    setInputValueEmail(val) {
        this.setState({
          email: val,
        });
        //this.state.changedEmail = true;
    }

    setInputValuePassword(property, val) {
        this.setState({
          [property]: val,
          changedPassword: true
        });
    }

    onClose = (e) => {
        this.props.onClose && this.props.onClose(e);
    };

    validate() {
        let isValid = true;
        /*if (this.state.username.length > USERNAME_MAX_LENGTH) {
            isValid = false;
            toast("Korisničko ime je predugačko.");
        }*/
        if(this.state.changedPassword){
            if (this.state.password.length < PASSWORD_MIN_LENGTH) {
                isValid = false;
                toast("Nova lozinka mora imati barem 8 znakova.");
            } else if (this.state.password.length > PASSWORD_MAX_LENGTH) {
                isValid = false;
                toast("Lozinka je predugačka.");
            }else if(!this.state.oldPassword){
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
        if(this.validate()){
            this.edit();
        }
        
    }
   
    async edit(){
        
        const formData = new FormData();
        /*if(this.state.chanedUsername){    
            formData.append("username", this.state.username);
        }else
            formData.append("username", "");*/

        formData.append("oldPassword", this.state.oldPassword);
        formData.append("password", this.state.password);
        formData.append("email", this.state.email);
        
        formData.append("picture", this.state.pictures[0]);
        
    
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
                        {/*<div className="registerDivEdit">
                            <div className="editInput">
                                Username: </div>
                            <div className="inputEdit1">
                            <InputField 
                                type="text"
                                value={this.state.username}
                                onChange={(val) => this.setInputValueUsername(val)}
                            />
                            </div>
                            
        </div>*/}
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
                        <div className={"pictureDiv" + (this.state.open ? ' in' : '')}>
                            <div className="pictureEdit">
                                <img
                                src={this.state.photoLink}
                                alt="logo"
                                className="box-shadow imageEdit" 
                                />
                                <div className="pictureChange" onClick={this.toggle.bind(this)}>
                                    <div className="textEdit">
                                    Promijeni sliku
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        
                        <div className="pictureDiv">
                            
                            <div className={"collapse" + (this.state.open ? ' in' : '')}>
                                <p className="imgText"
                                onClick={this.toggle.bind(this)}>
                                    Priloži sliku profila:</p>
                                <div className="lijepi-obrub">
                                    <ImageUploader className="uploadWindow"
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
                            </div>
                        </div>
                          
                        <div className="btnDiv">
                        <button className="btn editBtn" type='submit' > 
                            Spremi promjene 
                        </button>
                       
                        <button className="btn editBtn" onClick={(e) => this.onClose(e)}>
                            Odustani
                        </button>
                       
                        </div>    
                        
                    </form>
                </div>
            </div>
        </div>);
    }

}

export default EditProfile;

