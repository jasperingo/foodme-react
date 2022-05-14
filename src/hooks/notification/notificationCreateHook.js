import { useCallback } from 'react';
import { useAppContext } from '../contextHook';

const audio = new Audio('/message-tone.mp3');

function playSound() {
  audio.play();
}

export function useNotificationCreate() {

  const { 
    message: { 
      message: {
        chatID
      } 
    }
  } = useAppContext();

  return useCallback(function(chat, member) {

    if (member.id !== Number(chatID)) {
      playSound();
    }

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
