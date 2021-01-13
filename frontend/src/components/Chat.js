import React from 'react';
import { withRouter, Link } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import '../styles/Chat.css';
import ClipLoader from "react-spinners/ClipLoader";
import { clearInterval } from 'stompjs';
import { toast } from 'react-toastify';

let message = "";
let selectedPlayer = {};
let sentMessages = [];
let savedConversation = [];

class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            playerList: [],
            message: message,
            sentMessages: sentMessages,
            selectedPlayer: selectedPlayer,
            conversation: savedConversation,
            stompClient: {}
        }
        this.setConversation = this.setConversation.bind(this);
        this.setConversation();
    }

    setConversation() {
        let filteredReceivedMessages = this.props.receivedMessages.filter(msg => {
            return msg.from === this.state.selectedPlayer.username;
        });

        let filteredSentMessages = this.state.sentMessages.filter(msg => {
            return msg.to === this.state.selectedPlayer.username;
        })

        let conversation = filteredReceivedMessages.concat(filteredSentMessages);

        conversation.sort((a, b) => {
            if (a.time < b.time) {
                return -1;
            } else if (a.time > b.time) {
                return 1;
            } else {
                return 0;
            }
        });

        this.setState({
            conversation: conversation
        });

        savedConversation = conversation;
    }

    setProperty(property, val) {
        this.setState({
            [property]: val
        })
    }

    sendMessage(message, request) {
        let date = new Date();
        let time = date.getHours().toString().padStart(2, '0');
        time += ":" + date.getMinutes().toString().padStart(2, '0');
        time += ":" + date.getSeconds().toString().padStart(2, '0');
        time += "." + date.getMilliseconds().toString().padStart(3, '0');

        let sentMessage = {
            from: localStorage.username,
            to: this.state.selectedPlayer.username,
            message: message,
            time: time,
            request: request
        };

        this.setState({
            sentMessages: this.state.sentMessages.concat(sentMessage)
        });

        sentMessages.push(sentMessage);

        this.props.stompClient.send('/app/message', {}, JSON.stringify(sentMessage));

        this.setState({
            conversation: this.state.conversation.concat(sentMessage)
        });
    };

    acceptRequest() {
        let fightMessage = {
            player: localStorage.username,
            opponent: this.state.selectedPlayer.username
        };

        this.props.stompClient.send('/app/play', {}, JSON.stringify(fightMessage));
    }

    sendRequest() {
        this.sendMessage("", true);
        this.setConversation();

        let fightMessage = {
            player: localStorage.username,
            opponent: this.state.selectedPlayer.username
        };

        this.props.stompClient.send('/app/play', {}, JSON.stringify(fightMessage));
    }

    async getActivePlayers() {
        try {
            let res = await fetch('/api/active');
            let result = await res.json();
  
            if (result) {
                result.sort((a, b) => {
                    if (a.username < b.username) {
                        return -1;
                    } else if (a.username > b.username) {
                        return 1;
                    } else {
                        return 0;
                    }
                });

                this.setState({
                    playerList: result
                });
  
                if (result.length <= 1 || 
                    !result.some(player => player.username === this.state.selectedPlayer.username)) {

                    selectedPlayer = {};
                    message = "";
                    this.setState({ 
                        selectedPlayer: {},
                        message: ""
                    });
                }
            }
        } catch (e) {
            // ignore
        }
  
        this.setConversation();
    }
    
    async componentDidMount() {
        await this.getActivePlayers();
        this.interval = setInterval(() => this.getActivePlayers(), 10000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
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
                                <div className="titleMessage"> {this.state.selectedPlayer.username} </div>
                            
                                <div className="activeUsers">
                                    {this.state.playerList.map((player) => (
                                        localStorage.username !== player.username &&
                                        <div className="player" onClick={() => {
                                            this.setState({selectedPlayer: player}, () => {
                                                this.setConversation();
                                            });
                                            selectedPlayer = player;
                                        }}>
                                            <div className="player-center">
                                                <text> {player.username} </text>
                                                <Link to={`/profile/${player.username}`} className="userBtn">Profile</Link>
                                                {this.state.selectedPlayer.username === player.username &&
                                                    <Link to="/fight" className="userBtn" onClick={(e) => {
                                                        this.sendRequest();
                                                        e.stopPropagation();
                                                    }}>
                                                        Fight
                                                    </Link>
                                                }
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="messageForm">
                                    <div style={{ height: "400px", overflowY: "scroll" }}>
                                        {this.state.conversation.map(msg => {
                                            let color = msg.from === localStorage.username ? "green" : "red";
                                            let align = msg.from === localStorage.username ? "right" : "left";
                                            if (msg.request) {
                                                if (msg.from === localStorage.username) {
                                                    return (
                                                        <div>
                                                            <p style={{ color: color, textAlign: align }}>{msg.from}</p>
                                                            <p style={{ whiteSpace: "pre-line", textAlign: align }}>You have sent a fight request.</p>
                                                            <p style={{ textAlign: align }}>{msg.time.substring(0, 5)}</p>
                                                        </div>
                                                    );
                                                } else {
                                                    return (
                                                        <div>
                                                            <p style={{ color: color, textAlign: align }}>{msg.from}</p>
                                                            <p style={{ whiteSpace: "pre-line", textAlign: align }}>New fight request.</p>
                                                            <Link to="/fight" className="messageBtn" onClick={() => this.acceptRequest()} >Accept</Link>
                                                            <p style={{ textAlign: align }}>{msg.time.substring(0, 5)}</p>
                                                        </div>
                                                    );
                                                }
                                            } else {
                                                return (
                                                    <div>
                                                        <p style={{ color: color, textAlign: align }}>{msg.from}</p>
                                                        <p style={{ whiteSpace: "pre-line", textAlign: align }}>{msg.message}</p>
                                                        <p style={{ textAlign: align }}>{msg.time.substring(0, 5)}</p>
                                                    </div>
                                                );
                                            }
                                        })}
                                    </div>
                                    <div >
                                        <div className="message">
                                            <textarea
                                                className="messageInput"
                                                placeholder="Send message..."
                                                disabled={Object.keys(this.state.selectedPlayer).length == 0}
                                                onChange={(e) => { 
                                                    this.setProperty('message', e.target.value);
                                                    message = e.target.value;
                                                }}
                                                value={this.state.message}
                                            >
                                            </textarea>
                                            <button 
                                                className="messageBtn" 
                                                disabled={Object.keys(this.state.selectedPlayer).length == 0 ||
                                                    this.state.message.trim() === ""}
                                                onClick={() => { 
                                                    this.sendMessage(this.state.message); 
                                                    this.setState({message: ""});
                                                    message = ""; 
                                                }}
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
