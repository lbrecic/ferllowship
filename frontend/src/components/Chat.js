import React from 'react';
import Header from './Header';
import Footer from './Footer';
import '../styles/Chat.css';
import { toast } from 'react-toastify';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            playerList: [],
            title: "",
            text: "",
            message: "",
            selectedPlayer: {},
            stompClient: {},
            connected: false
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
        this.state.stompClient.send('/app/message', {}, JSON.stringify({
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

        toast(<div> Connecting... <br /> Try to refresh page if this takes too long. </div>, { autoClose: false });

        let socket = new SockJS('/api/chat');
        let stompClient = Stomp.over(socket);

        stompClient.connect({}, frame => {
            toast.dismiss();
            toast("Connected.");

            stompClient.subscribe('/user/queue/reply', function (msgOut) {
                console.log(msgOut.body);
            });

            this.setState({
                connected: true,
                stompClient: stompClient
            });
        });
    }

    render() {
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
                                            disabled={!this.state.connected || Object.keys(this.state.selectedPlayer).length == 0}
                                            placeholder="Send message..."
                                            onChange={(e) => this.setProperty('message', e.target.value)}
                                        >
                                        </textarea>
                                        <button 
                                            className="messageBtn" 
                                            disabled={!this.state.connected || Object.keys(this.state.selectedPlayer).length == 0}
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

export default Chat;
