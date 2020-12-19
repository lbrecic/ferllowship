import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import './pokusaj.css'

class Chat extends React.Component {
    state = {
        playerList: ["Igrac1", "Igrac2"],
        title: "",
        text: ""
    }

    setTitle(player){
        this.setState({
            title: player,
            text: "Ovo je text"
        });
    }

    setFight(player){
        this.setState({
            title: player + "-borba",
            text: "ovo je borba"
        });
    }

    /*
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
*/
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
                                                {player}
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

                 /*
        
            <div id="chat-container">
                <div id="search-container">
                    <input type="text" placeholder="Search" />
                </div>
                <div id="conversation-list">

                </div>
                <div id="new-message-container">
                    <a href="#">+</a>
                </div>
                <div id="chat-title">

                </div>
                <div id="chat-message-list">

                </div>
                <div id="chat-form">

                </div>

            </div>
            
*/
        
            
    );}
}

export default Chat;