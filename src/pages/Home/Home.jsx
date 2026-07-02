/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './Home.scss';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card/Card';
import KickTransition from '../../components/KickTransition/KickTransition';

// Importando os novos vídeos WebM
import ballVideo from '../../assets/animations/ball.webm';
import playerVideo from '../../assets/animations/player.webm';

const Home = () => {
  const navigate = useNavigate();

  const [showKick, setShowKick] = useState(false);
  const [targetPath, setTargetPath] = useState('/');
  const [isIntroActive, setIsIntroActive] = useState(true);

  const handleRegulamentoClick = () => {
    setTargetPath('/regulamento');
    setShowKick(true);
  };

  const handleRankingClick = (e) => {
    e.preventDefault();
    setTargetPath('/ranking');
    setShowKick(true);
  };

  const handleTransitionEnd = () => {
  if (isIntroActive) {
    setIsIntroActive(false);
  } else {
    // 1. Primeiro mandamos navegar
    navigate(targetPath);

    // 2. Esperamos um tempo curtíssimo (150ms) para fechar o chute
    // Isso dá tempo da nova página "nascer" por baixo do chute
    setTimeout(() => {
      setShowKick(false);
    }, 150); 
  }
};

  return (
    <section className="home" id="home">
      {isIntroActive && <KickTransition onEnd={handleTransitionEnd} />}
      {showKick && !isIntroActive && <KickTransition onEnd={handleTransitionEnd} />}

      <div className="home__overlay"></div>

      <div className="line-field line-top"></div>
      <div className="line-field line-bottom"></div>
      <div className="stars"></div>

      <div className="home__content">
        {/* Texto atualizado conforme a dinâmica de pódio/ranking */}
        <p className="fade-subtitle">ACOMPANHE A JORNADA DAS SELEÇÕES!</p>

        {/* Substituindo as Divs de GIF por Vídeos WebM */}
        <div className="ball-container">
           <video src={ballVideo} autoPlay loop muted playsInline className="ball-webm" />
        </div>
        
        <div className="player-container">
           <video src={playerVideo} autoPlay loop muted playsInline className="player-webm" />
        </div>

        <div className="cards fade-cards">
          <div onClick={handleRegulamentoClick} style={{ cursor: 'pointer' }}>
            <Card title="Regulamento" description="Leia as regras oficiais." />
          </div>

          <div onClick={handleRankingClick} style={{ cursor: 'pointer' }}>
            <Card title="Ranking" description="Acompanhe a pontuação." />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;