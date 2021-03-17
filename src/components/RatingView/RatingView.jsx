/* eslint-disable react/prop-types */
import React from 'react';
// import { Button } from 'reactstrap';
import { BsStarFill } from 'react-icons/bs';
import './RatingView.css';

const RatingView = (props) => {
  const todos = [
    {
      id: 0,
      country: [{}],
      handler: props.actionProvider.handleAnswerEndChat,
    },
    {
      id: 1,
      country: [{}, {}],
      handler: props.actionProvider.handleAnswerEndChat,
    },
    {
      id: 2,
      country: [{}, {}, {}],
      handler: props.actionProvider.handleAnswerEndChat,
    },
    {
      id: 3,
      country: [{}, {}, {}, {}],
      handler: props.actionProvider.handleAnswerEndChat,
    },
    {
      id: 4,
      country: [{}, {}, {}, {}, {}],
      handler: props.actionProvider.handleAnswerEndChat,
    },
  ];

  const renderTodos = () => {
    return todos.map((tudo) => {
      return (
        <button
          key={tudo.id}
          className="rating-widget-list-item"
          // variant="contained"
          onClick={() => tudo.handler(tudo.title)}
        >
          {tudo.country.map((item, index) => (
            <BsStarFill className="chat-rating-icon" key={index} />
          ))}
        </button>
      );
    });
  };

  return <div className="todos-widget">{renderTodos()}</div>;
};

export default RatingView;
