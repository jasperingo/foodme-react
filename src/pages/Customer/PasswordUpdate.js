
import React from 'react';
import PasswordUpdateForm from '../../components/form/PasswordUpdateForm';
import { useCustomerPasswordUpdate } from '../../hooks/customerHook';

export default function PasswordUpdate() {

  const [
    onSubmit,
    dialog, 
    formError, 
    formSuccess, 
    newPasswordError, 
    currentPasswordError
  ] = useCustomerPasswordUpdate();


  return (
    <section>
      <div className="container-x">
        <PasswordUpdateForm 
          dialog={dialog}
          onSubmit={onSubmit}
          formError={formError} 
          formSuccess={formSuccess}
          newPasswordError={newPasswordError}
          currentPasswordError={currentPasswordError}
          />
      </div>
    </section>
  );
}
