// src/components/KickTransition/KickTransition.jsx
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import './KickTransition.scss';
import kickGif from '../../assets/animations/kick-player.gif';

const KickTransition = ({ onEnd }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onEnd) onEnd();
    }, 1800);

    return () => clearTimeout(timer);
  }, [onEnd]);

  return (
    <div className="kick-transition">
      <div className="kick-transition__overlay">
        <img src={kickGif} alt="Jogador chutando a bola" className="kick-transition__gif" />
      </div>
    </div>
  );
};

export default KickTransition;