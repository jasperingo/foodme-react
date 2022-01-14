
import React from 'react';
import UpdateWithdrawalAccountForm from '../components/WithdrawalAccountUpdateForm';
import { useAppContext } from '../context/AppContext';

export default function WithdrawalAccountUpdate() {

  const { user: { user } } = useAppContext();

  return (
    <section>
      <div className="container-x">
        <UpdateWithdrawalAccountForm account={ user.account } />
      </div>
    </section>
  );
}
