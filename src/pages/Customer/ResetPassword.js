
import React, { useEffect, useRef, useState } from 'react';
import apiForgotPassword from '../../api/user/apiForgotPassword';
import AlertDialog, { LOADING_DIALOG } from '../../components/AlertDialog';
import FormButton from '../../components/FormButton';
import FormField from '../../components/FormField';
import FormMessage from '../../components/FormMessage';
import { FETCH_STATUSES, USER } from '../../context/AppActions';
import { useAppContext } from '../../context/AppContext';

export default function ResetPassword() {

  const { user: { 
    userResponse,
    userFetchStatus
  }, userDispatch } = useAppContext();

  const passwordInput = useRef(null);

  const [dialog, setDialog] = useState(null);

  const [formError, setFormError] = useState('');

  const [formSuccess, setFormSuccess] = useState('');

  function onFormSubmit(e) {
    e.preventDefault();

    setFormSuccess('');

    if (!passwordInput.current.validity.valid) {
      if (passwordInput.current.validity.tooShort) 
        setFormError('_errors.Password_must_be_a_minimium_of_5_characters');
      else 
        setFormError('_errors.This_field_is_required');
    } else {
      setFormError('');
      
      userDispatch({
        type: USER.FETCH_STATUS_CHANGED,
        payload: FETCH_STATUSES.LOADING
      });
      
      setDialog(LOADING_DIALOG);
    }
  }

  useEffect(()=> {

    if (userFetchStatus === FETCH_STATUSES.LOADING) {
      apiForgotPassword(userDispatch, 'forgot-password.json', {
        password: passwordInput.current.value,
        confirm_password: passwordInput.current.value
      });
    } else if (dialog !== null) {
      setDialog(null);
    }

    if (userFetchStatus === FETCH_STATUSES.ERROR) {
      setFormError(userResponse.errors.form);
    } else if (userFetchStatus === FETCH_STATUSES.DONE) {
      setFormSuccess(userResponse.success);
    }

  }, [userResponse, userFetchStatus, userDispatch, dialog]);

  return (
    <section>
      
      <div className="container-x">

        <form method="POST" action="" onSubmit={onFormSubmit} className="form-1-x" noValidate>

          { 
            (formError || formSuccess) && 
            <FormMessage 
              text={formSuccess ? formSuccess : formError} 
              type={formSuccess ? FormMessage.TYPE_SUCCESS : FormMessage.TYPE_ERROR} 
              /> 
          }

          <FormField
            ref={passwordInput}
            ID="password-input" 
            label="_user.Password" 
            type="password" 
            required={true}
            minLength={6}
            />

          <FormButton text="_user.Reset_password" />

        </form>

      </div>

      { dialog && <AlertDialog dialog={dialog} /> }

    </section>
  );
}
