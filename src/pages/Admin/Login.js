
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { adminIcon } from '../../assets/icons';
import AuthFormHeader from '../../components/AuthFormHeader';
import FormButton from '../../components/FormButton';
import FormField from '../../components/FormField';
import { USER } from '../../context/AppActions';
import { useAppContext } from '../../context/AppContext';

export default function Login() {

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

  if (customer === 88) {
    return (<Redirect to="/dashboard" />)
  }
  
  return (
    <section>

      <div className="container-x">

        <form method="POST" action="" onSubmit={loginIn} className="form-1-x">

          <AuthFormHeader icon={adminIcon} text="_user.Welcome_back" /> 

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

          <FormButton text="Login" />

        </form>

      </div>
    </section>
  );
}


