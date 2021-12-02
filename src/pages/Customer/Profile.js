
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import apiUpdate from '../../api/user/apiUpdate';
import AlertDialog, { LOADING_DIALOG, LOADING_TEXT_DIALOG } from '../../components/AlertDialog';
import FormButton from '../../components/FormButton';
import FormMessage from '../../components/FormMessage';
import FormField from '../../components/FormField';
import PhotoChooser from '../../components/PhotoChooser';
import UpdatePassword from '../../components/UpdatePassword';
import { FETCH_STATUSES, USER } from '../../context/AppActions';
import { useAppContext } from '../../context/AppContext';
import { useAuthHTTPHeader } from '../../context/AppHooks';
import apiUpdatePhoto from '../../api/user/apiUpdatePhoto';

export default function Profile() {
  
  const { t } = useTranslation();

  const { user: { user }, userDispatch } = useAppContext();

  const firstNameInput = useRef(null);

  const lastNameInput = useRef(null);

  const emailInput = useRef(null);

  const phoneInput = useRef(null);

  const photoInput = useRef(null);
  
  const [dialog, setDialog] = useState(null);

  const [formError, setFormError] = useState('');

  const [formSuccess, setFormSuccess] = useState('');

  const [firstNameError, setFirstNameError] = useState('');

  const [lastNameError, setLastNameError] = useState('');

  const [emailError, setEmailError] = useState('');

  const [phoneError, setPhoneError] = useState('');

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  const [photoFetchStatus, setPhotoFetchStatus] = useState(FETCH_STATUSES.PENDING);

  const authHeader = useAuthHTTPHeader();


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
    
    if (!error) {
      setFetchStatus(FETCH_STATUSES.LOADING);
      setDialog(LOADING_DIALOG);
    }
  }

  useEffect(()=> {

    if (fetchStatus === FETCH_STATUSES.LOADING) {
      
      apiUpdate('post/auth-customer.json', authHeader, {
        first_name: firstNameInput.current.value,
        last_name: lastNameInput.current.value,
        email: emailInput.current.value,
        phone_number: phoneInput.current.value
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
          setPhoneError(err.errors.phone_number);
        } else {
          setFormError('_errors.Something_went_wrong');
        }

      });

    } else if (
      fetchStatus === FETCH_STATUSES.DONE && 
      photoFetchStatus === FETCH_STATUSES.PENDING && 
      photoInput.current.files[0]
    ) {
      
      setPhotoFetchStatus(FETCH_STATUSES.LOADING);
      setDialog(LOADING_TEXT_DIALOG(t('_extra.Uploading_photo')));

      let form = new FormData();
      form.append('photo', photoInput.current.files[0]);

      apiUpdatePhoto('post/auth-customer.json', authHeader, form)
      .then(res=> {
        
        setFormSuccess(res.msg);
        setPhotoFetchStatus(FETCH_STATUSES.DONE);
        userDispatch({ type: USER.UPDATED, payload: res });

      })
      .catch(err=> {

        setFetchStatus(FETCH_STATUSES.ERROR);

        if (err.errors) {
          setFormError(err.errors.form);
        } else {
          setFormSuccess('_errors.Something_went_wrong');
        }

      });

    } else if (
      fetchStatus !== FETCH_STATUSES.LOADING && 
      photoFetchStatus !== FETCH_STATUSES.LOADING && 
      dialog !== null
    ) {
      setDialog(null);
    }

  }, [t, fetchStatus, photoFetchStatus, dialog, userDispatch, authHeader]);


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
            ref={photoInput} 
            src={`/photos/${user.photo}`} 
            text="_extra.Edit_photo" 
            status={photoFetchStatus}
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

          <FormField
            ref={phoneInput}
            error={phoneError}
            ID="phone-input" 
            label="_user.Phone_number" 
            type="tel"
            value={ user.phone_number }
            required={false}
            />

          <FormButton text="_user.Update_profile" />

        </form>

        <UpdatePassword url="success.json" />

      </div>

      { dialog && <AlertDialog dialog={dialog} /> }

    </section>
  );
}
