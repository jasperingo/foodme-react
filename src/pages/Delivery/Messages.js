
import React from 'react';
import MessagesList from '../../components/profile/MessagesList';
import { useAppContext } from '../../hooks/contextHook';

export default function Messages() {

  const { 
    deliveryFirm: { 
      deliveryFirm: {
        deliveryFirm,
        deliveryFirmToken
      }
    } 
  } = useAppContext();

  return (
    <MessagesList 
      userId={deliveryFirm.user.id}
      userToken={deliveryFirmToken}
      />
  );
}
