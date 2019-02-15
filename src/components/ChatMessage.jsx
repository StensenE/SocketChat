import React, { Component } from "react";

export default class ChatMessage extends Component {
  render() {
    const {message} = this.props;
    return (
      <>
        <p><b>{message.username}: </b> {message.text}</p>
      </>
    );
  }
}
