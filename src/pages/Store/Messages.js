
import React from 'react';
import MessageProfile from '../../components/profile/MessageProfile';
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
    <MessageProfile 
      userId={store.user.id}
      userToken={storeToken}
      />
  );
}
