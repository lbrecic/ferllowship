import React from 'react'

class LocationRequests extends React.Component {
    constructor(props) {
        super(props);
        this.setShow = this.props.setShow;
        this.setRequest = this.props.setRequest;
        this.state = {
            locations: null
        }    
    }

    async componentDidMount() {        
        try {
          let res = await fetch('/api/location/requests?status=2');
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

        if (this.state.locations !== null && this.state.locations[0] !== null)
            return (
                <div id="requests">
                    <div 
                        className="text-center text-base geo-text white p-3" 
                    >
                        Zahtjevi za lokaciju
                    </div>
                    <div className="h-8"></div>
                    {this.state.locations.map((request) => (
                        <div key={request.locationName}
                            className="text-center text-sm usernames p-3  box-shadow cursor-pointer"
                            onClick={() => {this.setShow(request); this.setRequest(request)}}  
                        >
                            {request.locationName}
                        </div>
                    ))}
                </div>
            );
        else 
            return (
                <div id="requests">
                    <div 
                        className="text-center text-base geo-text white p-3" 
                    >
                        Zahtjevi za lokaciju
                    </div>
                    <div className="h-8"></div>
                    <div className="text-center">Nema novih zahtjeva za prijavu lokacije</div>
                </div>
            );             
    }
}

export default LocationRequests;
