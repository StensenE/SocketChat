import React, { Component } from "react";

export default class SystemMessage extends Component {
  render() {
    const {message} = this.props;
    return (
      <>
        <p><i>{message.username} {message.text}</i></p>
      </>
    );
  }
}
