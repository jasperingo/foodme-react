
import React, { useEffect } from 'react';
import ProfileUpdateForm from '../../components/form/ProfileUpdateForm';
import { useAdminPhotoUpdate } from '../../hooks/admin/adminPhotoUpdateHook';
import { useAdminUpdate } from '../../hooks/admin/adminUpdateHook';
import { useHeader } from '../../hooks/headerHook';

export default function Profile() {

  const [
    onSubmit,
    admin,
    loading, 
    success,
    setSuccess,
    formError, 
    formSuccess,
    firstNameError, 
    lastNameError, 
    emailError, 
    phoneError
  ] = useAdminUpdate();

  const [
    photoSubmit,
    photo,
    setPhoto,
    photoLoading,
    photoUploaded,
    photoFormError
  ] = useAdminPhotoUpdate();

  useHeader({ 
    title: `${admin.customer.user.name} - Profile`,
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
      customer={admin.customer}
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
