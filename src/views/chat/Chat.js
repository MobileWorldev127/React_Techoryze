import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Chatbot from 'react-chatbot-kit';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import config from './config';
import axios from 'axios';

import socketIOClient from 'socket.io-client';
const ENDPOINT = 'https://techoryze-node-deploy.herokuapp.com';
const socket = socketIOClient(ENDPOINT);

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
    socket.emit('join', {
      user: '6047cb45047eabf185e8be81',
      receiver: '6047cb45047eabf185e8be83',
    });
  }, [dispatch]);

  return (
    <Chatbot
      config={config}
      // messageHistory={loadMessages()}
      messageParser={MessageParser}
      // saveMessages={saveMessages}
      actionProvider={ActionProvider}
      headerText="User"
    />
  );
};

export default Main;
