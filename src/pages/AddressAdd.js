
import React from 'react';
import CustomerApp from '../apps/CustomerApp';
import DeliveryApp from '../apps/DeliveryApp';
import StoreApp from '../apps/StoreApp';
import AddressForm from '../components/AddressForm';
import { useAppContext } from '../context/AppContext';
import User from '../models/User';

export default function AddressAdd() {

  const { user: { user } } = useAppContext();

  let address, type;

  switch(user.TYPE) {
    case User.TYPE_CUSTOMER:
      type = CustomerApp.TYPE;
      address = { id: 0, title: '', street: '', city: '', state: '' };
      break;
    case User.TYPE_STORE:
      type = StoreApp.TYPE;
      address = user.address;
      break;
    case User.TYPE_DELIVERY_FIRM:
      type = DeliveryApp.TYPE;
      address = user.address;
      break;
    default: 
  }

  return (
    <section>
      <div className="container-x">
        <AddressForm address={address} appType={type} />
      </div>
    </section>
  );
}
