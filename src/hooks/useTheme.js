import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

// Hook customizado para consumir o tema
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme deve ser usado dentro de ThemeProvider');
  }

  return context; // retorna { theme, toggleTheme }
};
