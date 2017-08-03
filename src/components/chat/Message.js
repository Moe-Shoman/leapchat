import React, { Component } from 'react';
import emoji from '../../utils/emoji_convertor';
import md from '../../utils/link_attr_blank';

class Message extends Component {
  render(){
    let { message, username } = this.props;
    let fromMe = message.from === username;
    let messageClass = fromMe ? 'chat-outgoing' : 'chat-incoming';
    let spaced = message.msg.replace(/:(\w+):/g, ':$1: ');
    let emojified = emoji.replace_colons(spaced);
    let linked = md.renderInline(emojified);
    return (
      <li className={'chat-message ' + messageClass} key={message.key}>
        <span className="username">{message.from}</span>
          <div dangerouslySetInnerHTML={{__html: linked}}>
          </div>
      </li>
    );
  }
}

export default Message;
