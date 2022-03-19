
import React from 'react';
import { useLocation } from 'react-router-dom';
import ChatsList from '../../components/profile/ChatsList';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import Message from './Message';

export default function Messages() {

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
    <ChatsList 
      userId={customer.user.id}
      userToken={customerToken}
      renderMessages={()=> <Message />} 
      />
  );
}

