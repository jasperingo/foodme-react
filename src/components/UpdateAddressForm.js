
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import apiPostAddress from '../api/user/apiPostAddress';
import { FETCH_STATUSES, USER_ADDRESS } from '../context/AppActions';
import { useAppContext } from '../context/AppContext';
import { useAuthHTTPHeader } from '../context/AppHooks';
import AlertDialog, { LOADING_DIALOG } from './AlertDialog';
import FormButton from './FormButton';
import FormField from './FormField';
import FormMessage from './FormMessage';
import FormSelect from './FormSelect';

export default function UpdateAddressForm({ url, method, address, hasTitle }) {

  const { userDispatch } = useAppContext();

  const authHeader = useAuthHTTPHeader();

  const titleInput = useRef(null);

  const streetInput = useRef(null);

  const cityInput = useRef(null);

  const stateInput = useRef(null);

  const [dialog, setDialog] = useState(null);

  const [formError, setFormError] = useState('');

  const [formSuccess, setFormSuccess] = useState('');

  const [titleError, setTitleError] = useState('');

  const [streetError, setStreetError] = useState('');

  const [cityError, setCityError] = useState('');

  const [stateError, setStateError] = useState('');

  const [postFetchStatus, setPostFetchStatus] = useState(FETCH_STATUSES.PENDING);


  function onFormSubmit(e) {
    e.preventDefault();

    let error = false;

    setFormError('');

    setFormSuccess('');

    setPostFetchStatus(FETCH_STATUSES.PENDING);

    if (hasTitle && !titleInput.current.validity.valid) {
      error = true;
      setTitleError('_errors.This_field_is_required');
    } else {
      setTitleError('');
    }

    if (!streetInput.current.validity.valid) {
      error = true;
      setStreetError('_errors.This_field_is_required');
    } else {
      setStreetError('');
    }

    if (!cityInput.current.validity.valid) {
      error = true;
      setCityError('_errors.This_field_is_required');
    } else {
      setCityError('');
    }

    if (!stateInput.current.validity.valid) {
      error = true;
      setStateError('_errors.This_field_is_required');
    } else {
      setStateError('');
    }
    
    if (!error) {
      setFormError('');
      setPostFetchStatus(FETCH_STATUSES.LOADING);
      setDialog(LOADING_DIALOG);
    }
  }

  useEffect(()=> {

    if (postFetchStatus === FETCH_STATUSES.LOADING) {
      apiPostAddress(
        url, 
        method, 
        authHeader,
        {
          title: hasTitle ? titleInput.current.value : undefined,
          street: streetInput.current.value,
          city: cityInput.current.value,
          state: stateInput.current.value
        }
      ).then(res=> {
        
        setFormSuccess(res.msg);
        setPostFetchStatus(FETCH_STATUSES.DONE);
        userDispatch({ type: USER_ADDRESS.FETCHED, payload: res });

      }).catch(err=> {

        setPostFetchStatus(FETCH_STATUSES.ERROR);

        if (err.errors) {
          setFormError(err.errors.form);
          setTitleError(err.errors.title);
          setStreetError(err.errors.street);
          setCityError(err.errors.city);
          setStateError(err.errors.state);
        } else {
          setFormSuccess('_errors.Something_went_wrong');
        }
      });

    } else if (dialog !== null) {
      setDialog(null);
    }

  }, [url, method, hasTitle, authHeader, postFetchStatus, dialog, userDispatch]);

  return (
    <form method="POST" action="" className="form-1-x" onSubmit={onFormSubmit} noValidate>

      { 
        (formError || formSuccess) && 
        <FormMessage 
          text={formSuccess ? formSuccess : formError} 
          type={formSuccess ? FormMessage.TYPE_SUCCESS : FormMessage.TYPE_ERROR} 
          /> 
      }

      { hasTitle && <FormField 
        ref={titleInput}
        error={titleError}
        ID="address-title-input" 
        label="_extra.Title" 
        value={ address.title } 
        required={true}
        />
      }

      <FormField 
        ref={streetInput}
        error={streetError}
        ID="address-street-input" 
        label="_user.Street" 
        value={ address.street } 
        required={true}
        />

      <FormField 
        ref={cityInput}
        error={cityError}
        ID="address-city-input" 
        label="_user.City" 
        value={ address.city } 
        required={true}
        />

      <FormSelect
        ref={stateInput}
        error={stateError}
        ID="address-state-input" 
        label="_user.State" 
        value={ address.state } 
        required={true}
        options={[
          'Abia',
          'Imo',
          'Rivers'
        ]}
        />

      <FormButton text="_user.Save_address" />
      
      { dialog && <AlertDialog dialog={dialog} /> }

    </form>
  )
}
