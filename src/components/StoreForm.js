
import React, { useEffect, useMemo, useRef, useState } from 'react';
import StoreApi from '../api/StoreApi';
import AdminApp from '../apps/AdminApp';
import { FETCH_STATUSES } from '../context/AppActions';
import { useAppContext } from '../context/AppContext';
import AlertDialog, { LOADING_DIALOG } from './AlertDialog';
import FormButton from './FormButton';
import FormField from './FormField';
import FormMessage from './FormMessage';
import FormSelect from './FormSelect';
import PhotoChooser from './PhotoChooser';

export default function StoreForm({ store, type, appType }) {

  const { user: { user }, userDispatch } = useAppContext();

  const nameInput = useRef(null);

  const categoryInput = useRef(null);

  const emailInput = useRef(null);

  const phoneInput = useRef(null);

  const statusInput = useRef(null);
  
  const [dialog, setDialog] = useState(null);

  const [formError, setFormError] = useState('');

  const [formSuccess, setFormSuccess] = useState('');

  const [nameError, setNameError] = useState('');

  const [categoryError, setCategoryError] = useState('');

  const [emailError, setEmailError] = useState('');

  const [phoneError, setPhoneError] = useState('');

  const [statusError, setStatusError] = useState('');

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  const [photoFetchStatus, setPhotoFetchStatus] = useState(FETCH_STATUSES.PENDING);

  const api = useMemo(() => new StoreApi(user.api_token), [user]);

  function updateProfile(e) {
    e.preventDefault();

    let error = false;

    setFormError('');

    setFormSuccess('');

    setFetchStatus(FETCH_STATUSES.PENDING);

    setPhotoFetchStatus(FETCH_STATUSES.PENDING);
    
    if (!nameInput.current.validity.valid) {
      error = true;
      setNameError('_errors.This_field_is_required');
    } else {
      setNameError('');
    }

    if (!categoryInput.current.validity.valid) {
      error = true;
      setCategoryError('_errors.This_field_is_required');
    } else {
      setCategoryError('');
    }

    if (!emailInput.current.validity.valid) {
      error = true;
      setEmailError('_errors.This_field_is_required');
    } else {
      setEmailError('');
    }

    if (!phoneInput.current.validity.valid) {
      error = true;
      setPhoneError('_errors.This_field_is_required');
    } else {
      setPhoneError('');
    }

    if (!statusInput.current.validity.valid) {
      error = true;
      setStatusError('_errors.This_field_is_required');
    } else {
      setStatusError('');
    }
    
    if (!error) {
      setFetchStatus(FETCH_STATUSES.LOADING);
      setDialog(LOADING_DIALOG);
    }
  }

  function onPhotoSuccess(res) {

    setPhotoFetchStatus(FETCH_STATUSES.DONE);

    if (res !== null) {
      setFormSuccess(res.message);
    }
  }

  function onPhotoError(err) {
    
    setFetchStatus(FETCH_STATUSES.ERROR);

    if (err.errors) {
      setFormError(err.errors.form);
    } else {
      setFormSuccess('_errors.Something_went_wrong');
    }
  }

  useEffect(()=> {

    if (fetchStatus === FETCH_STATUSES.LOADING) {

      const form = {
        name: nameInput.current.value,
        category: categoryInput.current.value,
        email: emailInput.current.value,
        phone_number: phoneInput.current.value
      };

      const request = type === StoreForm.UPDATE ? api.update(store.id, form) : api.add(form);
      
      request.then(res=> {
        
        setFormSuccess(res.message);
        setFetchStatus(FETCH_STATUSES.DONE);

        if (type === StoreForm.ADD) {
          nameInput.current.value = '';
          categoryInput.current.value = '';
          emailInput.current.value = '';
          phoneInput.current.value = '';
          statusInput.current.value = '';
        }
        

      }).catch(err=> {

        setFetchStatus(FETCH_STATUSES.ERROR);

        if (err.errors) {
          setFormError(err.errors.form);
          setNameError(err.errors.name);
          setCategoryError(err.errors.category);
          setEmailError(err.errors.email);
          setPhoneError(err.errors.phone_number);
        } else {
          setFormError('_errors.Something_went_wrong');
        }

      });

    } else if(fetchStatus === FETCH_STATUSES.DONE && photoFetchStatus === FETCH_STATUSES.PENDING) {
      setPhotoFetchStatus(FETCH_STATUSES.LOADING);
    } else if (dialog !== null) {
      setDialog(null);
    }

  }, [store, type, api, fetchStatus, photoFetchStatus, dialog, userDispatch]);

  return (
    <form method="POST" action="" className="form-1-x" onSubmit={updateProfile} noValidate>

      { 
        (formError || formSuccess) && 
        <FormMessage 
          text={formSuccess ? formSuccess : formError} 
          type={formSuccess ? FormMessage.TYPE_SUCCESS : FormMessage.TYPE_ERROR} 
          /> 
      }

      <PhotoChooser 
        api={api}
        src={`/photos/store/${store.photo}`} 
        text="_extra.Edit_photo" 
        status={photoFetchStatus}
        onSuccess={onPhotoSuccess}
        onError={onPhotoError}
        />

      <FormField 
        ref={nameInput}
        error={nameError}
        ID="name-input" 
        label="_user.Name" 
        required={true}
        value={ store.name }
        />

      <FormSelect 
        ref={categoryInput}
        error={categoryError}
        ID="category-input"
        label="_store.Store_category" 
        required={true}
        value={ store.category }
        options={[
          'Phamarcy'
        ]}
        />

      <FormField 
        ref={emailInput}
        error={emailError}
        ID="email-input" 
        label="_user.Email" 
        type="email" 
        required={true}
        value={ store.email }
        />

      <FormField 
        ref={phoneInput}
        error={phoneError}
        ID="phone-input" 
        label="_user.Phone_number" 
        type="tel" 
        required={true}
        value={ store.phone_number }
        />

      { 
        appType === AdminApp.TYPE && 
        <FormSelect 
          ref={ statusInput }
          error={ statusError }
          ID="status-input" 
          label="_extra.Status" 
          required={true}
          value={store.status}
          options={[
            'Active',
            'Suspended',
            'Deactivated'
          ]}
          />
      }

      <FormButton text="_extra.Submit" />

      { dialog && <AlertDialog dialog={dialog} /> }

    </form>
  );
}

StoreForm.ADD = 'add';
StoreForm.UPDATE = 'update';
