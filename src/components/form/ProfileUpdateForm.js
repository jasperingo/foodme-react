
import React, { useRef } from 'react';
import LoadingDialog from '../dialog/LoadingDialog';
import FormButton from './FormButton';
import FormField from './FormField';
import FormMessage from './FormMessage';
import FormPhotoField from './FormPhotoField';

export default function ProfileUpdateForm(
  { 
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
  }
) {

  const firstNameInput = useRef(null);

  const lastNameInput = useRef(null);

  const emailInput = useRef(null);

  const phoneInput = useRef(null);

  function onUpdateSubmit(e) {
    e.preventDefault();
    onSubmit(
      firstNameInput.current.value,
      lastNameInput.current.value,
      emailInput.current.value,
      phoneInput.current.value,
      
      {
        firstNameValidity: firstNameInput.current.validity, 
        lastNameValidity: lastNameInput.current.validity, 
        emailValidity: emailInput.current.validity, 
        phoneValidity: phoneInput.current.validity
      }
    );
  }
  
  return (
    <section>
      
      <div className="container-x">

        <form method="POST" action="" className="form-1-x" onSubmit={onUpdateSubmit} noValidate>

          <FormMessage 
            error={formError} 
            success={formSuccess} 
            /> 

          <FormPhotoField 
            alt={customer.user.name} 
            src={customer.user.photo.href} 
            text="_extra.Edit_photo" 
            onChoose={onPhotoChoose}
            uploaded={photoUploaded}
            />

          <FormField 
            ref={firstNameInput}
            error={firstNameError}
            ID="fn-input" 
            label="_user.First_name" 
            required={true}
            value={ customer.first_name }
            />

          <FormField 
            ref={lastNameInput}
            error={lastNameError}
            ID="ln-input" 
            label="_user.Last_name" 
            required={true}
            value={ customer.last_name }
            />

          <FormField 
            ref={emailInput}
            error={emailError}
            ID="email-input" 
            label="_user.Email" 
            type="email" 
            required={true}
            value={ customer.user.email }
            />

          <FormField
            ref={phoneInput}
            error={phoneError}
            ID="phone-input" 
            label="_user.Phone_number" 
            type="tel"
            maxLength="11"
            minLength="11"
            required={true}
            value={ customer.user.phone_number }
            />

          <FormButton text="_user.Update_profile" />

        </form>

      </div>

      { dialog && <LoadingDialog dialog={dialog} /> }

    </section>
  );
}
