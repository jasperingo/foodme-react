
import React, { useEffect, useRef, useState } from 'react';
import AdminApi from '../../api/AdminApi';
import { adminIcon } from '../../assets/icons';
import AlertDialog, { LOADING_DIALOG } from '../../components/AlertDialog';
import AuthFormHeader from '../../components/AuthFormHeader';
import FormButton from '../../components/FormButton';
import FormField from '../../components/FormField';
import FormMessage from '../../components/FormMessage';
import { FETCH_STATUSES, USER } from '../../context/AppActions';
import { useAppContext } from '../../context/AppContext';

export default function LogIn({ guestMiddleware }) {

  const { userDispatch } = useAppContext();

  const emailInput = useRef(null);

  const passwordInput = useRef(null);

  const [dialog, setDialog] = useState(null);

  const [formError, setFormError] = useState('');

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  
  function onLoginSubmit(e) {
    e.preventDefault();

    if (!emailInput.current.validity.valid || !passwordInput.current.validity.valid) {
      setFormError('_errors.Credentials_are_incorrect');
    } else {
      setFormError('');
      setFetchStatus(FETCH_STATUSES.LOADING);
      setDialog(LOADING_DIALOG);
    }
  }

  useEffect(()=> {

    if (fetchStatus === FETCH_STATUSES.LOADING) {
      
      const api = new AdminApi();
      api.auth({
        email: emailInput.current.value,
        password: passwordInput.current.value,
        confirm_password: passwordInput.current.value
      }).then(res=> {
        userDispatch({ type: USER.AUTHED, payload: res });
      }).catch(err=> {

        setFetchStatus(FETCH_STATUSES.ERROR);

        if (err.errors) {
          setFormError(err.errors.msg);
        } else {
          setFormError('_errors.Something_went_wrong');
        }
      });

    } else if (dialog !== null) {
      setDialog(null);
    }

  }, [fetchStatus, userDispatch, dialog]);
  
  return guestMiddleware() || (
    <section>

      <div className="container-x">

        <form method="POST" action="" onSubmit={onLoginSubmit} className="form-1-x" noValidate>

          { formError && <FormMessage text={formError} /> }

          <AuthFormHeader icon={adminIcon} text="_user.Welcome_back" />

          <FormField 
            ref={emailInput} 
            ID="email-input" 
            label="_user.Email" 
            type="email"
            required={true}
            />

          <FormField 
            ref={passwordInput}
            ID="password-input" 
            label="_user.Password" 
            type="password" 
            required={true}
            minLength={6}
            />

          <FormButton text="_user.Log_in" />

        </form>

      </div>

      { dialog && <AlertDialog dialog={dialog} /> }

    </section>
  );
}


