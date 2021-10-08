
import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function UserAccount() {

  const { customer } = useAppContext();

  if (!customer) {
    return (<Redirect to="/login" />)
  }

  return (
    <section>
      <div className="container-x">
        User account
      </div>
    </section>
  );
}

