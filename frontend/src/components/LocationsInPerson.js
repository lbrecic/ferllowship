import React from "react";
import "../styles/Request.css";

class LocationsInPerson extends React.Component {
  constructor(props) {
    super(props);
    this.setShow = this.props.setShow;
    this.setRequest = this.props.setRequest;
    this.setShowLocation = this.props.setShowLocation;
    this.state = { 
        locations: null
    }
  }

    async componentDidMount() {        
        try {
          let res = await fetch('/api/location/requests?status=3');
          let result = await res.json();
    
          if (result) {
            this.setState({
                locations: result
            });
          }
        } catch (e) {
        }
    }

  render() {
    if (this.state.locations !== null)
      return (
        <div className="overlayRequest">
            <div className="modalRequest">
                <div className="cartographerRequest modal-contentRequest">
                    <button onClick={() => this.setShow(0)} 
                            style={{alignSelf:'start', margin:'5px'}}>Close</button>
                    <div className="text-center text-base geo-text white p-3">
                        Locations for validation in person
                    </div>
                    <hr />
                    <div>
                        {this.state.locations.map((location) => (
                            <div className="center relative text-center text-sm usernames p-3 box-shadow cursor-pointer"
                                onClick={() => {this.setShow(0); this.setShowLocation(location); this.setRequest(location)}}>
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
    else
        return (
            <div className="overlayRequest">
                <div className="modalRequest">
                    <div className="cartographerRequest modal-contentRequest">
                        <button onClick={() => this.setShow(0)} 
                                style={{alignSelf:'start', margin:'5px'}}>Close</button>
                        <div className="text-center text-base geo-text white p-3">
                            Locations for validation in person
                        </div>
                        <hr />
                        <div>
                            Nema novih zahtjeva lokacija za validaciju na terenu
                        </div>
                    </div>
                </div>
            </div>
        );
  }
}

export default LocationsInPerson;