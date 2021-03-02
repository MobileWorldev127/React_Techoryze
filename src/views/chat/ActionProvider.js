class ActionProvider {
  // The action provider receives createChatBotMessage which you can use to define the bots response, and
  // the setState function that allows for manipulating the bots internal state.
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  handleEnvironment = () => {
    const message = this.createChatBotMessage('What environment?', {
      widget: 'todos',
    });
    this.addMessageToBotState(message);
  };

  handleProblem = () => {
    const message = this.createChatBotMessage('What`s the problem?', {
      withAvatar: true,
    });
    this.addMessageToBotState(message);
  };

  handleAnswerEnvironment = (val) => {
    const message = this.createClientMessage(val, {
      withAvatar: true,
    });
    this.addMessageToBotState(message);
    const message1 = this.createChatBotMessage(`What's the problem?`, {
      withAvatar: true,
    });
    this.addMessageToBotState(message1);
  };

  handleWorries = () => {
    const message = this.createChatBotMessage(
      `No worries. Connecting you to an expert...`,
      {
        withAvatar: true,
      }
    );
    this.addMessageToBotState(message);
    const message1 = this.createChatBotMessage(`You are connected to [Name2]`, {
      withAvatar: true,
    });
    this.addMessageToBotState(message1);
  };

  addMessageToBotState = (messages) => {
    if (Array.isArray(messages)) {
      this.setState((state) => ({
        ...state,
        messages: [...state.messages, ...messages],
      }));
    } else {
      this.setState((state) => ({
        ...state,
        messages: [...state.messages, messages],
      }));
    }
  };
}

export default ActionProvider;
