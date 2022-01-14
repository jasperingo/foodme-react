
import React, { useMemo } from 'react';
import AdminApi from '../api/AdminApi';
import DeliveryFirmApi from '../api/DeliveryFirmApi';
import StoreApi from '../api/StoreApi';
import UserApi from '../api/UserApi';
import PasswordUpdateForm from '../components/PasswordUpdateForm';
import { useAppContext } from '../context/AppContext';
import User from '../models/User';

export default function PasswordUpdate() {

  const { user: { user } } = useAppContext();

  const api = useMemo(() => {

    switch(user.TYPE) {
      case User.TYPE_CUSTOMER:
        return new UserApi(user.api_token);
      case User.TYPE_STORE:
        return new StoreApi(user.api_token);
      case User.TYPE_DELIVERY_FIRM:
        return new DeliveryFirmApi(user.api_token);
      case User.TYPE_ADMINISTRATOR:
        return  new AdminApi(user.api_token);
      default: 
    }

  }, [user]);

  return (
    <section>
      <div className="container-x">
        <PasswordUpdateForm api={api} />
      </div>
  </section>
  );
}
