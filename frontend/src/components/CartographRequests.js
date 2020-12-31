import React from 'react'

class CartographRequests extends React.Component {
    constructor(props) {
        super(props);
        this.setShow = this.props.setShow;
        this.setRequest = this.props.setRequest;
        this.state = {
            requests: null
        }
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
        if (this.state.requests !== null && this.state.requests[0] !== null)
            return (
                <div id="requests">
                    <div 
                        className="text-center text-base geo-text white p-3" 
                    >
                        Cartograph requests
                    </div>
                    <div className="h-8"></div>
                    {this.state.requests.map((request) => (
                        <div key={request.username}
                            className="text-center text-sm usernames p-3  box-shadow cursor-pointer"
                            onClick={() => {this.setShow(request); this.setRequest(request)}}  
                        >
                            {request.username}
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
                        Cartograph requests
                    </div>
                    <div className="h-8"></div>
                        <div className="text-center">No new cartograph requests</div>
                </div>
            );             
    }
}

export default CartographRequests;
