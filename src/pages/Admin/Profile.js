
import React from 'react';
import ProfileUpdateForm from '../../components/form/ProfileUpdateForm';
import { useAdminUpdate } from '../../hooks/admin/adminUpdateHook';
import { useHeader } from '../../hooks/headerHook';

export default function Profile() {

  const [
    onSubmit,
    onPhotoChoose,
    photoUploaded,
    admin,
    dialog, 
    formError, 
    formSuccess, 
    firstNameError, 
    lastNameError, 
    emailError, 
    phoneError
  ] = useAdminUpdate();

  useHeader({ 
    title: `${admin.customer.user.name} - Profile`,
    headerTitle: "_user.Profile"
  });
  
  return (
    <ProfileUpdateForm 
      onSubmit={onSubmit}
      onPhotoChoose={onPhotoChoose}
      photoUploaded={photoUploaded}
      customer={admin.customer}
      dialog={dialog}
      formError={formError}
      formSuccess={formSuccess}
      firstNameError={firstNameError} 
      lastNameError={lastNameError}
      emailError={emailError}
      phoneError={phoneError}
      />
  );
}
