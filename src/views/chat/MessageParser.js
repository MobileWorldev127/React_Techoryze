import axios from 'axios';
import socketIOClient from 'socket.io-client';
const ENDPOINT = 'https://techoryze-node-deploy.herokuapp.com';

class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  async parse(message) {
    console.log(this.state);
    const socket = socketIOClient(ENDPOINT);

    socket.on('incomingMessage', (data) => {
      console.log('---', data);
      this.actionProvider.realTimeMessage(data);
    });

    const lowercase = message.toLowerCase();
    if (this.state.messages.length === 1) {
      this.actionProvider.handleEnvironment(message);
      axios
        .post(
          'https://techoryze-node-deploy.herokuapp.com/conversation/update_conversation',
          {
            key: 'user',
            value: message,
          }
        )
        .then((json) => {
          console.log('success', json.data);
        })
        .catch((error) => {
          console.log('errror', error);
        });
    }

    if (
      lowercase.includes('google') ||
      lowercase.includes('apple') ||
      lowercase.includes('microsoft')
    ) {
      this.actionProvider.handleProblem();
    }

    if (this.state.messages.length === 5) {
      this.actionProvider.handleWorries();
      axios
        .post(
          'https://techoryze-node-deploy.herokuapp.com/conversation/update_conversation',
          {
            key: 'problem',
            value: message,
          }
        )
        .then((json) => {
          console.log('success', json.data);
        })
        .catch((error) => {
          console.log('errror', error);
        });
    }

    if (this.state.messages.length > 7) {
      socket.emit('message', {
        text: message,
        sender: '6047cb45047eabf185e8be81',
        receiver: '6047cb45047eabf185e8be83',
      });
    }
  }
}

export default MessageParser;
