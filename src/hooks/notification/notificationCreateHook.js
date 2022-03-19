import { useCallback } from 'react';
import { useAppContext } from '../contextHook';

export function useNotificationCreate() {

  const { 
    message: { 
      message: {
        chatID
      } 
    }
  } = useAppContext();

  return useCallback(function(chat, member) {

    if (
        'Notification' in window && Notification.permission === 'granted' && 
        (document.hidden || member.id !== Number(chatID))
    ) {
      new Notification('New Message', {
        body: chat.messages[0].content
      });
    }
  }, [chatID]);
}
