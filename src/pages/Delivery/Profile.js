
import React, { useEffect, useMemo, useRef, useState } from 'react';
import DeliveryFirmApi from '../../api/DeliveryFirmApi';
import AddressForm from '../../components/AddressForm';
import AlertDialog, { LOADING_DIALOG } from '../../components/AlertDialog';
import FormButton from '../../components/FormButton';
import FormField from '../../components/FormField';
import FormMessage from '../../components/FormMessage';
import PhotoChooser from '../../components/PhotoChooser';
import UpdatePassword from '../../components/PasswordUpdateForm';
import UpdateWithdrawalAccountForm from '../../components/WithdrawalAccountUpdateForm';
import { FETCH_STATUSES, USER } from '../../context/AppActions';
import { useAppContext } from '../../context/AppContext';

export default function Profile() {

  const { 
    user: { user }, 
    userDispatch 
  } = useAppContext();

  const nameInput = useRef(null);

  const emailInput = useRef(null);

  const phoneInput = useRef(null);
  
  const [dialog, setDialog] = useState(null);

  const [formError, setFormError] = useState('');

  const [formSuccess, setFormSuccess] = useState('');

  const [nameError, setNameError] = useState('');

  const [emailError, setEmailError] = useState('');

  const [phoneError, setPhoneError] = useState('');

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  const [photoFetchStatus, setPhotoFetchStatus] = useState(FETCH_STATUSES.PENDING);

  const api = useMemo(() => new DeliveryFirmApi(user.api_token), [user]);

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

  function onPhotoSuccess(res) {

    setPhotoFetchStatus(FETCH_STATUSES.DONE);

    if (res !== null) {
      setFormSuccess(res.message);
      userDispatch({ type: USER.UPDATED, payload: res.data });
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
        email: emailInput.current.value,
        phone_number: phoneInput.current.value
      };
      
      api.update(user.id, form)
      .then(res=> {  
        setFormSuccess(res.message);
        setFetchStatus(FETCH_STATUSES.DONE);
        userDispatch({ type: USER.UPDATED, payload: res.data });
      })
      .catch(err=> {

        setFetchStatus(FETCH_STATUSES.ERROR);

        if (err.errors) {
          setFormError(err.errors.form);
          setNameError(err.errors.name);
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

  }, [user, api, fetchStatus, photoFetchStatus, dialog, userDispatch]);

  return (
    <section className="flex-grow">
      
      <div className="container-x">
      
        <form method="POST" action="" className="form-1-x" onSubmit={updateProfile}>

          { 
            (formError || formSuccess) && 
            <FormMessage 
              text={formSuccess ? formSuccess : formError} 
              type={formSuccess ? FormMessage.TYPE_SUCCESS : FormMessage.TYPE_ERROR} 
              /> 
          }

          <PhotoChooser 
            api={api}
            src={`/photos/delivery-firm/${user.photo}`} 
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
            value={ user.name }
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
            required={true}
            value={ user.phone_number }
            />

          <FormButton text="_user.Update_profile" />

        </form>

        <AddressForm address={user.address} />

        <UpdateWithdrawalAccountForm api={api} account={ user.account } />

        <UpdatePassword api={api} />

      </div>

      { dialog && <AlertDialog dialog={dialog} /> }

    </section>
  );
}
