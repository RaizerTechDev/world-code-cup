// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

import bgMusic from '../../assets/audio/musica-copa.mp3';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Tentativa de tocar assim que a página monta
  useEffect(() => {
    if (audioRef.current) {
      // Alguns navegadores permitem áudio automático se o usuário já interagiu com o domínio antes
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.log("O navegador bloqueou o autoplay. Aguardando clique do usuário:", error);
        });
    }
  }, []);

  // Função para alternar o som (Play / Pause)
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <header className="header">
      <div className="header__container">
        <a href="#home" className="header__logo" aria-label="World Code Cup Home">
          WCC<span>.</span>
        </a>
                
      {/* Elemento de Áudio invisível do HTML5 */}
      <audio ref={audioRef} src={bgMusic} loop />

      {/* 🔧 Botão de controle Flutuante de Som Cyberpunk */}
      <button className={`audio-control ${isPlaying ? 'playing' : ''}`} onClick={toggleMusic}>
        {isPlaying ? (
          <span>🔊 MUTAR</span>
        ) : (
          <span>🔇 OUVIR TRILHA</span>
        )}
      </button>



        {/* Botão de Menu para Acessibilidade e Mobile */}
        <button 
          className={`header__toggle ${menuOpen ? 'is-active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menu de navegação"
          aria-expanded={menuOpen}
        >
          {/* Ícone de menu */}
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
          <ul>
            <li><a href="#home" onClick={() => setMenuOpen(false)}>Home</a></li>
            <li><a href="#ranking" onClick={() => setMenuOpen(false)}>Ranking</a></li>
            <li><a href="#regras" onClick={() => setMenuOpen(false)}>Regras</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

