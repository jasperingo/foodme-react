
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Redirect } from 'react-router-dom';
import FormButton from '../../components/FormButton';
import FormField from '../../components/FormField';
import SocialLoginList from '../../components/SocialLoginList';
import { USER } from '../../context/AppActions';
import { useAppContext } from '../../context/AppContext';

export default function Login() {

  const { t } = useTranslation();

  const { customer, customerDispatch } = useAppContext();

  const [email, setEmail] = useState('');

  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');

  const [passwordError, setPasswordError] = useState('');

  function loginIn(e) {
    e.preventDefault();

    let error = false;

    if (email === '') {
      error = true;
      setEmailError('_errors.This_Field_is_required');
    } else
      setEmailError('');

    if (password === '') {
      error = true;
      setPasswordError('_errors.This_Field_is_required');
    } else 
      setPasswordError('');

    if (!error) {
      customerDispatch({
        type: USER.FETCHED
      });
    }

  }

  if (customer) {
    return (<Redirect to="/account" />)
  }
  
  return (
    <section>

      <div className="container-x">

        <form method="POST" action="" onSubmit={loginIn} className="form-1-x">

          <FormField 
            ID="email-input" 
            label="Email" 
            type="email"
            value={email} 
            onInputChanged={setEmail} 
            error={emailError}
            />

          <FormField 
            ID="password-input" 
            label="Password" 
            type="password" 
            value={password} 
            onInputChanged={setPassword} 
            error={passwordError}
            />

          <div className="mb-4 text-sm">
            <Link to="/login" className="text-blue-500 font-bold">{ t('Forgot_your_password') }</Link>
          </div>

          <FormButton text="Login" />

          <div className="mb-4 text-center text-sm">
            <span>{ t('Dont_have_an_account') } </span>
            <Link to="/register" className="text-blue-500 font-bold">{ t('Register') }</Link>
          </div>

          <SocialLoginList href="/login" />

        </form>

      </div>
    </section>
  );
}


