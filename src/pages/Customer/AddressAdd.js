
import React from 'react';
import CustomerApp from '../../apps/CustomerApp';
import AddressForm from '../../components/AddressForm';

export default function AddressAdd() {
  
  const addr = { id: 0, title: '', street: '', city: '', state: '' };

  return (
    <section className="flex-grow">
      <div className="container-x">
        <AddressForm address={addr} appType={CustomerApp.TYPE} />
      </div>
    </section>
  );
}
