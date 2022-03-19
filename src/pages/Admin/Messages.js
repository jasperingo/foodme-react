
import React from 'react';
import MessagesList from '../../components/profile/MessagesList';
import { useAppContext } from '../../hooks/contextHook';

export default function Messages() {

  const { 
    admin: { 
      admin: {
        admin,
        adminToken
      }
    } 
  } = useAppContext();

  return (
    <MessagesList 
      userId={admin.application.id}
      userToken={adminToken}
      />
  );
}
