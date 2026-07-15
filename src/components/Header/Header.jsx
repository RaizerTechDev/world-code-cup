/* eslint-disable no-unused-vars */
import React from 'react';
import './Header.scss';
import bgMusic from '../../assets/audio/musica-copa.mp3';
import KickTransition from '../../components/KickTransition/KickTransition';
import { useHeader } from './useHeader';

const Header = () => {
  const {
    audioRef,
    isPlaying,
    menuOpen,
    setMenuOpen,
    showKick,
    toggleMusic,
    navigateWithKick,
    handleTransitionEnd
  } = useHeader();

  return (
    <>
      {showKick && <KickTransition onEnd={handleTransitionEnd} />}
      
      {/* A classe header--open garante que a barra do topo fique sólida */}
      <header className={`header ${menuOpen ? 'header--open' : ''}`}>
        <div className="header__container">
          <button className="header__logo-btn" onClick={() => navigateWithKick('/')}>
            <span className="header__logo">WCC<span>.</span></span>
          </button>

          <audio ref={audioRef} src={bgMusic} loop />

          <button className={`audio-control ${isPlaying ? 'playing' : ''}`} onClick={toggleMusic}>
            {isPlaying ? "🔊 MUTAR" : "🔇 OUVIR TRILHA"}
          </button>

          <button
            className={`header__toggle ${menuOpen ? 'is-active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>

          {/* O Nav mobile agora cobre 100% da visão abaixo da barra */}
          <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
            <ul>
              <li><button onClick={() => navigateWithKick('/')} className="nav-link-btn">Home</button></li>
              <li><button onClick={() => navigateWithKick('/ranking')} className="nav-link-btn">Pódio</button></li>
              <li><button onClick={() => navigateWithKick('/regulamento')} className="nav-link-btn">Regras</button></li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;