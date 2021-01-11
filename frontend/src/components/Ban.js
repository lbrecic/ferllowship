import React from "react";
import { toast } from 'react-toastify';
import "../styles/Ban.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
            date: new Date(),
            banStatus: '0',
            change: false,
            showDate: false
        };
    }

    onClose = (e) => {
        this.props.onClose && this.props.onClose(e);
    };

    onChange = date => this.setState({date})

    setTemporaryBan() {
        this.setState({
          banStatus: '1',
          change:true,
          showDate:true
        });
    }

    setPermanentBan() {
        this.setState({
          banStatus: '2',
          change:true,
          showDate: false
        });
    }

    setUnbannedBan() {
        this.setState({
          banStatus: '0',
          change: true,
          showDate: false
        });
    }

    setDate(val){
        this.setState({
            date: val
        });
    }

    mySubmitHandler = (event) => {
        event.preventDefault();
        if(this.state.change === true)
            this.save();
    }
   
    async save(){
        
        const formData = new FormData();
        formData.append("username", this.state.username);
        formData.append("banStatus", this.state.banStatus);
        formData.append("banEnd", this.state.date);
        
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
                            <DatePicker  
                                disabled={!this.state.showDate}
                                onChange={this.onChange}
                                selected={this.state.date}
                                dateFormat='dd/MM/yyyy'
                            />
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

