import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Chatbot from 'react-chatbot-kit';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import config from './config';
import axios from 'axios';

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .post(
        'https://techoryze-node-deploy.herokuapp.com/conversation/create_conversation',
        {
          userName: '',
        }
      )
      .then((json) => {
        console.log('success', json.data);
      })
      .catch((error) => {
        console.log('errror', error);
      });
  }, [dispatch]);

  // const saveMessages = (messages) => {
  //   localStorage.setItem('chat_messages', JSON.stringify(messages));
  // };

  // const loadMessages = () => {
  //   const messages = JSON.parse(localStorage.getItem('chat_messages'));
  //   return messages;
  // };

  return (
    <Chatbot
      config={config}
      // messageHistory={loadMessages()}
      messageParser={MessageParser}
      // saveMessages={saveMessages}
      actionProvider={ActionProvider}
    />
  );
};

export default Main;
