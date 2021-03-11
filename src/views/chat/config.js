/* eslint-disable react/display-name */
import React from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';
import BotAvatar from '../../components/BotAvatar/BotAvatar';
import Todos from '../../components/Todos/Todos';

const config = {
  initialMessages: [createChatBotMessage(`Hi, What's your name?`)],
  botName: 'T',
  customComponents: {
    botAvatar: (props) => <BotAvatar {...props} />,
  },
  widgets: [
    {
      widgetName: 'todos',
      widgetFunc: (props) => <Todos {...props} />,
      mapStateToProps: ['todos'],
    },
  ],
};

export default config;
