
import React from 'react';
import { useLocation } from 'react-router-dom';
import ChatList from '../../components/list/ChatList';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import Messages from './Messages';

export default function Chats() {

  const location = useLocation();

  useHeader({ 
    title: `Messages - DailyNeeds`,
    topNavPaths: ['/cart', '/search'],
    headerTitle: location.pathname !== '/messages' ? '_message.Message' : undefined
  });

  const {
    customer: {
      customer: {
        customer: {
          customer,
          customerToken
        }
      } 
    } 
  } = useAppContext();
  
  return (
    <ChatList 
      userId={customer.user.id}
      userToken={customerToken}
      renderMessages={()=> <Messages />} 
      />
  );
}
