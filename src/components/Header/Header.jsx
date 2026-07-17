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
      
      {/* Camada que escurece os 20% da esquerda e fecha o menu ao clicar */}
      <div 
        className={`header__backdrop ${menuOpen ? 'header__backdrop--visible' : ''}`}
        onClick={() => setMenuOpen(false)}
      />

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
            className="header__toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menu"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>

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