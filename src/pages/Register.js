
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import FormButton from '../components/FormButton';
import FormField from '../components/FormField';
import SocialLoginList from '../components/SocialLoginList';
import SubHeader from '../components/SubHeader';

export default function Register() {

  const { t } = useTranslation();

  function onRegisterSubmit(e) {
    e.preventDefault();
  }
  
  return (
    <section>

      <SubHeader title="Register" />

      <div className="container-x">

        <form method="POST" action="" onSubmit={onRegisterSubmit} className="form-1-x">

          <FormField _id="fn-input" label="First_name" />

          <FormField _id="ln-input" label="Last_name" />

          <FormField _id="email-input" label="Email" />

          <FormField _id="password-input" label="Password" type="password" />

          <div className="mb-4 text-sm">
            <span>{ t('By_registering_you_agree_to_our') }</span>
            <Link to="/terms-of-service" className="text-blue-500 font-bold"> { t('Terms_of_service') }.</Link>
          </div>

          <FormButton text="Register" />

          <div className="mb-4 text-center text-sm">
            <span>{ t('Already_have_an_account') } </span>
            <Link to="/login" className="text-blue-500 font-bold">{ t('login') }</Link>
          </div>

          <SocialLoginList href="/login" />

        </form>
        
      </div>
      
    </section>
  );
}

