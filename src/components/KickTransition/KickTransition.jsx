/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import './KickTransition.scss';
import kickVideo from '../../assets/animations/kick-player.webm';

const KickTransition = ({ onEnd }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Garantia extra de que o vídeo vai dar play
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Erro ao dar play no vídeo de transição:", error);
      });
    }
  }, []);

  return (
    <div className="kick-transition">
      <div className="kick-transition__overlay">
        <video 
          ref={videoRef}
          src={kickVideo} 
          className="kick-transition__webm" 
          autoPlay 
          muted 
          playsInline
          onEnded={onEnd} // O React chama o onEnd do Header/Home assim que o vídeo acaba
        />
      </div>
    </div>
  );
};

export default KickTransition;