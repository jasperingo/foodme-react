
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import DeliveryFirmApi from '../../api/DeliveryFirmApi';
import { deliveryIcon } from '../../assets/icons';
import AlertDialog, { LOADING_DIALOG } from '../../components/AlertDialog';
import AuthFormHeader from '../../components/AuthFormHeader';
import FormButton from '../../components/FormButton';
import FormField from '../../components/FormField';
import FormMessage from '../../components/FormMessage';
import { FETCH_STATUSES, USER } from '../../context/AppActions';
import { useAppContext } from '../../context/AppContext';
import User from '../../models/User';

export default function Register({ guestMiddleware }) {

  const { t } = useTranslation();

  const { userDispatch, addressesDispatch } = useAppContext();

  const nameInput = useRef(null);

  const emailInput = useRef(null);

  const phoneInput = useRef(null);

  const passwordInput = useRef(null);

  const [dialog, setDialog] = useState(null);

  const [formError, setFormError] = useState('');

  const [nameError, setNameError] = useState('');

  const [emailError, setEmailError] = useState('');

  const [phoneError, setPhoneError] = useState('');

  const [passwordError, setPasswordError] = useState('');
  
  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  function onRegisterSubmit(e) {
    e.preventDefault();

    let error = false;

    setFormError('');
    
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

    if (!passwordInput.current.validity.valid) {

      error = true;
      
      if (passwordInput.current.validity.tooShort) 
        setPasswordError('_errors.Password_must_be_a_minimium_of_5_characters');
      else 
        setPasswordError('_errors.This_field_is_required');

    } else {
      setPasswordError('');
    }
    
    if (!error) {
      setFetchStatus(FETCH_STATUSES.LOADING);
      setDialog(LOADING_DIALOG);
    }
  }

  useEffect(()=> {

    if (fetchStatus === FETCH_STATUSES.LOADING) {
      
      const api = new DeliveryFirmApi();
      api.auth({
        name: nameInput.current.value,
        email: emailInput.current.value,
        phone_number: phoneInput.current.value,
        password: passwordInput.current.value,
        confirm_password: passwordInput.current.value
      }).then(res=> {
        res.data.TYPE = User.TYPE_DELIVERY_FIRM;
        userDispatch({ type: USER.AUTHED, payload: res.data });
      }).catch(err=> {

        setFetchStatus(FETCH_STATUSES.ERROR);

        if (err.errors) {
          setNameError(err.errors.store_name);
          setEmailError(err.errors.store_email);
          setPhoneError(err.errors.store_phone);
          setPasswordError(err.errors.password);
        } else {
          setFormError('_errors.Something_went_wrong');
        }
      });

    } else if (dialog !== null) {
      setDialog(null);
    }

  }, [formError, fetchStatus, dialog, userDispatch, addressesDispatch]);


  return guestMiddleware() || (
    <section>

      <div className="container-x">

        <form method="POST" action="" onSubmit={onRegisterSubmit} className="form-1-x" noValidate>

          <AuthFormHeader icon={deliveryIcon} text="_user.Join_us" />

          { formError && <FormMessage text={formError} /> }

          <FormField 
            ref={nameInput}
            error={nameError}
            ID="name-input" 
            label="_user.Name" 
            required={true}
            />

          <FormField 
            ref={emailInput}
            error={emailError}
            ID="email-input" 
            label="_user.Email" 
            type="email"
            required={true}
            />

          <FormField 
            ref={phoneInput}
            error={phoneError}
            ID="phone-input" 
            label="_user.Phone_number" 
            type="tel"
            required={true}
            />

          <FormField 
            ref={passwordInput}
            error={passwordError}
            ID="password-input" 
            label="_user.Password" 
            type="password" 
            required={true}
            minLength={6}
            />

          <div className="mb-4 text-sm">
            <span>{ t('By_registering_you_agree_to_our') }</span>
            <Link to="/terms-of-service" className="text-blue-500 font-bold"> { t('_extra.Terms_of_service') }.</Link>
          </div>

          <FormButton text="_user.Register" />

          <div className="mb-4 text-center text-sm">
            <span>{ t('Already_have_an_account') } </span>
            <Link to="/" className="text-blue-500 font-bold">{ t('login') }</Link>
          </div>

        </form>
        
      </div>

      { dialog && <AlertDialog dialog={dialog} /> }
      
    </section>
  );
}

