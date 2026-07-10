import { useKick } from '../../hooks/useKick';

export const useHome = () => {
 
  const { 
    showKick, 
    isIntroActive, 
    startKick, 
    handleTransitionEnd 
  } = useKick(true);

 const handleNavigation = (path) => {
    startKick(path);
  };

  return {
    showKick,
    isIntroActive,
    handleNavigation,
    handleTransitionEnd
  };
};