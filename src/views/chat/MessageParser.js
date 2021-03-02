class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    console.log(this.state);
    const lowercase = message.toLowerCase();

    if (this.state.messages.length === 1) {
      this.actionProvider.handleEnvironment();
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
    }
  }
}

export default MessageParser;
