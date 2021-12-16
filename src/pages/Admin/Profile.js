
import React, { useEffect, useMemo, useRef, useState } from 'react';
import AlertDialog, { LOADING_DIALOG } from '../../components/AlertDialog';
import FormButton from '../../components/FormButton';
import FormMessage from '../../components/FormMessage';
import FormField from '../../components/FormField';
import PhotoChooser from '../../components/PhotoChooser';
import UpdatePassword from '../../components/UpdatePassword';
import { FETCH_STATUSES, USER } from '../../context/AppActions';
import { useAppContext } from '../../context/AppContext';
import AdminApi from '../../api/AdminApi';

export default function Profile() {

  const { user: { user }, userDispatch } = useAppContext();

  const firstNameInput = useRef(null);

  const lastNameInput = useRef(null);

  const emailInput = useRef(null);
  
  const [dialog, setDialog] = useState(null);

  const [formError, setFormError] = useState('');

  const [formSuccess, setFormSuccess] = useState('');

  const [firstNameError, setFirstNameError] = useState('');

  const [lastNameError, setLastNameError] = useState('');

  const [emailError, setEmailError] = useState('');

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  const [photoFetchStatus, setPhotoFetchStatus] = useState(FETCH_STATUSES.PENDING);

  const api = useMemo(() => new AdminApi(user.api_token), [user]);
  
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
    
    if (!error) {
      setFetchStatus(FETCH_STATUSES.LOADING);
      setDialog(LOADING_DIALOG);
    }
  }

  function onPhotoSuccess(res) {

    setPhotoFetchStatus(FETCH_STATUSES.DONE);

    if (res !== null) {
      setFormSuccess(res.msg);
      userDispatch({ type: USER.UPDATED, payload: res });
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
      
      api.update({
        first_name: firstNameInput.current.value,
        last_name: lastNameInput.current.value,
        email: emailInput.current.value,
      }).then(res=> {
        
        setFormSuccess(res.msg);
        setFetchStatus(FETCH_STATUSES.DONE);
        userDispatch({ type: USER.UPDATED, payload: res });

      }).catch(err=> {

        setFetchStatus(FETCH_STATUSES.ERROR);

        if (err.errors) {
          setFormError(err.errors.form);
          setFirstNameError(err.errors.first_name);
          setLastNameError(err.errors.last_name);
          setEmailError(err.errors.email);
        } else {
          setFormError('_errors.Something_went_wrong');
        }

      });

    } else if (fetchStatus === FETCH_STATUSES.DONE && photoFetchStatus === FETCH_STATUSES.PENDING) {
      setPhotoFetchStatus(FETCH_STATUSES.LOADING);
    } else if (dialog !== null) {
      setDialog(null);
    }

  }, [user, api, fetchStatus, photoFetchStatus, dialog, userDispatch]);


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
            src={`/photos/${user.photo}`} 
            text="_extra.Edit_photo" 
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
            value={ user.first_name }
            />

          <FormField 
            ref={lastNameInput}
            error={lastNameError}
            ID="ln-input" 
            label="_user.Last_name" 
            required={true}
            value={ user.last_name }
            />

          <FormField 
            ref={emailInput}
            error={emailError}
            ID="email-input" 
            label="_user.Email" 
            type="email" 
            required={true}
            value={ user.email }
            />

          <FormButton text="_user.Update_profile" />

        </form>

        <UpdatePassword url="success.json" />

      </div>

      { dialog && <AlertDialog dialog={dialog} /> }

    </section>
  );
}
