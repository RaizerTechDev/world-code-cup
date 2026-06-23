// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import './Home.scss';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/Card/Card';
import KickTransition from '../../components/KickTransition/KickTransition';

const Home = () => {
  const navigate = useNavigate();
  const [showKick, setShowKick] = useState(false);
  const [targetPath, setTargetPath] = useState('/');

  const handleRegulamentoClick = () => {
    setTargetPath('/regulamento');
    setShowKick(true);
  };

  const handleRankingClick = () => {
    navigate('/ranking');
  };

  const handleTransitionEnd = () => {
    setShowKick(false);
    navigate(targetPath);
  };

  return (
    <section className="home" id="home">
      <div className="home__overlay"></div>

      <div className="line-field line-top"></div>
      <div className="line-field line-bottom"></div>
      <div className="stars"></div>

      {showKick && <KickTransition onEnd={handleTransitionEnd} />}

      <div className="home__content">
        <p className="fade-subtitle">PREPARE-SE PARA EVOLUIR!</p>

        <div className="ball-gif"></div>
        <div className="player-gif"></div>

        <div className="cards fade-cards">
          <div onClick={handleRegulamentoClick} style={{ cursor: 'pointer' }}>
            <Card title="Regulamento" description="Leia as regras oficiais." />
          </div>

          <Link to="/ranking" style={{ textDecoration: 'none' }} onClick={handleRankingClick}>
            <Card title="Ranking" description="Acompanhe sua pontuação." />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;