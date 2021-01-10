import React from "react";
import { toast } from 'react-toastify';
import "../styles/Ban.css"

class Ban extends React.Component {

    /*
    UNBANNED(0)
    TEMPORARY(1)
    PERMANENT(2)
    */
    
    constructor(props){
        super(props);
        this.state = {
            username: this.props.username,
            temporaryBan: 0,
            permanentBan: 0,
            unbanned: -1,
            date: ""
        };
    }

    onClose = (e) => {
        this.props.onClose && this.props.onClose(e);
    };

    setTemporaryBan() {
        this.setState({
          temporaryBan: 1,
          permanentBan: 0,
          unbanned: -1
        });
    }

    setPermanentBan() {
        this.setState({
          temporaryBan: 0,
          permanentBan: 2,
          unbanned: -1
        });
    }

    setUnbannedBan() {
        this.setState({
          temporaryBan: 0,
          permanentBan: 0,
          unbanned: 0
        });
    }

    setDate(val){
        this.setState({
            date: val
        });
    }

    mySubmitHandler = (event) => {
        //event.preventDefault();
        this.save();
    }
   
    async save(){
        
        const formData = new FormData();
        formData.append("username", this.state.username);

        if(this.state.temporaryBan === 1)
            formData.append("temporaryBan", this.state.temporaryBan);
        else if(this.state.permanentBan === 2)
            formData.append("permanentBan", this.state.permanentBan);
        else if(this.state.unbanned === 0)
            formData("unbanned", this.state.unbanned);

        formData.append("date", this.state.date);
        
        try {
            let res = await fetch('/api/player/ban', {
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
                                <input type="radio" name="ban" onClick={() => this.setUnbannedBan()}/> Unbanned 
                            </lable>
                            <lable>
                                <input type="radio" name="ban" onClick={() => this.setTemporaryBan()}/> Temporary ban
                            </lable>
                            <input type="date" onChange={(val) => this.setDate(val)}></input>
                            <lable>
                                <input type="radio" name="ban" onClick={() => this.setPermanentBan()}/> Permanent ban
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

