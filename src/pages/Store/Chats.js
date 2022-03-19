
import React from 'react';
import ChatsList from '../../components/profile/ChatsList';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import Messages from './Messages';

export default function Chats() {

  const {
    store: { 
      store: {
        store,
        storeToken
      }
    } 
  } = useAppContext();

  useHeader({ 
    title: `${store.user.name} - Messages`,
    topNavPaths: ['/messages', '/cart']
  });

  return (
    <ChatsList 
      userId={store.user.id}
      userToken={storeToken}
      renderMessages={()=> <Messages />} 
      />
  );
}
