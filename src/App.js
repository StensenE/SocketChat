import React, { Component } from "react";
import io from "socket.io-client";
import ChatMessage from "./components/ChatMessage";
import SystemMessage from "./components/SystemMessage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      messages: [],
      username: "",
      socket: ""
    };
  }

  componentDidMount = () => {
    let socket = io("http://localhost:8080");
    this.setState({ socket });
    socket.on("AssignUsername", username => {
      this.setState({ username });
    });
    socket.on("MessageReceived", message => {
      this.setState({ messages: [...this.state.messages, message] });
    });
    socket.on("UserConnected", username => {
      this.setState({
        messages: [
          ...this.state.messages,
          { username: "*", text: `${username} joined the chat` }
        ]
      });
    });
  };

  handleChange(message) {
    this.setState({ message });
  }

  submitMessage() {
    this.state.socket.emit("MessageSent", {
      username: this.state.username,
      text: this.state.message
    });
    this.setState({
      message: ""
    });
  }

  render() {
    const { messages } = this.state;
    return (
      <div>
        {messages.map((message, i) => {
          const { username, text } = message;
          if (username === "*") {
            return <SystemMessage message={message} key={i}/>;
          } else if (message.username === this.state.username) {
            let msg = {
              username: "Me",
              text
            };
            return <ChatMessage message={msg} key={i} />;
          } else {
            return <ChatMessage message={message} key={i} />;
          }
        })}
        <input
          type="text"
          value={this.state.message}
          onChange={e => this.handleChange(e.target.value)}
        />
        <input type="button" onClick={this.submitMessage.bind(this)} value="Send" />
      </div>
    );
  }
}

export default App;
