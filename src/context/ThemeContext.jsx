import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  // İlk yüklemede localStorage'dan tema bilgisi kontrolü
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedTheme);
    if (savedTheme) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // darkMode değiştiğinde HTML'deki sınıfı ekle/kaldır
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
