
import React from 'react';
import AdminApp from '../../apps/AdminApp';
import CustomerForm from '../../components/CustomerForm';

export default function CustomerAdd() {

  return (
    <section>
      <div className="container-x">
        <CustomerForm type={CustomerForm.ADD} customer={{ photo: 'default.jpg' }} appType={AdminApp.TYPE} />
      </div>
    </section>
  );
}
