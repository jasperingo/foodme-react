
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import AlertDialog, { LOADING_DIALOG } from '../../components/AlertDialog';
import FormButton from '../../components/FormButton';
import FormMessage from '../../components/FormMessage';
import FormField from '../../components/FormField';
import SocialLoginList from '../../components/SocialLoginList';
import { FETCH_STATUSES, USER } from '../../context/AppActions';
import { useAppContext } from '../../context/AppContext';
import UserApi from '../../api/UserApi';

export default function Register({ guestMiddleware }) {

  const { t } = useTranslation();

  const { userDispatch } = useAppContext();

  const firstNameInput = useRef(null);

  const lastNameInput = useRef(null);

  const emailInput = useRef(null);

  const passwordInput = useRef(null);

  const [dialog, setDialog] = useState(null);

  const [formError, setFormError] = useState('');

  const [firstNameError, setFirstNameError] = useState('');

  const [lastNameError, setLastNameError] = useState('');

  const [emailError, setEmailError] = useState('');

  const [passwordError, setPasswordError] = useState('');
  
  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);


  function onRegisterSubmit(e) {
    e.preventDefault();

    let error = false;

    setFormError('');
    
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
      
      const api = new UserApi();
      api.auth({
        first_name: firstNameInput.current.value,
        last_name: lastNameInput.current.value,
        email: emailInput.current.value,
        password: passwordInput.current.value,
        confirm_password: passwordInput.current.value
      }).then(res=> {
        userDispatch({ type: USER.AUTHED, payload: res.data });
      }).catch(err=> {

        setFetchStatus(FETCH_STATUSES.ERROR);

        if (err.errors) {
          setFirstNameError(err.errors.first_name);
          setLastNameError(err.errors.last_name);
          setEmailError(err.errors.email);
          setPasswordError(err.errors.password);
        } else {
          setFormError('_errors.Something_went_wrong');
        }
      });

    } else if (dialog !== null) {
      setDialog(null);
    }

  }, [formError, fetchStatus, dialog, userDispatch]);

  
  return guestMiddleware() || (
    <section>

      <div className="container-x">

        <form method="POST" action="" onSubmit={onRegisterSubmit} className="form-1-x" noValidate>

          { formError && <FormMessage text={formError} /> }

          <FormField 
            ref={firstNameInput}
            error={firstNameError}
            ID="fn-input" 
            label="_user.First_name" 
            required={true}
            />

          <FormField 
            ref={lastNameInput}
            error={lastNameError}
            ID="ln-input" 
            label="_user.Last_name" 
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

          <FormButton text="Register" />

          <div className="mb-4 text-center text-sm">
            <span>{ t('Already_have_an_account') } </span>
            <Link to="/login" className="text-blue-500 font-bold">{ t('login') }</Link>
          </div>

          <SocialLoginList href="/login" />

        </form>
        
      </div>

      { dialog && <AlertDialog dialog={dialog} /> }
      
    </section>
  );
}

