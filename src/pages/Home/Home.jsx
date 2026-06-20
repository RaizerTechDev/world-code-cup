// eslint-disable-next-line no-unused-vars
import React from 'react';
import './Home.scss';
import Card from '../../components/Card/Card';

const Home = () => {
  return (
    <section className="home" id="home">
      <div className="home__overlay"></div>
      
      <div className="line-field line-top"></div>
       <div className="line-field line-bottom"></div>

             <div className="stars"></div>

      <div className="home__content">
        
        <p className="fade-subtitle">PREPARE-SE PARA EVOLUIR!</p>

        {/* GIFs movidos para dentro do bloco de conteúdo */}
        <div className="ball-gif"></div>
        <div className="player-gif"></div>

        <div className="cards fade-cards">
          <Card title="Regulamento" description="Leia as regras oficiais." />
          <Card title="Ranking" description="Acompanhe sua pontuação." />
        </div>
      </div>
    </section>
  );
};

export default Home;