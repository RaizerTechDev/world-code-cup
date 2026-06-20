import React, { createContext, useState, useEffect } from 'react';

// Criando o contexto
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  // Aplica a classe no <html> sempre que o tema mudar
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  // Alterna entre light e dark
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
