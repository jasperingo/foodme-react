
import React from 'react';
import MessagesList from '../../components/profile/MessagesList';
import { useAppContext } from '../../hooks/contextHook';

export default function Message() {

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
    <MessagesList 
      userId={customer.user.id}
      userToken={customerToken}
      />
  );
}



