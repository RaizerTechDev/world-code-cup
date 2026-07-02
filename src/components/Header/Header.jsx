// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.scss';
import bgMusic from '../../assets/audio/musica-copa.mp3';
import KickTransition from '../../components/KickTransition/KickTransition';

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Estados para gerenciar a transição do chute no Header
  const [showKick, setShowKick] = useState(false);
  const [targetPath, setTargetPath] = useState('/');
   // No Header, geralmente começamos com false, pois a Intro acontece na Home
  const [isIntroActive, setIsIntroActive] = useState(false); 

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((error) => {
          console.log("O navegador bloqueou o autoplay. Aguardando clique do usuário:", error);
        });
    }
  }, []);

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

  // Intercepta a navegação para rodar o chute primeiro
  const handleNavigation = (path) => {
    setMenuOpen(false); // Fecha o menu mobile
    setTargetPath(path);
    setShowKick(true);
  };

 const handleTransitionEnd = () => {
    if (isIntroActive) {
      setIsIntroActive(false);
    } else {
      // 1. Primeiro mandamos mudar a página (o chute ainda está na tela cobrindo tudo)
      navigate(targetPath);

      // 2. Esperamos 150ms. Esse tempo é o "segredo" para o navegador 
      // renderizar o fundo da nova página antes de tirarmos a cortina.
      setTimeout(() => {
        setShowKick(false);
      }, 150); 
    }
  };

  return (
    <>
      {/* Renderiza a animação globalmente quando ativada pelo cabeçalho */}
 {showKick && (
        <KickTransition onEnd={handleTransitionEnd} />
      )}
      
      <header className="header">
        <div className="header__container">
          <button 
            className="header__logo-btn" 
            onClick={() => handleNavigation('/')}
            aria-label="World Code Cup Home"
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
          >
            <span className="header__logo">WCC<span>.</span></span>
          </button>

          <audio ref={audioRef} src={bgMusic} loop />

          <button className={`audio-control ${isPlaying ? 'playing' : ''}`} onClick={toggleMusic}>
            {isPlaying ? <span>🔊 MUTAR</span> : <span>🔇 OUVIR TRILHA</span>}
          </button>

          <button
            className={`header__toggle ${menuOpen ? 'is-active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menu de navegação"
            aria-expanded={menuOpen}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>

          <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
            <ul>
              <li>
                <button onClick={() => handleNavigation('/')} className="nav-link-btn">Home</button>
              </li>
              <li>
                <button onClick={() => handleNavigation('/ranking')} className="nav-link-btn">Ranking</button>
              </li>
              <li>
                <button onClick={() => handleNavigation('/regulamento')} className="nav-link-btn">Regras</button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;