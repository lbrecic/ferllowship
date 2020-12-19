import React, {Component, Fragment  } from "react";
import DisplayConversation from './DisplayConversation'
import MesssagingBox from './MessagingBox'

class MessagingPanel extends Component{
    state = {
        messages: [],
        username: ""
    }

    async componentDidMount() {        
        try {
            let res = await fetch('/api/player?username=' + localStorage.username);
            let result = await res.json();
    
            if (result && !result.error) {
                this.setState({
                username: result.username,
                });
            }
        } catch (e) {}
        this.connection.onmessage = (message) => {
            console.log(message)
        }
    }

    connection = new WebSocket('ws://localhost:9090')

    getMessage = (message) => {
        //this.setState({messages: [...this.state.messages, message]})
        const data = {username: this.state.username, message: message}

        this.connection.send(JSON.stringify(data))
    }

    render(){
        return(
            <Fragment>
                <DisplayConversation/>
                <MesssagingBox getMessage={this.getMessage}/>
            </Fragment>
        )
    }
}

export default MessagingPanel;