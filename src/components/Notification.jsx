import React from 'react';
import { useNotification } from '../context/NotificationContext';

const Notification = () => {
  const { notification } = useNotification();

  if (!notification) return null;

  return (
    <div className="fixed bottom-5 right-5 bg-indigo-600 text-white px-4 py-3 rounded shadow-lg">
      {notification.message}
    </div>
  );
};

export default Notification;
