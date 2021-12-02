
import React, { useEffect, useRef, useState } from 'react';
import apiUpdatePassword from '../api/user/apiUpdatePassword';
import { FETCH_STATUSES } from '../context/AppActions';
import { useAuthHTTPHeader } from '../context/AppHooks';
import AlertDialog, { LOADING_DIALOG } from './AlertDialog';
import FormButton from './FormButton';
import FormField from './FormField';
import FormMessage from './FormMessage';

export default function UpdatePassword({ url }) {

  const newPasswordInput = useRef(null);

  const currentPasswordInput = useRef(null);

  const [dialog, setDialog] = useState(null);

  const [formError, setFormError] = useState('');

  const [formSuccess, setFormSuccess] = useState('');

  const [newPasswordError, setNewPasswordError] = useState('');

  const [currentPasswordError, setCurrentPasswordError] = useState('');

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  const authHeader = useAuthHTTPHeader();


  function updatePassword(e) {
    e.preventDefault();

    let error = false;

    setFormError('');

    setFormSuccess('');

    setFetchStatus(FETCH_STATUSES.PENDING);

    if (!currentPasswordInput.current.validity.valid) {
      error = true;
      if (currentPasswordInput.current.validity.tooShort) 
        setCurrentPasswordError('_errors.Password_must_be_a_minimium_of_5_characters');
      else 
        setCurrentPasswordError('_errors.This_field_is_required');
    } else {
      setCurrentPasswordError('');
    }

    if (!newPasswordInput.current.validity.valid) {
      error = true;
      if (newPasswordInput.current.validity.tooShort) 
        setNewPasswordError('_errors.Password_must_be_a_minimium_of_5_characters');
      else 
        setNewPasswordError('_errors.This_field_is_required');
    } else {
      setNewPasswordError('');
    }

    if (!error) {
      setFetchStatus(FETCH_STATUSES.LOADING);
      setDialog(LOADING_DIALOG);
    }
  }

  useEffect(()=> {

    if (fetchStatus === FETCH_STATUSES.LOADING) {

      apiUpdatePassword(url, authHeader, {
        current_password: currentPasswordInput.current.value,
        new_password: newPasswordInput.current.value,
      }).then(res=> {
        
        setFormSuccess(res.msg);
        setFetchStatus(FETCH_STATUSES.DONE);
  
      }).catch(err=> {
  
        setFetchStatus(FETCH_STATUSES.ERROR);
  
        if (err.errors) {
          setFormError(err.errors.form);
        } else {
          setFormError('_errors.Something_went_wrong');
        }
  
      });

    } else if (dialog !== null) {
      setDialog(null);
    }

  }, [url, fetchStatus, dialog, authHeader]);

  useEffect(()=> {
    if (formSuccess) {
      newPasswordInput.current.value = '';
      currentPasswordInput.current.value =  '';
    }
  }, [formSuccess]);
  
  return (
    <form method="POST" action="" className="form-1-x" onSubmit={updatePassword} noValidate>

      { 
        (formError || formSuccess) && 
        <FormMessage 
          text={formSuccess ? formSuccess : formError} 
          type={formSuccess ? FormMessage.TYPE_SUCCESS : FormMessage.TYPE_ERROR} 
          /> 
      }

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

      <FormButton text="_user.Change_password" />

      { dialog && <AlertDialog dialog={dialog} /> }

    </form>
  );
}
