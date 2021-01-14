import React from "react";
import { toast } from 'react-toastify';
import "../styles/Ban.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class ChangeRole extends React.Component {

    constructor(props){
        super(props);
        this.setShow = this.props.setShow;
        this.state = {
            username: this.props.user.username,
            newRole: " ",
            change: false
        };
    }

    onClose = (e) => {
        this.props.onClose && this.props.onClose(e);
    };

    setPlayer(){
        this.setState({
            newRole: "player",
            change: true
        });
    }

    setCartograph(){
        this.setState({
            newRole: "cartograph",
            change: true
        });
    }

    setAdmin(){
        this.setState({
            newRole: "admin",
            change: true
        });
    }

    mySubmitHandler = (event) => {
        event.preventDefault();
        if(this.state.change === true)
            this.save();
        this.onClose(event);
    }
   
    async save(){
        
        const formData = new FormData();
        formData.append("username", this.state.username);
        formData.append("newRole", this.state.newRole);
        
        try {
            let res = await fetch('/api/player/changeRole', {
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
                    <button onClick={(e) => this.onClose(e)} 
                        style={{alignSelf:'start', margin:'5px'}}>Close</button>
                    <div className="registerTitle">Choose new role for user</div>
                    <form onSubmit={this.mySubmitHandler} >
                        <div className="banDiv">
                            <lable>
                                <input type="radio" name="change" onClick={() => this.setPlayer()}/> Player 
                            </lable>
                            <lable>
                                <input type="radio" name="change" onClick={() => this.setCartograph()}/> Cartograph
                            </lable>
                            <lable>
                                <input type="radio" name="change" onClick={() => this.setAdmin()}/> Admin
                            </lable>
                        </div>
                        

                        <div className="btnDiv">
                        <button className="btn editBtn" type='submit'> 
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

export default ChangeRole;

