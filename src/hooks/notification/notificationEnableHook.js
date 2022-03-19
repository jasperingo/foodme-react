import { useState } from 'react';

export function useNotificationEnable() {

  const [can, setCan] = useState('Notification' in window && Notification.permission !== 'granted');

  function ask() {
    Notification.requestPermission()
      .then(permission => {
        setCan(permission === 'granted');
      })
      .catch(err => console.error(err))
  }

  return [can, ask];
}
