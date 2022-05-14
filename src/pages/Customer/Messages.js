
import React from 'react';
import MessageProfile from '../../components/profile/MessageProfile';
import { useAppContext } from '../../hooks/contextHook';

export default function Messages() {

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
    <MessageProfile 
      userId={customer.user.id}
      userToken={customerToken}
      />
  );
}



