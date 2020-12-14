import React from 'react'

class LocationRequests extends React.Component {
    constructor(props) {
        super(props);
        this.setShow = this.props.setShow;
        this.setRequest = this.props.setRequest;
    }

    state = {
        requests: ["request1", "request2"]
    }

    async componentDidMount() {        
        try {
          let res = await fetch('/api/location-requests');
          let result = await res.json();
    
          if (result) {
            this.setState({
              requests: result
            });
          }
        } catch (e) {
        }
    }


    render() {
        return (
            <div id="requests">
                <div 
                    className="text-center text-base geo-text white p-3" 
                >
                    Zahtjevi za lokaciju
                </div>
                <div className="h-8"></div>
                {this.state.requests.map((request) => (
                    <div key={request}
                        className="text-center text-sm usernames p-3  box-shadow cursor-pointer"
                        onClick={() => {this.setShow(request); this.setRequest(request)}}  
                    >
                        {request}
                    </div>
                ))}
            </div>
        );
    }
}

export default LocationRequests;
