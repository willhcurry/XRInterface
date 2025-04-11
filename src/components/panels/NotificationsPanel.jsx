import React from 'react';

const NotificationsPanel = () => {
  const notifications = [
    { id: 1, app: 'Calendar', title: 'Meeting in 15 minutes', time: '10:45 AM', icon: '📅' },
    { id: 2, app: 'Messages', title: 'New message from Alex', time: '10:30 AM', icon: '💬' },
    { id: 3, app: 'Weather', title: 'Rain expected later today', time: '9:15 AM', icon: '🌧️' },
    { id: 4, app: 'Health', title: 'Daily goal reached', time: 'Yesterday', icon: '🏃‍♂️' },
  ];
  
  return (
    <div className="notifications-panel">
      <h3>Notifications</h3>
      <div className="notification-list">
        {notifications.map(notification => (
          <div key={notification.id} className="notification-item">
            <div className="notification-icon">{notification.icon}</div>
            <div className="notification-content">
              <div className="notification-title">{notification.title}</div>
              <div className="notification-app">{notification.app}</div>
              <div className="notification-time">{notification.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPanel;
