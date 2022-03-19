
import React from 'react';
import ChatsList from '../../components/profile/ChatsList';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import Messages from './Messages';

export default function Chats() {

  const { 
    admin: { 
      admin: {
        admin,
        adminToken
      }
    } 
  } = useAppContext();

  useHeader({
    topNavPaths: ['/messages'],
    title: 'Messages - DailyNeeds'
  });

  return (
    <ChatsList 
      userId={admin.application.id}
      userToken={adminToken}
      renderMessages={()=> <Messages />} 
      />
  );
}
