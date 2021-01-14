import React from "react";
import Loader from "./Loader";
import LocationRequest from "./LocationRequest";
import "../styles/Request.css";

class LocationRequestsAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.setShow = this.props.setShow;
    this.request = 0;
    this.showRequest = 0;
    this.state = {
        inPerson: 0
    }
  }

    setInPerson = e => {
        this.setState({
            inPerson: e
        });
    }

    setRequest = (e) => {
      this.request = e;
      this.setState(this.state);
    };
  
    setShowRequest = (e) => {
      this.showRequest = e;
      this.setState(this.state);
    };

    async componentDidMount() {        
        try {
          let res = await fetch('/api/location/requests?status=2');
          let result = await res.json();
    
          if (result) {
            this.setState({
                locationList: result
            });
          }
        } catch (e) {
        }

        try {
          let res = await fetch('/api/location/requests?status=3');
          let result = await res.json();
    
          if (result) {
            this.setState({
                locationInPersonList: result
            });
          }
        } catch (e) {
        }
    }

  render() {
    if (this.state.locationList === undefined)
      return (
        <div className="overlayRequest">
          <div className="mapOneLocation">
              <Loader />
            </div>
        </div>
      );
    if (this.showRequest === 0)
      return (
        <>
        <div className="overlayRequest">
          <div className="modalRequest">
            <div className="cartographerRequest modal-contentRequest">
                <button onClick={() => this.setShow(0)} 
                    style={{alignSelf:'start', margin:'5px'}}>Close</button>
              <div className="text-center text-base geo-text white p-3">
                Location requests
              </div>
              <div className="flex">
                <div className="buttons" 
                    onClick={() => this.setInPerson(0)}
                    style={{cursor:'pointer'}}>
                    New requests
                </div>
                <div className="buttons" 
                    onClick={() => this.setInPerson(1)}
                    style={{cursor:'pointer'}}>
                    Waiting validation
                </div>
              </div>
              <hr />
              {this.state.locationList !== undefined && this.state.inPerson === 0 &&
                    this.state.locationList.map((location) => (
                        <div>
                          {location !== null &&
                            <div 
                                className="text-center text-sm usernames p-3  box-shadow cursor-pointer"
                                onClick={() => {this.setShowRequest(1); this.setRequest(location)}}  
                            >
                                {location.locationName}
                            </div>}
                          {location === null &&
                            <span>There are no new location requests</span>
                          }
                        </div>
                    ))
              }
              {this.state.locationInPersonList !== undefined && this.state.inPerson === 1 &&
                    this.state.locationInPersonList.map((location) => (
                      <div>
                        {location !== null &&
                          <div 
                              className="text-center text-sm usernames p-3  box-shadow cursor-pointer"
                              onClick={() => {this.setShowRequest(1); this.setRequest(location)}}  
                          >
                              {location.locationName}
                          </div>}
                        {location === null &&
                          <span>There are no location requests waiting for validation in person</span>
                        }
                      </div>
                    ))
              }
            </div>
            </div>
        </div>
        </>
      );
      if (this.showRequest === 1) 
        return (
          <LocationRequest setShow={ this.setShowRequest } 
                          setRequest={ this.setRequest }
                          request={this.request}/>
        );
  }
}

export default LocationRequestsAdmin;