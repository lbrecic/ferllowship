import React from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import "../styles/Request.css";

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

class AllUsersWindow extends React.Component {
  constructor(props) {
    super(props);
    this.setShow = this.props.setShow
    this.state = {
        players: 1,
        cartographs: 0,
        admins: 0
    }
  }

    setPlayers = () => {
        this.state = {
            players: 1,
            cartographs: 0,
            admins: 0
        }
        this.setState(this.state);
    }

    setCartographs = () => {
        this.state = {
            players: 0,
            cartographs: 1,
            admins: 0
        }
        this.setState(this.state);
    }

    setAdmins = () => {
      this.state = {
          players: 0,
          cartographs: 0,
          admins: 1
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

        try {
          let res = await fetch('/api/allAdmins');
          let result = await res.json();
    
          if (result) {
            this.setState({
                adminList: result
            });
          }
        } catch (e) {
        }
    }

    async load(change = false) {
      if(change === true) {
        await sleep(200);
        window.location.reload();
      }
    }

  render() {
    if (this.state.playerList === undefined)
      return (
        <div className="overlayRequest">
          <div className="mapOneLocation">
              <Loader />
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
                <div className="buttons" 
                    onClick={() => this.setAdmins()}
                    style={{cursor:'pointer'}}>
                    Admins
                </div>
              </div>
                <hr />
              {this.state.players === 1 &&
                    this.state.playerList.map((player) => (
                        <Link 
                          to={`/profile/${player.username}`}
                        >
                          <div className="text-center text-sm usernames p-3  box-shadow cursor-pointer"
                              onClick={() => this.load(true)}>
                                {player.username}
                          </div>
                        </Link>
                    ))
              }
              {this.state.cartographs === 1 &&
                    this.state.cartographList.map((cartograph) => (
                      <Link 
                        to={`/profile/${cartograph.username}`}
                      >
                        <div className="text-center text-sm usernames p-3  box-shadow cursor-pointer"
                            onClick={() => this.load(true)}>
                              {cartograph.username}
                        </div>
                      </Link>
                    ))
              }
              {this.state.admins === 1 &&
                    this.state.adminList.map((admin) => (
                        <Link 
                          to={`/profile/${admin.username}`}
                        >
                          <div 
                              className="text-center text-sm usernames p-3  box-shadow cursor-pointer"
                              onClick={() => this.load(true)}  
                          >
                              {admin.username}
                          </div>
                        </Link>
                    ))
              }
            </div>
            </div>
        </div>
      );
  }
}

export default AllUsersWindow;