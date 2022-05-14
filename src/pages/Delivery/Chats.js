
import React from 'react';
import ChatList from '../../components/list/ChatList';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import Messages from './Messages';

export default function Chats() {

  const { 
    deliveryFirm: { 
      deliveryFirm: {
        deliveryFirm,
        deliveryFirmToken
      }
    } 
  } = useAppContext();

  useHeader({ 
    title: `${deliveryFirm.user.name} - Messages`,
    topNavPaths: ['/messages']
  });

  return (
    <ChatList 
      userId={deliveryFirm.user.id}
      userToken={deliveryFirmToken}
      renderMessages={()=> <Messages />} 
      />
  );
}

