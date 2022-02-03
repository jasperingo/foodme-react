
import React from 'react';
import { useCustomerUpdate } from '../../hooks/customerHook';
import { useHeader } from '../../hooks/headerHook';
import ProfileUpdateForm from '../../components/form/ProfileUpdateForm';

export default function Profile() {
  
  const [
    onSubmit,
    onPhotoChoose,
    photoUploaded,
    customer,
    dialog, 
    formError, 
    formSuccess, 
    firstNameError, 
    lastNameError, 
    emailError, 
    phoneError
  ] = useCustomerUpdate();

  useHeader({ 
    title: `${customer.user.name} - Profile`,
    headerTitle: "_user.Profile"
  });
  
  return (
    <ProfileUpdateForm 
      onSubmit={onSubmit}
      onPhotoChoose={onPhotoChoose}
      photoUploaded={photoUploaded}
      customer={customer}
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
