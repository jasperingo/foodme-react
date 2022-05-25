
import React, { useEffect } from 'react';
import { useHeader } from '../hooks/headerHook';
import ProfileUpdateForm from '../components/form/ProfileUpdateForm';
import { useCustomerUpdate } from '../hooks/customer/customerUpdateHook';
import { useCustomerPhotoUpdate } from '../hooks/customer/customerPhotoUpdateHook';

export default function Profile() {
  
  const [
    onSubmit,
    customer,
    loading, 
    success,
    setSuccess,
    formError, 
    formSuccess,
    firstNameError, 
    lastNameError, 
    emailError, 
    phoneError
  ] = useCustomerUpdate();

  const [
    photoSubmit,
    photo,
    setPhoto,
    photoLoading,
    photoUploaded,
    photoFormError
  ] = useCustomerPhotoUpdate();

  useHeader({ 
    title: `${customer.user.name} - Profile`,
    headerTitle: "_user.Profile"
  });

  useEffect(
    function() {
      if (success && photo !== null && !photoUploaded && photoFormError === null)
        photoSubmit();
      else if (success) 
        setSuccess(false);
    }, 
    [success, photo, photoUploaded, photoFormError, photoSubmit, setSuccess]
  );
  
  return (
    <ProfileUpdateForm 
      onSubmit={onSubmit}
      onPhotoChoose={setPhoto}
      photoUploaded={photoUploaded}
      customer={customer}
      dialog={loading || photoLoading}
      formError={formError || photoFormError}
      formSuccess={formSuccess}
      firstNameError={firstNameError} 
      lastNameError={lastNameError}
      emailError={emailError}
      phoneError={phoneError}
      />
  );
}
