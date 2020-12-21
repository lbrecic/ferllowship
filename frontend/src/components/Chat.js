import React from 'react';
import Header from './Header';
import Footer from './Footer';
import '../styles/Chat.css'

class Chat extends React.Component {
    state = {
        playerList: [],
        title: "",
        text: ""
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
        }
    }

render(){
    return (
        
        <div className="App background-color">
            <Header />
                <div className="App-header background-color">
                    <div className="chat-container">
                        
                        <div className="titleActiveUsers">
                            Igraci
                        </div>
                        <div className="titleMessage">
                            {this.state.title}
                        </div>
                    
                        <div className="activeUsers ">
                            {this.state.playerList.map((player) => (
                                
                                    <div className="player">
                                        <div className="player-center">
                                            <text  onClick={() => this.setTitle(player)} >
                                                {player.username}
                                            </text>
                                            <button className="userBtn" onClick={() => this.setFight(player)}>
                                                Borba
                                            </button>
                                        </div>
                                    </div>
                                
                            ))}
                            
                        </div>
                        <div className="messageForm">
                        {this.state.text}
                            <div className="messageContainer">
                                
                                <div className="message">
                                    <input className="messageInput"
                                    placeholder="Posalji poruku...">
                                    </input>
                                    <button className="messageBtn">
                                        Posalji
                                    </button>
                                </div>
                                
                            </div>
                        </div>
                        
                    </div>
                </div>
            <Footer />
        </div>      
    );}
}

export default Chat;