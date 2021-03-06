import axios from 'axios';

class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  async parse(message) {
    console.log(this.state);
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
  }
}

export default MessageParser;
