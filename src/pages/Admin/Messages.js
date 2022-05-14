
import React from 'react';
import MessageProfile from '../../components/profile/MessageProfile';
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
    <MessageProfile 
      userId={admin.application.id}
      userToken={adminToken}
      />
  );
}
