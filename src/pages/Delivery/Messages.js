
import React from 'react';
import MessageProfile from '../../components/profile/MessageProfile';
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
    <MessageProfile 
      userId={deliveryFirm.user.id}
      userToken={deliveryFirmToken}
      />
  );
}
