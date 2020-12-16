import React from 'react'

class LocationRequests extends React.Component {
    constructor(props) {
        super(props);
        this.setShow = this.props.setShow;
        this.setRequest = this.props.setRequest;
        this.state = {
            locations: 0
        }
    }

    locations = {
        locationList: [{
                            locationName: "location 1", 
                            playerUsername: "player 64",
                            locationPhotoLink: "pic 1",
                            validationInPerson: 0
                        }, 
                        {   
                            locationName: "location 2", 
                            playerUsername: "player 55",
                            locationPhotoLink: "pic 2",
                            validationInPerson: 0
                        }]
    } 

    // async componentDidMount() {        
    //     try {
    //       let res = await fetch('/api/location-requests');
    //       let result = await res.json();
    
    //       if (result) {
    //         this.setState({
    //           requests: result
    //         });
    //       }
    //     } catch (e) {
    //     }
    // }


    render() {
        return (
            <div id="requests">
                <div 
                    className="text-center text-base geo-text white p-3" 
                >
                    Zahtjevi za lokaciju
                </div>
                <div className="h-8"></div>
                {this.locations.locationList.map((request) => (
                    <div key={request}
                        className="text-center text-sm usernames p-3  box-shadow cursor-pointer"
                        onClick={() => {this.setShow(request); this.setRequest(request)}}  
                    >
                        {request.locationName}
                    </div>
                ))}
            </div>
        );
    }
}

export default LocationRequests;
