import React from "react";
import "../styles/EditProfile.css";
import "../styles/ChangePassword.css";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";


class ChangePassword extends React.Component {

    state = {
        oldPassword: "",
        password: "",
        confirmPassword: ""
    };

    onClose = (e) => {
        this.props.onClose && this.props.onClose(e);
    };
 
    render() {
        if (!this.props.show) {
            return null;
        }

        return (
        <div className="overlayEdit">
            <div className="modalEdit">
                <div className="modal-contentEdit">
                  <div className="ChangePassword">
                  <form >
                    <FormGroup className="" controlId="oldPassword">
                      <FormLabel>Old Password</FormLabel>
                      <FormControl className="box"
                        type="password"
                        //onChange={handleFieldChange}
                        value={this.state.oldPassword}
                      />
                    </FormGroup>
                    <hr />
                    <FormGroup  controlId="password">
                      <FormLabel>New Password</FormLabel>
                      <FormControl className="box"
                        type="password"
                        //onChange={handleFieldChange}
                        value={this.state.password}
                      />
                    </FormGroup>
                    <FormGroup  controlId="confirmPassword">
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl className="box"
                        type="password"
                        //onChange={handleFieldChange}
                        value={this.state.confirmPassword}
                      />
                    </FormGroup>
                    <LoaderButton className="btn registerButtonEdit"
                      
                      type="submit"
                      //disabled={!validateForm()}
                      //isLoading={isChanging}
                    >
                      Change Password
                    </LoaderButton>
                    <button className="btn registerButtonEdit" onClick={(e) => this.onClose(e)}>
                                Odustani
                            </button>
                  </form>
                </div>
                            
                        

                </div>
            </div>
        </div>);
    }

}

export default ChangePassword;
