// eslint-disable-next-line no-unused-vars
import React from 'react';
import './Card.scss';

const Card = ({ title, description, icon }) => {
  return (
    <div className="card">
      {icon && <div className="card__icon">{icon}</div>}
      <h3 className="card__title">{title}</h3>
      <p className="card__description">{description}</p>
    </div>
  );
};

export default Card;

