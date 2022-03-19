
import React from 'react';
import MessagesList from '../../components/profile/MessagesList';
import { useAppContext } from '../../hooks/contextHook';

export default function Messages() {

  const {
    store: { 
      store: {
        store,
        storeToken
      }
    } 
  } = useAppContext();

  return (
    <MessagesList 
      userId={store.user.id}
      userToken={storeToken}
      />
  );
}
