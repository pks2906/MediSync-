import React, { useEffect, useState } from 'react';
import socket from '../socket';

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on('newRequest', (data) => {
      setNotifications(prev => [`New request from hospital ${data.fromHospitalId}`, ...prev]);
    });

    socket.on('requestUpdated', (data) => {
      setNotifications(prev => [`Request ${data.id} was ${data.status}`, ...prev]);
    });

    return () => {
      socket.off('newRequest');
      socket.off('requestUpdated');
    };
  }, []);

  if (notifications.length === 0) return null;

  return (
    <div style={{ backgroundColor: '#f2f2f2', padding: '1rem', marginTop: '1rem' }}>
      <h3>Live Notifications</h3>
      <ul>
        {notifications.map((note, i) => <li key={i}>{note}</li>)}
      </ul>
    </div>
  );
};

export default NotificationPanel;
