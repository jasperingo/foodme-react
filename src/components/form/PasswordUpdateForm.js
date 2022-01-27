
import React, { useEffect, useRef } from 'react';
import FormButton from './FormButton';
import FormField from './FormField';
import FormMessage from './FormMessage';
import LoadingDialog from '../dialog/LoadingDialog';

export default function PasswordUpdateForm({ onSubmit, dialog, newPasswordError, currentPasswordError, formError, formSuccess }) {

  const newPasswordInput = useRef(null);

  const currentPasswordInput = useRef(null);


  function onUpdatePassword(e) {
    e.preventDefault();
    onSubmit(
      currentPasswordInput.current.value,
      newPasswordInput.current.value,
      currentPasswordInput.current.validity,
      newPasswordInput.current.validity
    );
  }
  
  useEffect(
    ()=> {
      if (formSuccess) {
        newPasswordInput.current.value = '';
        currentPasswordInput.current.value =  '';
      }
    }, 
    [formSuccess]
  );

  
  return (
    <form method="POST" action="" className="form-1-x" onSubmit={onUpdatePassword} noValidate>

      <FormMessage 
        error={formError} 
        success={formSuccess} 
        /> 

      <FormField  
        ref={ currentPasswordInput }
        error={ currentPasswordError }
        ID="current-password-input" 
        label="_user.Current_password" 
        type="password"
        required={true}
        minLength={6}
        />

      <FormField 
        ref={ newPasswordInput }
        error={ newPasswordError }
        ID="new-password-input" 
        label="_user.New_password" 
        type="password"
        required={true}
        minLength={6}
        />

      <FormButton text="_extra.Submit" />

      { dialog && <LoadingDialog /> }

    </form>
  );
}
