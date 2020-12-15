import React from 'react'

class CartographRequests extends React.Component {
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
          let res = await fetch('/api/requests');
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
                    Kartografski zahtjevi
                </div>
                <div className="h-8"></div>
                {this.state.requests.map((request) => (
                    <div key={request}
                        className="text-center text-sm usernames p-3 cursor-pointer"
                        onClick={() => {this.setShow(request); this.setRequest(request)}}  
                    >
                        username
                    </div>
                ))}
            </div>
        );
    }
}

export default CartographRequests;
