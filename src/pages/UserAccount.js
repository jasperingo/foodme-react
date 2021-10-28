
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
        
        <div>
          <img src="/photos/user.jpg" alt="USER" width="100" height="100" />
          <div>Mr. Paul</div>
        </div>

      </div>
    </section>
  );
}

