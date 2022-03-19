
import React from 'react';
import ChatsList from '../../components/profile/ChatsList';
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
    <ChatsList 
      userId={deliveryFirm.user.id}
      userToken={deliveryFirmToken}
      renderMessages={()=> <Messages />} 
      />
  );
}

