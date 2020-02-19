import React from "react";
import {Socket} from "phoenix"

export default class Greeter extends React.Component {

  constructor() {
    super()
    this.messages = [];
  }

  sendMessage() {
    this.channel.push('shout', {name: 'test', message: 'test message'});
  }

  render() {
      let content = this.messages.map(payload => {
        <div>{payload.name}: {payload.message}</div>
      })
      console.log('wefweffew');
      return (<div>
        <div id='message-list' className='row'>
          {content}
        </div>

        <div className='row form-group'>
          <div className='col-md-3'>
            <input type='text' id='name' className='form-control' placeholder='Name' />
          </div>
          <div className='col-md-9'>
            <input type='text' id='message' className='form-control' placeholder='Message' />
          </div>
          <button type="button" onClick={this.sendMessage.bind(this)}>Send</button>
        </div>
      </div>)
  }

  componentDidMount() {

    let socket = new Socket("/socket", {params: {token: window.userToken}})

    socket.connect()

    this.socket = socket;

    // Now that you are connected, you can join channels with a topic:
    let channel = socket.channel("chat_room:lobby", {})

    this.channel = channel;

  //   let list = $('#message-list');
  //   let message = $('#message');
  //   let name = $('#name');

    // message.on('keypress', event => {
      // if (event.keyCode == 13) {
      //   channel.push('shout', {name: name.val(), message: message.val()});
      //   message.val('');
      // }
    // });

    channel.on('shout', payload => {
      console.log('herere', payload)
      this.messages.push(payload);
      // list.append(`<b>${payload.name || 'Anonymous'}:</b> ${payload.message}<br>`);
      // list.prop({scrollTop: list.prop('scrollHeight')});
    });

    channel
      .join()
      .receive('ok', resp => {
        console.log('Joined successfully', resp);
      })
      .receive('error', resp => {
        console.log('Unable to join', resp);
      });
  }
}
