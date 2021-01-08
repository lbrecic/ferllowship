import React from 'react';
import { withRouter } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import '../styles/Chat.css';
import ClipLoader from "react-spinners/ClipLoader";

class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            playerList: [],
            title: "",
            text: "",
            message: "",
            selectedPlayer: {},
            stompClient: {}
        }
    }

    setTitle(player){
        this.setState({
            title: player.username,
            text: "Ovo je text"
        });
    }

    setFight(player){
        this.setState({
            title: player.username + "-borba",
            text: "ovo je borba"
        });
    }

    setProperty(property, val) {
        this.setState({
            [property]: val
        })
    }

    sendMessage(to) {
        this.props.stompClient.send('/app/message', {}, JSON.stringify({
            from: localStorage.username,
            to: to,
            message: this.state.message
        }));
    };
    
    async componentDidMount() {
        try {
          let res = await fetch('/api/active');
          let result = await res.json();

          if (result) {
            this.setState({
                playerList: result
            });
          }
        } catch (e) {
            // ignore
        }
    }

    shouldComponentUpdate(nextProps) {
        return this.props.stompClient === nextProps.stompClient;
    }

    render() {
        if (!this.props.stompClient.connected) {
            return (
                <div className="App background-color">
                    <Header />
                        <div className="App-header background-color">
                            <ClipLoader color={"white"} size={50}/>
                        </div>
                    <Footer />
                </div>
            );
        } else {
            return (
                <div className="App background-color">
                    <Header />

                        <div className="App-header background-color">
                            <div className="chat-container">
                                
                                <div className="titleActiveUsers"> Active players </div>
                                <div className="titleMessage"> {this.state.title} </div>
                            
                                <div className="activeUsers">
                                    {this.state.playerList.map((player) => (
                                        localStorage.username !== player.username &&
                                        <div className="player" onClick={() => {
                                            this.setTitle(player);
                                            this.setState({selectedPlayer: player});
                                        }}>
                                            <div className="player-center">
                                                <text> {player.username} </text>
                                                <button
                                                    className="userBtn"
                                                    onClick={(e) => {
                                                        this.setFight(player);
                                                        this.setState({selectedPlayer: player});
                                                        e.stopPropagation();
                                                    }}
                                                >
                                                    Fight
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="messageForm">
                                    {this.state.text}
                                    <div className="messageContainer">
                                        <div className="message">
                                            <textarea
                                                className="messageInput"
                                                placeholder="Send message..."
                                                onChange={(e) => this.setProperty('message', e.target.value)}
                                            >
                                            </textarea>
                                            <button 
                                                className="messageBtn" 
                                                disabled={Object.keys(this.state.selectedPlayer).length === 0}
                                                onClick={() => this.sendMessage(this.state.selectedPlayer.username)}
                                            >
                                                Send 
                                            </button> 
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    <Footer />
                </div>
            );
        }
    }

}

export default withRouter(Chat);
