import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useKick = (initialIntro = false) => {
  const navigate = useNavigate();
  const [showKick, setShowKick] = useState(false);
  const [targetPath, setTargetPath] = useState('/');
  const [isIntroActive, setIsIntroActive] = useState(initialIntro);

  const startKick = (path) => {
    setTargetPath(path);
    setShowKick(true);
  };

  const handleTransitionEnd = () => {
    if (isIntroActive) {
      setIsIntroActive(false);
    } else {
      navigate(targetPath);
      setTimeout(() => {
        setShowKick(false);
      }, 150);
    }
  };

  return { showKick, isIntroActive, startKick, handleTransitionEnd };
};