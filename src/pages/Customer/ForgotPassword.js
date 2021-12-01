
import React, { useEffect, useRef, useState } from 'react';
import AlertDialog, { LOADING_DIALOG } from '../../components/AlertDialog';
import FormButton from '../../components/FormButton';
import FormMessage from '../../components/FormMessage';
import FormField from '../../components/FormField';
import FormTopTip from '../../components/FormTopTip';
import { FETCH_STATUSES, USER } from '../../context/AppActions';
import { useAppContext } from '../../context/AppContext';
import apiForgotPassword from '../../api/user/apiForgotPassword';

export default function ForgotPassword() {

  const { user: { 
    userResponse,
    userFetchStatus
  }, userDispatch } = useAppContext();

  const emailInput = useRef(null);

  const [dialog, setDialog] = useState(null);

  const [formError, setFormError] = useState('');

  const [formSuccess, setFormSuccess] = useState('');

  function onFormSubmit(e) {
    e.preventDefault();

    setFormSuccess('');

    if (!emailInput.current.validity.valid) {
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
        email: emailInput.current.value,
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

          <FormTopTip text="_user._forgot_password_instruction" />

          <FormField 
            ref={emailInput} 
            ID="email-input" 
            label="_user.Email" 
            type="email"
            required={true}
            />

          <FormButton text="_extra.Submit" />

        </form>

      </div>

      { dialog && <AlertDialog dialog={dialog} /> }

    </section>
  );
}
