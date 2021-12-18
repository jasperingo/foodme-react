
import React, { useEffect, useMemo, useRef, useState } from 'react';
import UserApi from '../api/UserApi';
import AdminApp from '../apps/AdminApp';
import { FETCH_STATUSES } from '../context/AppActions';
import { useAppContext } from '../context/AppContext';
import AlertDialog, { LOADING_DIALOG } from './AlertDialog';
import FormButton from './FormButton';
import FormField from './FormField';
import FormMessage from './FormMessage';
import FormSelect from './FormSelect';
import PhotoChooser from './PhotoChooser';

export default function CustomerForm({ customer, type, appType }) {
  
  const { user: { user } } = useAppContext();

  const firstNameInput = useRef(null);

  const lastNameInput = useRef(null);

  const emailInput = useRef(null);

  const phoneInput = useRef(null);

  const statusInput = useRef(null);
  
  const [dialog, setDialog] = useState(null);

  const [formError, setFormError] = useState('');

  const [formSuccess, setFormSuccess] = useState('');

  const [firstNameError, setFirstNameError] = useState('');

  const [lastNameError, setLastNameError] = useState('');

  const [emailError, setEmailError] = useState('');

  const [phoneError, setPhoneError] = useState('');

  const [statusError, setStatusError] = useState('');

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  const [photoFetchStatus, setPhotoFetchStatus] = useState(FETCH_STATUSES.PENDING);

  const api = useMemo(() => new UserApi(user.api_token), [user]);
  
  function updateProfile(e) {
    e.preventDefault();

    let error = false;

    setFormError('');

    setFormSuccess('');

    setFetchStatus(FETCH_STATUSES.PENDING);

    setPhotoFetchStatus(FETCH_STATUSES.PENDING);
    
    if (!firstNameInput.current.validity.valid) {
      error = true;
      setFirstNameError('_errors.This_field_is_required');
    } else {
      setFirstNameError('');
    }

    if (!lastNameInput.current.validity.valid) {
      error = true;
      setLastNameError('_errors.This_field_is_required');
    } else {
      setLastNameError('');
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
        first_name: firstNameInput.current.value,
        last_name: lastNameInput.current.value,
        email: emailInput.current.value,
        phone_number: phoneInput.current.value,
        status: statusInput.current.value,
      };

      const request = type === CustomerForm.UPDATE ? api.update(customer.id, form) : api.add(form);
      
      request.then(res=> {
        
        setFormSuccess(res.message);
        setFetchStatus(FETCH_STATUSES.DONE);

        if (type === CustomerForm.ADD) {
          firstNameInput.current.value = '';
          lastNameInput.current.value = '';
          emailInput.current.value = '';
          phoneInput.current.value = '';
          statusInput.current.value = '';
        }

      }).catch(err=> {
        
        setFetchStatus(FETCH_STATUSES.ERROR);

        if (err.errors) {
          setFormError(err.errors.form);
          setFirstNameError(err.errors.first_name);
          setLastNameError(err.errors.last_name);
          setEmailError(err.errors.email);
          setPhoneError(err.errors.phone_number);
          setStatusError(err.errors.status);
        } else {
          setFormError('_errors.Something_went_wrong');
        }

      });

    } else if (fetchStatus === FETCH_STATUSES.DONE && photoFetchStatus === FETCH_STATUSES.PENDING) {
      setPhotoFetchStatus(FETCH_STATUSES.LOADING);
    } else if (dialog !== null) {
      setDialog(null);
    }

  }, [customer, type, api, fetchStatus, photoFetchStatus, dialog]);

  return (
    <section className="flex-grow">
      
      <div className="container-x">

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
            src={`/photos/customer/${customer.photo}`} 
            status={photoFetchStatus}
            onSuccess={onPhotoSuccess}
            onError={onPhotoError}
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
            value={ customer.email }
            />

          <FormField
            ref={phoneInput}
            error={phoneError}
            ID="phone-input" 
            label="_user.Phone_number" 
            type="tel"
            value={ customer.phone_number }
            required={false}
            />
          
          { 
            appType === AdminApp.TYPE && 
            <FormSelect 
              ref={ statusInput }
              error={ statusError }
              ID="status-input" 
              label="_extra.Status" 
              required={true}
              value={customer.status}
              options={[
                'Active',
                'Suspended',
                'Deactivated'
              ]}
              />
          }

          <FormButton text="_extra.Submit" />

        </form>

      </div>

      { dialog && <AlertDialog dialog={dialog} /> }

    </section>
  );
}

CustomerForm.ADD = 'add';
CustomerForm.UPDATE = 'update';
