
import React, { useRef, useEffect } from 'react';
import LoadingDialog from '../../components/dialog/LoadingDialog';
import FormButton from '../../components/form/FormButton';
import FormField from '../../components/form/FormField';
import FormMessage from '../../components/form/FormMessage';
import FormPhotoField from '../../components/form/FormPhotoField';
import { useDeliveryFirmPhotoUpdate } from '../../hooks/delivery_firm/deliveryFirmPhotoUpdateHook';
import { useDeliveryFirmUpdate } from '../../hooks/delivery_firm/deliveryFirmUpdateHook';
import { useHeader } from '../../hooks/headerHook';

export default function Profile() {

  const nameInput = useRef(null);

  const emailInput = useRef(null);

  const phoneInput = useRef(null);

  const [
    onSubmit,  
    deliveryFirm, 
    loading, 
    success,
    setSuccess,
    formError, 
    formSuccess, 
    nameError, 
    emailError, 
    phoneError
  ] = useDeliveryFirmUpdate();

  const [
    photoSubmit,
    photo,
    setPhoto,
    photoLoading,
    photoUploaded,
    photoFormError
  ] = useDeliveryFirmPhotoUpdate();

  useHeader({ 
    title: `${deliveryFirm.user.name} - Profile`,
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
  
  function updateProfile(e) {
    e.preventDefault();
    onSubmit(
      nameInput.current.value,
      emailInput.current.value, 
      phoneInput.current.value,

      { 
        nameValidity: nameInput.current.validity, 
        emailValidity: emailInput.current.validity, 
        phoneValidity: phoneInput.current.validity
      }
    );
  }

  return (
    <section className="flex-grow">
      
      <div className="container-x">
      
        <form method="POST" action="" className="form-1-x" onSubmit={updateProfile}>

          <FormMessage 
            success={formSuccess} 
            error={formError || photoFormError} 
            /> 

          <FormPhotoField 
            alt={deliveryFirm.user.name} 
            src={deliveryFirm.user.photo.href} 
            text="_extra.Edit_photo" 
            onChoose={setPhoto}
            uploaded={photoUploaded}
            />

          <FormField 
            ref={nameInput}
            error={nameError}
            ID="name-input" 
            label="_user.Name" 
            required={true}
            value={ deliveryFirm.user.name }
            />

          <FormField 
            ref={emailInput}
            error={emailError}
            ID="email-input" 
            label="_user.Email" 
            type="email" 
            required={true}
            value={ deliveryFirm.user.email }
            />

          <FormField 
            ref={phoneInput}
            error={phoneError}
            ID="phone-input" 
            label="_user.Phone_number" 
            type="tel" 
            required={true}
            value={ deliveryFirm.user.phone_number }
            />

          <FormButton text="_user.Update_profile" />

        </form>

      </div>

      { (loading || photoLoading) && <LoadingDialog /> }

    </section>
  );
}
