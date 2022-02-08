
import React from 'react';
import PasswordUpdateForm from '../../components/form/PasswordUpdateForm';
import { useHeader } from '../../hooks/headerHook';
import { useStoreAdminPasswordUpdate } from '../../hooks/store/storeAdminPasswordUpdateHook';

export default function PasswordUpdate() {

  useHeader({ 
    title: 'Update - Password',
    headerTitle: '_user.Edit_admin_password'
  });

  const [
    onSubmit,
    dialog, 
    formError, 
    formSuccess, 
    newPasswordError, 
    currentPasswordError
  ] = useStoreAdminPasswordUpdate();


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
