import React from "react";
import SubmitButton from "./SubmitButton";
import "../styles/Request.css";

class AllUsersWindow extends React.Component {
  constructor(props) {
    super(props);
    this.setShow = this.props.setShow
    this.state = {
        players: 1,
        cartographs: 0
    }
  }

    setPlayers = () => {
        this.state = {
            players: 1,
            cartographs: 0
        }
        this.setState(this.state);
    }

    setCartographs = () => {
        this.state = {
            players: 0,
            cartographs: 1
        }
        this.setState(this.state);
    }

    async componentDidMount() {        
        try {
          let res = await fetch('/api/allPlayers');
          let result = await res.json();
    
          if (result) {
            this.setState({
                playerList: result
            });
          }
        } catch (e) {
        }

        try {
            let res = await fetch('/api/allCartographs');
            let result = await res.json();
      
            if (result) {
              this.setState({
                  cartographList: result
              });
            }
          } catch (e) {
          }
    }

  render() {
      return (
        <div className="overlayRequest">
          <div className="modalRequest">
            <div className="cartographerRequest modal-contentRequest">
                <button onClick={() => this.setShow(0)} 
                    style={{alignSelf:'start', margin:'5px'}}>Close</button>
              <div className="text-center text-base geo-text white p-3">
                All users
              </div>
              <div className="flex">
                <div className="buttons" 
                    onClick={() => this.setPlayers()}
                    style={{cursor:'pointer'}}>
                    Players
                </div>
                <div className="buttons" 
                    onClick={() => this.setCartographs()}
                    style={{cursor:'pointer'}}>
                    Cartographs
                </div>
              </div>
                <hr />
              {this.state.players === 1 &&
                    this.state.playerList.map((player) => (
                        <div 
                            className="text-center text-sm usernames p-3  box-shadow cursor-pointer"
                            onClick={() => {}}  
                        >
                            {player.username}
                        </div>
                    ))
              }
              {this.state.cartographs === 1 &&
                    this.state.cartographList.map((cartograph) => (
                        <div 
                            className="text-center text-sm usernames p-3  box-shadow cursor-pointer"
                            onClick={() => {}}  
                        >
                            {cartograph.username}
                        </div>
                    ))
              }
            </div>
            </div>
        </div>
      );
  }
}

export default AllUsersWindow;