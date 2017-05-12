import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Button } from 'react-bootstrap';

import { isUsernameValid } from '../../data/username';

class MessageForm extends Component {
  constructor(props){
    super(props);

    this.onMessageUpdate = this.onMessageUpdate.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onSendMessage = this.onSendMessage.bind(this);
    this.clearMessage = this.clearMessage.bind(this);

    this.state = {
      message: ''
    }
  }

  onMessageUpdate(e){
    this.setState({
      message: e.target.value
    });
  }

  onKeyPress(e){
    // Send on <enter> unless <shift-enter> has been pressed
    if (e.key === 'Enter' && !e.nativeEvent.shiftKey){
      this.onSendMessage(e);
    }
  }

  isPayloadValid(message){
    if (message && message.length > 0){
      return true;
    }
    return false;
  }

  clearMessage(){
    this.setState({
      message: ''
    });
  }

  onSendMessage(e){
    e.preventDefault();

    let { message } = this.state;
    let { username } = this.props;

    if (this.isPayloadValid(message) && isUsernameValid(username)){
      this.props.onSendMessage(message);
      this.clearMessage();
    }

  }

  render(){
    let { message } = this.state;

    return (
      <div className="message-form">
        <form role="form" className="form" onSubmit={this.onSendMessage}>
          <div>
            <Button onClick={this.onSendMessage}>
              <i className="fa fa-arrow-circle-right fa-2x"></i>
            </Button>

            <textarea
              className="form-control"
              onChange={this.onMessageUpdate}
              onKeyPress={this.onKeyPress}
              name="message"
              value={message}
              placeholder="Enter message" required></textarea>

          </div>
        </form>
      </div>
    );
  }
}

export default MessageForm;
