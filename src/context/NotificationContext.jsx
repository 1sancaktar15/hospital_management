import React, { createContext, useState, useContext } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  const showNotification = (message, type = 'info', duration = 3000) => {
    // Önceki bildirimi temizle
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    // Yeni bildirimi göster
    setNotification({ message, type });
    
    // Otomatik kapanma
    const id = setTimeout(() => {
      setNotification(null);
    }, duration);
    
    setTimeoutId(id);
  };

  const hideNotification = () => {
    setNotification(null);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  return (
    <NotificationContext.Provider value={{ 
      notification, 
      showNotification, 
      hideNotification 
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);