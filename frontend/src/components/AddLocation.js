import React from "react";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import "../styles/AddLocation.css";
import ImageUploader from "react-images-upload";
import { toast } from "react-toastify";
import {useState} from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css'; //pogorša menu, ne radi bez toga dropdown 
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'


class AddLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      pictures: [],
      category: "",
      description: "",
      show: false
    };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(picture) {
    this.setState({
      pictures: this.state.pictures.concat(picture),
    });
  }

  setInputValueName(property, val) {
    val = val.trim();
    if (val.length > 128) {
      return;
    }

    this.setState({
      [property]: val,
    });
  }

  setInputValueCategory(val){
      this.setState({
          category: val
      });
  }

  setInputDescription(val){
      this.setState({
        description: val
      });
  }

    
  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  };
  
 
  async addLocation(){
    const formData = new FormData();
    formData.append("locationName", this.state.name);
    formData.append("categoryName", this.state.category);
    formData.append("locationDesc", this.state.description);
    formData.append("locationPhoto", this.state.pictures[0]);
    formData.append("coordinates", new Blob([localStorage.getItem("selectedLocation")], {type: "application/json"}));
    
    try {
        let res = await fetch('/api/location/requests', {
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
                    <div className="registerTitle">Dodaj lokaciju</div>
                    <div className="imageUploaderForm">
                            <InputField
                                type="text"
                                placeholder="Naziv lokacije"
                                value={this.state.name ? this.state.name : ""}
                                onChange={(val) => this.setInputValueName("name", val)}
                            />
                      
                        <select name="category" className="dropdown"
                        onChange={(val) => this.setInputValueCategory(val.target.value)}>
                        <option value="" hidden>Odaberi kategoriju...</option>
                        <option value="Grad">Grad</option>
                        <option value="Naselje">Naselje</option>
                        <option value="Umjetnička instalacija">Umjetnička instalacija</option>
                        <option value="Vrh planine">Vrh planine</option>
                      </select>
                        {/*
                        <div className="App container">
                            <DropdownButton 
                            title={this.state.category ? this.state.category : "Odaberi kategoriju..."}
                            onSelect={(val) => this.setInputValueCategory(val)}
                                >

                                    <Dropdown.Item eventKey="Grad">Grad</Dropdown.Item>
                                    <Dropdown.Item eventKey="Naselje">Naselje</Dropdown.Item>
                                    <Dropdown.Item eventKey="Umjetnička instalacija">Umjetnička instalacija</Dropdown.Item>
                                    <Dropdown.Item eventKey="Vrh planine">Vrh planine</Dropdown.Item>
                                    
                            </DropdownButton>
                            
                        </div>
                        */}
                        <textarea className="textArea"
                        placeholder="Dodaj opis lokacije"
                        onChange={(val) => this.setInputDescription(val.target.value)}
                        />

                        <p className="imgText">Priloži sliku lokacije:</p>
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
                        <div className="btnDiv">
                        <button className="btn editBtn" onClick={() => this.addLocation()} > 
                            Spremi promjene 
                        </button>
                       
                        <button className="btn editBtn" onClick={(e) => this.onClose(e)}>
                            Odustani
                        </button>
                       
                        </div>    
                    </div>
                </div>
            </div>
        </div>
    );}
}

export default AddLocation;