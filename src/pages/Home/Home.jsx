// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import './Home.scss';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/Card/Card';
import KickTransition from '../../components/KickTransition/KickTransition';

const Home = () => {
  const navigate = useNavigate();
  const [showKick, setShowKick] = useState(false);
  const [targetPath, setTargetPath] = useState('/');
  
  // 🕹️ ESTADO DA INTRO: Ativa a animação logo no primeiro carregamento do deploy
  const [isIntroActive, setIsIntroActive] = useState(true);

  // Desativa a Splash Screen inicial após o tempo do GIF terminar (ex: 1800ms)
  useEffect(() => {
    const introTimer = setTimeout(() => {
      setIsIntroActive(false);
    }, 2500);

    return () => clearTimeout(introTimer);
  }, []);

  const handleRegulamentoClick = () => {
    setTargetPath('/regulamento');
    setShowKick(true);
  };

  const handleRankingClick = (e) => {
    e.preventDefault();
    setTargetPath('/ranking');
    setShowKick(true); // Se quiser que o ranking também tenha a transição do chute!
  };

  const handleTransitionEnd = () => {
    setShowKick(false);
    navigate(targetPath);
  };

  return (
    <section className="home" id="home">
      {/* 🚀 SPLASH SCREEN INICIAL: Renderiza o jogador chutando assim que entra no deploy */}
      {isIntroActive && (
        <KickTransition onEnd={() => setIsIntroActive(false)} />
      )}

      {/* ⚽ TRANSICÃO ENTRE PÁGINAS: Continua funcionando nos cliques dos cards */}
      {showKick && !isIntroActive && (
        <KickTransition onEnd={handleTransitionEnd} />
      )}

      <div className="home__overlay"></div>

      <div className="line-field line-top"></div>
      <div className="line-field line-bottom"></div>
      <div className="stars"></div>

      <div className="home__content">
        <p className="fade-subtitle">PREPARE-SE PARA EVOLUIR!</p>

        <div className="ball-gif"></div>
        <div className="player-gif"></div>

        <div className="cards fade-cards">
          <div onClick={handleRegulamentoClick} style={{ cursor: 'pointer' }}>
            <Card title="Regulamento" description="Leia as regras oficiais." />
          </div>

          <div onClick={handleRankingClick} style={{ cursor: 'pointer' }}>
            <Card title="Ranking" description="Acompanhe sua pontuação." />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;