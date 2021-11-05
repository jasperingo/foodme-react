
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import FormButton from '../../components/FormButton';
import FormField from '../../components/FormField';
import StoreIcon from '../../icons/StoreIcon';

export default function LogIn() {

  const { t } = useTranslation();

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
      console.log('Yes');
    }

  }

  

  return (
    <section>

      <div className="container-x">

        <form method="POST" action="" onSubmit={loginIn} className="form-1-x">

          <div className="my-4">
            <StoreIcon classList="w-20 h-20 mx-auto text-color-primary" />
            <div className="font-bold text-center">Welcome back</div>
          </div>

          <FormField
            ID="email-input" 
            label="Email" 
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
            <Link to={URL+"/login"} className="text-blue-500 font-bold">{ t('Forgot_your_password') }</Link>
          </div>

          <FormButton text="Login" />

          <div className="mb-4 text-center text-sm">
            <span>{ t('Dont_have_an_account') } </span>
            <Link to={URL+"/register"} className="text-blue-500 font-bold">{ t('Register') }</Link>
          </div>

        </form>

      </div>
    </section>
  );
}

