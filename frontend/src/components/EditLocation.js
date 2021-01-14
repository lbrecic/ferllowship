import React from "react";
import SubmitButton from "./SubmitButton";
import InputField from "./InputField";
import ImageUploader from "react-images-upload";
import { toast } from 'react-toastify';
import "../styles/EditLocation.css";

class EditLocation extends React.Component {
    constructor(props) {
        super(props);
        this.setShow = this.props.setShow
        this.state = {
            location: this.props.location,
            oldLocationName: this.props.location.locationName,
            newLocationName: this.props.location.locationName,
            locationDesc: this.props.location.locationDesc,
            locationPhoto: this.props.location.locationPhoto,
            pictures:[],
            categoryName: this.props.location.category.categoryName,
            changedPicture: false,
            open: false
        }
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

    setInputValueName(val) {
        this.setState({
            newLocationName: val,
        });
    }

    setInputValueCategory(val) {
        this.setState({
            categoryName: val,
        });
    }

    setInputValueDescription(val) {
        this.setState({
            locationDesc: val,
        });
    }

    async edit(){
        
        const formData = new FormData();

        formData.append("locationName", this.state.oldLocationName);
        formData.append("newLocationName", this.state.newLocationName);
        formData.append("locationDesc", this.state.locationDesc);
        formData.append("categoryName", this.state.categoryName);

        let oldPicture = await fetch(this.props.location.locationPhoto);
        let blob = await oldPicture.blob();
        
        if (this.state.changedPicture !== false)
            formData.append("locationPhoto", this.state.pictures[0]);
        else 
            formData.append("locationPhoto", blob);

        try {
            let res = await fetch('/api/location/requests/edit', {
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

    }

    render() {
      return (
        <div className="overlayRequest">
            <div className="modalRequest">
                <div className="cartographerRequest modal-contentRequest">
                        <div className={"pictureDiv" + (this.state.open ? ' in' : '')}>
                            <div className="pictureEdit-location">
                                <img
                                    src={this.state.location.locationPhoto}
                                    alt="logo"
                                    className="box-shadow imageEdit" 
                                />
                                <div className="pictureChange-location" onClick={this.toggle.bind(this)}>
                                    <div className="textEdit">
                                        Change photo
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        
                        <div className="pictureDiv">
                            
                            <div className={"collapse" + (this.state.open ? ' in' : '')}>
                                <p className="imgText"
                                onClick={this.toggle.bind(this)}>
                                    Attach location picture:</p>
                                <div className="lijepi-obrub">
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
                        </div>
                            <div className="cardTitle">{this.state.location.locationName}</div>
                            <div className="registerDivEdit">
                                <div className="editInput">
                                        Name:
                                </div>
                                <div className="inputEdit2">
                                    <InputField
                                        type="text"
                                        value={this.state.newLocationName}
                                        onChange={(val) =>this.setInputValueName(val)}
                                    />
                                </div>
                            </div>
                            <div className="registerDivEdit">
                                <div className="editInput">
                                        Category:
                                </div>
                                <div className="inputEdit2">
                                    <InputField
                                        type="text"
                                        value={this.state.categoryName}
                                        onChange={(val) =>this.setInputValueCategory(val)}
                                    />
                                </div>
                            </div>
                            <div className="registerDivEdit">
                                <div className="editInput">
                                        Description:
                                </div>
                                <div className="inputEdit2">
                                    <InputField
                                        type="text"
                                        value={this.state.locationDesc}
                                        onChange={(val) =>this.setInputValueDescription(val)}
                                    />
                                </div>
                            </div>
                            
                       
                        <div className="buttons">
                            <div className="requestButton">
                            <SubmitButton
                                className="requestButton"
                                text="Confirm"
                                onClick={() => {this.edit(); this.setShow(0)}}
                            />
                            </div>

                            <div className="requestButton">
                            <SubmitButton
                                className="requestButton"
                                text="Cancel"
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

export default EditLocation;