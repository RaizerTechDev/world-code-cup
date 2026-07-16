import { useState, useEffect, useRef } from 'react';
import { useKick } from '../../hooks/useKick';

export const useHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  
  // Importamos a lógica do chute (sem intro ativa para o Header)
  const { showKick, startKick, handleTransitionEnd } = useKick(false);

  // --- LÓGICA PARA CONGELAR O SCROLL ---
  useEffect(() => {
    if (menuOpen) {
      // Quando o menu abre, trava o scroll
      document.body.style.overflow = 'hidden';
      // No iOS Safari, as vezes é necessário travar o toque também:
      document.body.style.touchAction = 'none'; 
    } else {
      // Quando o menu fecha, libera o scroll
      document.body.style.overflow = 'unset';
      document.body.style.touchAction = 'auto';
    }

    // Função de limpeza: garante que se o componente for desmontado, 
    // a página não fique travada para sempre.
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.touchAction = 'auto';
    };
  }, [menuOpen]);

  // --- CONTROLE DE ÁUDIO ---
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => console.log("Autoplay bloqueado. Aguardando interação."));
    }
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.pause() : audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  // --- NAVEGAÇÃO ---
  const navigateWithKick = (path) => {
    // Ao clicar em um link, liberamos o scroll antes de mudar de página
    document.body.style.overflow = 'unset';
    setMenuOpen(false); 
    startKick(path);
  };

  return {
    audioRef,
    isPlaying,
    menuOpen,
    setMenuOpen,
    showKick,
    toggleMusic,
    navigateWithKick,
    handleTransitionEnd
  };
};