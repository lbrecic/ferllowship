import React from "react";
import SubmitButton from "./SubmitButton";
import "../styles/Request.css";

class LocationsInPerson extends React.Component {
  constructor(props) {
    super(props);
    this.setShow = this.props.setShow;
    this.setRequest = this.props.setRequest;
    this.setShowLocation = this.props.setShowLocation;
    this.state = { 
        locations: 0
    }
  }

    locations = {
        locationList: [{
                            locationName: "location 1", 
                            playerUsername: "player 101",
                            locationPhotoLink: "pic 1",
                            validationInPerson: 1
                        }, 
                        {   
                            locationName: "location 2", 
                            playerUsername: "player 54",
                            locationPhotoLink: "pic 2",
                            validationInPerson: 1
                        }]
    } 

    // async componentDidMount() {        
    //     try {
    //         // promjeni adresu 
    //       let res = await fetch('/api/locations-in-person');
    //       let result = await res.json();
    
    //       if (result) {
    //         this.setState({
    //             playerList: result
    //         });
    //       }
    //     } catch (e) {
    //     }
    // }

  render() {
      return (
        <div className="overlayRequest">
            <div className="modalRequest">
                <div className="cartographerRequest modal-contentRequest">
                    <button onClick={() => this.setShow(0)} 
                        style={{alignSelf:'start', margin:'5px'}}>x</button>
                    <div className="text-center text-base geo-text white p-3">
                        Locations for validation in person
                    </div>
                    <hr />
                    <div>
                        {this.locations.locationList.map((location) => (
                            <div className="center relative text-center text-sm usernames p-3 box-shadow cursor-pointer"
                                onClick={() => {this.setShow(0); this.setShowLocation(location); this.setRequest(location)}}>
                                <div className="absolute left-0">
                                    {location.locationPhotoLink}
                                </div>
                                <div className="text-center">
                                    {location.locationName}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      );
  }
}

export default LocationsInPerson;