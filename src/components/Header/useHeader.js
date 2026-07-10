import { useState, useEffect, useRef } from 'react';
import { useKick } from '../../hooks/useKick';

export const useHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  
  // Importamos a lógica do chute (sem intro ativa para o Header)
  const { showKick, startKick, handleTransitionEnd } = useKick(false);

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

  const navigateWithKick = (path) => {
    setMenuOpen(false); // Fecha menu mobile ao clicar
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