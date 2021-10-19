
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import FormButton from '../components/FormButton';
import FormField from '../components/FormField';
import SocialLoginList from '../components/SocialLoginList';

export default function Login() {

  const { t } = useTranslation();

  function loginIn(e) {
    e.preventDefault();
  }
  
  return (
    <section>

      <div className="container-x">

        <form method="POST" action="" onSubmit={loginIn} className="form-1-x">

          <FormField ID="email-input" label="Email" />

          <FormField ID="password-input" label="Password" type="password" />

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


