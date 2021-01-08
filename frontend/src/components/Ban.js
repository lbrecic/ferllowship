import React from "react";
import { toast } from 'react-toastify';
import "../styles/Ban.css"

class Ban extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            temporaryBan: 0,
            permanentBan: 0
        };
    }

    onClose = (e) => {
        this.props.onClose && this.props.onClose(e);
    };

    setTemporaryBan(val) {
        this.setState({
          temporaryBan: 1,
          permanentBan: 0
        });
    }

    setPermanentBan(val) {
        this.setState({
          temporaryBan: 0,
          permanentBan: 1
        });
    }

    mySubmitHandler = (event) => {
        event.preventDefault();
        this.save();
    }
   
    async save(){
        
        const formData = new FormData();
        formData.append("temporaryBan", this.state.temporaryBan);
        formData.append("permanentBan", this.state.permanentBan);
        
        try {
            let res = await fetch('/api/profile', {
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
        if (!this.props.show) {
            return null;
        }

        return (
        <div className="overlayEdit">
            <div className="modalEdit">
                <div className="modal-contentEdit">
                    <div className="registerTitle">Choose ban status</div>
                    <form onSubmit={this.mySubmitHandler} >
                        <div className="banDiv">
                            <lable>
                                <input type="radio" name="ban" onClick={(val) => this.setTemporaryBan(val)}/> Temporary ban
                            </lable>
                            <lable>
                                <input type="radio" name="ban" onClick={(val) => this.setPermanentBan(val)}/> Permanent ban
                            </lable>
                        </div>

                        <div className="btnDiv">
                        <button className="btn editBtn" type='submit' > 
                            Save changes 
                        </button>
                       
                        <button className="btn editBtn" onClick={(e) => this.onClose(e)}>
                            Cancel
                        </button>
                       
                        </div>    
                        
                    </form>
                </div>
            </div>
        </div>);
    }

}

export default Ban;

