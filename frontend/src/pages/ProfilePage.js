import React from 'react'
import LocationRequests from '../components/LocationRequests';
import LocationRequest from '../components/LocationRequest';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartographForm from '../components/CartographForm';
import CartographRequests from '../components/CartographRequests';
import CartographRequest from '../components/CartographRequest';
import SubmitButton from "../components/SubmitButton";
import EditProfile from "../components/EditProfile";
import PromoteAdmin from '../components/PromoteAdmin';
import AllUsersWindow from '../components/AllUsersWindow';
import LocationsInPerson from '../components/LocationsInPerson';
import '../styles/App.css';
import cards from '../utils/cards.png';
import stats from '../utils/statistics.png';
import { Link } from "react-router-dom";
import '../styles/Profile.css'; 

class ProfilePage extends React.Component {
  state = {
    username: "",
    email: "",
    photoLink: "",
    authorityLevel: "",
  };

  async componentDidMount() {
    try {
      let res = await fetch("/api/player?username=" + localStorage.username);
      let result = await res.json();

      if (result && !result.error) {
        this.setState({
          username: result.username,
          email: result.email,
          photoLink: result.photoLink,
          authorityLevel: result.authorityLevel,
        });
      }
    } catch (e) {}
  }

    constructor (props) {
        super(props);
        this.showCartographRequest = 0;
        this.cartographRequest = 0;
        this.showLocationRequest = 0;
        this.locationRequest = 0;
        this.promoteWindow = 0;
        this.allUsersWindow = 0;
        this.locationsInPerson = 0;
    }

    state = {
        username: "lukas",
        email: "lb@fer.hr",
        photoLink: "",
        authorityLevel: "cartograph",
        show: false
    };
    
    async componentDidMount() {        
        try {
          let res = await fetch('/api/player?username=' + localStorage.username);
          let result = await res.json();
    
          if (result && !result.error) {
            this.setState({
              username: result.username,
              email: result.email,
              photoLink: result.photoLink,
              authorityLevel: result.authorityLevel
            });
          }
        } catch (e) {
        }
    }

    setShowCartographRequest = e => {
        this.showCartographRequest = e;
        this.setState(this.state);
    }

    setCartographRequest = e => {
        this.cartographRequest = e;
        this.setState(this.state);
    }

    setShowLocationRequest = e => {
        this.showLocationRequest = e;
        this.setState(this.state);
    }

    setLocationRequest = e => {
        this.locationRequest = e;
        this.setState(this.state);
    }

    showPromoteWindow = e => {
        this.promoteWindow = e;
        this.setState(this.state);
    }

    showLocationsInPerson = e => {
        this.locationsInPerson = e;
        this.setState(this.state);
    }

    showEditWindow = e => {
        this.setState({
          show: !this.state.show
        })
    }
    
    onClose = e => {
        this.setState({
          show: false
        })
    };
    

    render() {
        if(this.showCartographRequest === 0 && this.showLocationRequest === 0 &&
            this.promoteWindow === 0 && this.allUsersWindow === 0 &&
            this.locationsInPerson === 0)
        return (
            <>
            <Header />
            <div className="w-full h-screen geo-color full-profile">
                <div className="flex justify-center align-center h-screen">
                    <div className="w-1/4 h-1/4 profile">
                        <div className="h-12"></div>
                        <div className="w-full h-32 "></div>
                        <div className="flex justify-center profilePictureContainer">
                            <img src={ this.state.photoLink } className="App-logo box-shadow profilePicture" alt="logo" />
                        </div>
                    </div>
                    <div className="w-1/2">
                        <div className="h-12"></div>
                        <div className="w-full h-64 p-12">
                                <div className='title white logo-title'> 
                                    { this.state.username }
                                </div>
                                <div className="text-center">   
                                    <button className="btn editButton"
                                            onClick={() => { this.showEditWindow(); }} >
                                            Uredi profil
                                    </button>
                                </div>
                                <EditProfile show={this.state.show} onClose={() => this.onClose()} />
                        </div>
                        <div className="flex justify-center">
                            <div className="w-1/4 text-center"></div>                            
                            <div className="w-1/4 text-center">
                                <Link 
                                    to="/deck"
                                >
                                    <div className="flex justify-center">
                                        <img src={cards} className="h-32" alt="logo" />
                                    </div>
                                    <span>Moje karte</span>
                                </Link>
                            </div>
                            <div className="w-1/4 text-center">
                                <Link 
                                    to="/stats"
                                >
                                    <div className="flex justify-center">
                                        <img src={stats} className="h-32 p-3" alt="logo" />
                                    </div>
                                    <span>Moja statistika</span>
                                </Link>
                            </div>
                            <div className="w-1/4 text-center"></div>
                            
                        </div>
                        <div className="text-center">
                            {this.state.authorityLevel === "cartograph" &&
                                <SubmitButton
                                    text="Locations for validation in person"
                                    onClick={() => this.showLocationsInPerson(1)}
                                />
                            }
                        </div>
                        <div className="text-center">
                            {this.state.authorityLevel === "admin" &&
                                <SubmitButton
                                    text="Show all users"
                                    onClick={() => this.showAllUsersWindow(1)}
                                />
                            }
                        </div>
                        <div className="text-center">
                            {this.state.authorityLevel === "admin" &&
                                <SubmitButton
                                    text="Promote someone to admin"
                                    onClick={() => this.showPromoteWindow(1)}
                                />
                            }
                        </div>
                    </div>
                    <div className="w-1/4">
                        <div className="h-12"></div>
                            {this.state.authorityLevel === "player" && 
                                <CartographForm />
                            }
                            {this.state.authorityLevel === "admin" &&
                                <CartographRequests setShow={ this.setShowCartographRequest }
                                                    setRequest={ this.setCartographRequest }/>
                            }
                            {this.state.authorityLevel === "cartograph" &&
                                <LocationRequests setShow={ this.setShowLocationRequest }
                                                setRequest={ this.setLocationRequest }/>
                            }
                    </div>
                </div>
            </div>
            <Footer />
            </>
        );

        if(this.showCartographRequest !== 0 || this.showLocationRequest !== 0 ||
            this.promoteWindow === 1 || this.allUsersWindow === 1 ||
            this.locationsInPerson === 1)
            return(
            <>
            <Header />
            <div className="w-full h-screen geo-color full-profile">
                <div className="flex justify-center align-center h-screen">
                    <div className="w-1/4 h-1/4 profile">
                        <div className="h-12"></div>
                        <div className="w-full h-32 "></div>
                        <div className="flex justify-center profilePictureContainer">
                            <img src={this.state.photoLink} className="App-logo box-shadow profilePicture" alt="logo" />
                        </div>
                    </div>
                    <div className="w-1/2">
                        <div className="h-12"></div>
                        <div className="w-full h-64 p-12">
                            <div className='title white logo-title'> 
                                { this.state.username }
                            </div>
                        </div>
                        <div className="flex justify-center">
                            
                            <div className="w-1/4 text-center"></div>                            
                            <div className="w-1/4 text-center">
                                <Link 
                                    to="/deck"
                                >
                                    <div className="flex justify-center">
                                        <img src={cards} className="h-32" alt="logo" />
                                    </div>
                                    <span>Moje karte</span>
                                </Link>
                            </div>
                            <div className="w-1/4 text-center">
                                <Link 
                                    to="/stats"
                                >
                                    <div className="flex justify-center">
                                        <img src={stats} className="h-32 p-3" alt="logo" />
                                    </div>
                                    <span>Moja statistika</span>
                                </Link>
                            </div>
                            
                            <div className="w-1/4 text-center"></div>
                            
                        </div>
                        <div className="text-center">
                            {this.state.authorityLevel === "cartograph" &&
                                <SubmitButton
                                    text="Locations for validation in person"
                                    onClick={() => 1}
                                />
                            }
                        </div>
                        <div className="text-center">
                            {this.state.authorityLevel === "admin" &&
                                <SubmitButton
                                    text="Show all users"
                                    onClick={() => this.showAllUsersWindow(1)}
                                />
                            }
                        </div>
                        <div className="text-center">
                            {this.state.authorityLevel === "admin" &&
                                <SubmitButton
                                    text="Promote someone to admin"
                                    onClick={() => this.showPromoteWindow(1)}
                                />
                            }
                        </div>
                    </div>
                    <div className="w-1/4">
                        <div className="h-12"></div>
                                {this.allUsersWindow === 1 &&
                                    <AllUsersWindow setShow={ this.showAllUsersWindow }/>
                                }
                                {this.promoteWindow === 1 &&
                                    <PromoteAdmin setShow={ this.showPromoteWindow }/>
                                }
                                {this.locationsInPerson === 1 &&
                                    <LocationsInPerson setShow={ this.showLocationsInPerson }
                                                    setShowLocation={ this.setShowLocationRequest }
                                                    setRequest={ this.setLocationRequest }/>
                                }
                                {this.showCartographRequest !== 0 &&
                                    <CartographRequest setShow={ this.setShowCartographRequest } 
                                                    setRequest={ this.setCartographRequest }
                                                    request={this.cartographRequest}/>
                                }
                                {this.showLocationRequest !== 0 &&
                                    <LocationRequest setShow={ this.setShowLocationRequest } 
                                                    setRequest={ this.setLocationRequest }
                                                    request={this.locationRequest}/>
                                }
                                {this.state.authorityLevel === "admin" &&
                                    <CartographRequests setShow={ this.setCartographRequest } 
                                                    setRequest={ this.setCartographRequest }/>
                                }
                                {this.state.authorityLevel === "cartograph" &&
                                    <LocationRequests setShow={ this.setShowLocationRequest }
                                                    setRequest={ this.setLocationRequest }/>
                                }
                    </div>
                </div>
            </div>
            <Footer />
            </>
            );
    }
}
export default ProfilePage;
