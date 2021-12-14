
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import UserApi from '../api/UserApi';
import { FETCH_STATUSES } from '../context/AppActions';
import { useAppContext } from '../context/AppContext';
import AlertDialog, { LOADING_DIALOG } from './AlertDialog';
import FormButton from './FormButton';
import FormField from './FormField';
import FormMessage from './FormMessage';
import FormSelect from './FormSelect';

export default function UpdateWithdrawalAccountForm({ url, account }) {
  
  const { user: { user }, userDispatch } = useAppContext();

  const nameInput = useRef(null);

  const numberInput = useRef(null);

  const typeInput = useRef(null);

  const [dialog, setDialog] = useState(null);

  const [formError, setFormError] = useState('');

  const [formSuccess, setFormSuccess] = useState('');

  const [nameError, setNameError] = useState('');

  const [numberError, setNumberError] = useState('');

  const [typeError, setTypeError] = useState('');
  
  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  function onFormSubmit(e) {
    e.preventDefault();

    let error = false;

    setFormError('');

    setFormSuccess('');

    setFetchStatus(FETCH_STATUSES.PENDING);

    if (!nameInput.current.validity.valid) {
      error = true;
      setNameError('_errors.This_field_is_required');
    } else {
      setNameError('');
    }

    if (!numberInput.current.validity.valid) {
      error = true;
      setNumberError('_errors.This_field_is_required');
    } else {
      setNumberError('');
    }

    if (!typeInput.current.validity.valid) {
      error = true;
      setTypeError('_errors.This_field_is_required');
    } else {
      setTypeError('');
    }

    if (!error) {
      setFetchStatus(FETCH_STATUSES.LOADING);
      setDialog(LOADING_DIALOG);
    }
  }

  useEffect(()=> {

    if (fetchStatus === FETCH_STATUSES.LOADING) {

      const api = new UserApi(user.api_token);
      api.updatePassword({
        bank_name: nameInput.current.value,
        acount_number: numberInput.current.value,
        acount_type: typeInput.current.value,
      }).then(res=> {
        
        setFormSuccess(res.msg);
        setFetchStatus(FETCH_STATUSES.DONE);
        //userDispatch(/*TODO*/);
  
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

  }, [url, user, fetchStatus, dialog, userDispatch]);


  return (
    <form method="POST" action="" className="form-1-x" onSubmit={onFormSubmit} noValidate>

      { 
        (formError || formSuccess) && 
        <FormMessage 
          text={formSuccess ? formSuccess : formError} 
          type={formSuccess ? FormMessage.TYPE_SUCCESS : FormMessage.TYPE_ERROR} 
          /> 
      }

      <FormField 
        ref={ nameInput }
        error={ nameError }
        ID="bank-name-input" 
        label="_transaction.Bank_name" 
        required={true}
        value={ account.bank_name }
        />
      
      <FormField 
        ref={ numberInput }
        error={ numberError }
        ID="bank-account-number-input" 
        label="_transaction.Account_number" 
        type="tel"
        required={true}
        minLength={11}
        maxLength={11}
        value={ account.account_number }
        />

      <FormSelect 
        ref={ typeInput }
        error={ typeError }
        ID="bank-account-type-input" 
        label="_transaction.Account_type" 
        required={true}
        value={ account.account_type }
        options={[
          'Savings',
          'Current'
        ]}
        />

      <FormButton text="_transaction.Change_withdrawal_account" />

      { dialog && <AlertDialog dialog={dialog} /> }

    </form>
  );
}
