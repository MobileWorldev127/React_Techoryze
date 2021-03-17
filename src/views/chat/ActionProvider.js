import apiCall from '../../libs/apiCall';
import ApiConstants from '../../api/ApiConstants';

class ActionProvider {
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

  handleAnswerEnvironment = (val) => {
    const message = this.createClientMessage(val, {
      withAvatar: true,
    });
    this.addMessageToBotState(message);
    const message1 = this.createChatBotMessage(`What's the problem?`, {
      withAvatar: true,
    });
    this.addMessageToBotState(message1);
    apiCall(
      ApiConstants.UPDATE_CONVERSATION,
      {
        key: 'environment',
        value: val,
      },
      'POST'
    );
  };

  handleWorries = () => {
    const message = this.createChatBotMessage(
      `No worries. Connecting you to an expert...`,
      {
        withAvatar: true,
      }
    );
    this.addMessageToBotState(message);
    apiCall(ApiConstants.GET_CONVERSATION, 'GET').then((json) => {
      const message1 = this.createChatBotMessage(
        `You are connected to ${json.data[0].expert}`,
        {
          withAvatar: true,
        }
      );
      this.addMessageToBotState(message1);
    });
  };

  realTimeMessage = (data) => {
    if (data.sender === '6047cb45047eabf185e8be83') {
      const message = this.createChatBotMessage(`${data.text}`, {
        withAvatar: true,
      });
      this.addMessageToBotState(message);
    }
  };

  handleEndChat = () => {
    const message = this.createChatBotMessage('Do you want to end the chat?', {
      widget: 'endChatView',
    });
    this.addMessageToBotState(message);
  };

  handleAnswerEndChat = (val) => {
    const message = this.createClientMessage(val, {
      withAvatar: true,
    });
    this.addMessageToBotState(message);
    if (val === 'Yes') {
      apiCall(ApiConstants.GET_CONVERSATION, 'GET').then((json) => {
        const message1 = this.createChatBotMessage(
          `OK. How did ${json.data[0].expert} do?`,
          {
            widget: 'ratingView',
          }
        );
        this.addMessageToBotState(message1);
      });
    } else {
      apiCall(ApiConstants.GET_CONVERSATION, 'GET').then((json) => {
        const message1 = this.createChatBotMessage(
          `Ok. ${json.data[0].expert} is still here.`,
          {
            withAvatar: true,
          }
        );
        this.addMessageToBotState(message1);
      });
    }
  };

  addMessageToBotState = (messages) => {
    if (Array.isArray(messages)) {
      this.setState((state) => ({
        ...state,
        messages: [...state.messages, ...messages],
      }));
    } else {
      this.setState((state) => {
        const lastMessage = state.messages[state.messages.length - 1];
        if (lastMessage.message !== messages.message) {
          return {
            ...state,
            messages: [...state.messages, messages],
          };
        } else {
          return state;
        }
      });
    }
  };
}

export default ActionProvider;
