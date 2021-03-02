import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
// import { isPending, needsLoading, hasFailed } from '../../libs/state';
// import Header from '../../components/Header';
import Chatbot from 'react-chatbot-kit';
// import messageParser from '../../components/MessageParser/MessageParser';
// import actionProvider from './ActionProvider';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import config from './config';

const Main = () => {
  const dispatch = useDispatch();
  const [toggleBot, setToggleBot] = useState(false);

  useEffect(() => {
    // dispatch(getWeatherForcast({ city: 'London' }));
  }, [dispatch]);

  const saveMessages = (messages) => {
    localStorage.setItem('chat_messages', JSON.stringify(messages));
  };

  const loadMessages = () => {
    const messages = JSON.parse(localStorage.getItem('chat_messages'));
    return messages;
  };

  return (
    <Chatbot
      config={config}
      // messageHistory={loadMessages()}
      messageParser={MessageParser}
      saveMessages={saveMessages}
      actionProvider={ActionProvider}
    />
  );
};

export default Main;
