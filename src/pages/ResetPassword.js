
import React, { useEffect, useRef, useState } from 'react';
import UserApi from '../api/UserApi';
import AlertDialog, { LOADING_DIALOG } from '../components/AlertDialog';
import FormButton from '../components/FormButton';
import FormField from '../components/FormField';
import FormMessage from '../components/FormMessage';
import FormTopTip from '../components/FormTopTip';
import { FETCH_STATUSES } from '../context/AppActions';
import { useAppContext } from '../context/AppContext';

export default function ResetPassword({ url }) {

  const { userDispatch } = useAppContext();

  const passwordInput = useRef(null);

  const [dialog, setDialog] = useState(null);

  const [formError, setFormError] = useState('');

  const [formSuccess, setFormSuccess] = useState('');

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  function onFormSubmit(e) {
    e.preventDefault();

    setFormSuccess('');

    setFetchStatus(FETCH_STATUSES.PENDING);

    if (!passwordInput.current.validity.valid) {
      setFetchStatus(FETCH_STATUSES.ERROR);
      if (passwordInput.current.validity.tooShort) 
        setFormError('_errors.Password_must_be_a_minimium_of_5_characters');
      else 
        setFormError('_errors.This_field_is_required');
    } else {
      setFormError('');
      setFetchStatus(FETCH_STATUSES.LOADING);
      setDialog(LOADING_DIALOG);
    }
  }

  useEffect(()=> {

    if (fetchStatus === FETCH_STATUSES.LOADING) {
      const api = new UserApi();
      api.forgotPassword({
        password: passwordInput.current.value,
        confirm_password: passwordInput.current.value
      }).then(res=> {
        setFormSuccess(res.msg);
        setFetchStatus(FETCH_STATUSES.DONE);
      }).catch(err=> {
        setFetchStatus(FETCH_STATUSES.ERROR);
        if (err.errors) {
          setFormError(err.errors.msg);
        } else {
          setFormError('_errors.Something_went_wrong');
        }
      });
    } else if (dialog !== null) {
      setDialog(null);
    }

  }, [url, fetchStatus, userDispatch, dialog]);

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

          <FormTopTip text="_user._reset_password_instruction" />

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
