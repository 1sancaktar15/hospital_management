import React, { useContext } from 'react';
import { NotificationContext } from '../context/NotificationContext';
import { FaCheckCircle, FaExclamationTriangle, FaTimes } from 'react-icons/fa';

const Notification = () => {
  const { notification, hideNotification } = useContext(NotificationContext);

  if (!notification) return null;

  const bgColor = notification.type === 'success' ? 'bg-green-500' :
                  notification.type === 'error' ? 'bg-red-500' :
                  notification.type === 'warning' ? 'bg-yellow-500' :
                  'bg-blue-500';

  const icon = notification.type === 'success' ? <FaCheckCircle /> :
               notification.type === 'error' ? <FaExclamationTriangle /> :
               <FaExclamationTriangle />;

  return (
    <div 
      className={`fixed bottom-6 right-6 p-4 pr-10 rounded-lg shadow-lg text-white ${bgColor} animate-fadeIn z-50`}
    >
      <div className="flex items-center">
        <span className="mr-3 text-xl">{icon}</span>
        <span>{notification.message}</span>
      </div>
      <button 
        onClick={hideNotification}
        className="absolute top-3 right-3 text-white hover:text-gray-200"
      >
        <FaTimes />
      </button>
    </div>
  );
};

export default Notification;