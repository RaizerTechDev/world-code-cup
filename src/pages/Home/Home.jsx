/* eslint-disable no-unused-vars */
import React from 'react';
import { useHome } from './useHome';
import Card from '../../components/Card/Card';
import KickTransition from '../../components/KickTransition/KickTransition';
import ballVideo from '../../assets/animations/ball.webm';
import playerVideo from '../../assets/animations/player.webm';
import './Home.scss';

const Home = () => {
  const { showKick, isIntroActive, handleNavigation, handleTransitionEnd } = useHome();

  return (
    <section className="home" id="home">
      {isIntroActive && <KickTransition onEnd={handleTransitionEnd} />}
      {showKick && !isIntroActive && <KickTransition onEnd={handleTransitionEnd} />}

      <div className="home__overlay"></div>

      {/* Traços e Linhas do Campo */}
      <div className="line-field line-top"></div>
      <div className="line-field line-bottom"></div>
      
      {/* Efeito de Estrelas */}
      <div className="stars"></div>

      <div className="home__content">
        <p className="fade-subtitle">ACOMPANHE A JORNADA DAS SELEÇÕES!</p>

        <div className="ball-container">
           <video src={ballVideo} autoPlay loop muted playsInline className="ball-webm" />
        </div>
        
        <div className="player-container">
           <video src={playerVideo} autoPlay loop muted playsInline className="player-webm" />
        </div>

        <div className="cards fade-cards">
          <div onClick={() => handleNavigation('/regulamento')} style={{ cursor: 'pointer' }}>
            <Card title="Regulamento" description="Leia as regras oficiais." />
          </div>

          <div onClick={() => handleNavigation('/ranking')} style={{ cursor: 'pointer' }}>
  <Card 
    title="Pódio Interativo" 
    description="Defina os campeões e ajuste o desempenho das seleções." 
  />
</div>
        </div>
      </div>
    </section>
  );
};

export default Home;