
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { deliveryIcon } from '../../assets/icons';
import AuthFormHeader from '../../components/AuthFormHeader';
import FormButton from '../../components/FormButton';
import FormField from '../../components/FormField';

export default function Register() {

  const { t } = useTranslation();

  function onRegisterSubmit(e) {
    e.preventDefault();
  }
  
  function jj(params) {
    
  }

  return (
    <section>

      <div className="container-x">

        <form method="POST" action="" onSubmit={onRegisterSubmit} className="form-1-x">

          <AuthFormHeader icon={deliveryIcon} text="_user.Join_us" />

          <FormField ID="name-input" label="_user.Name" onInputChanged={jj} />

          <FormField ID="email-input" label="_user.Email" type="email" onInputChanged={jj} />

          <FormField ID="phone-input" label="_user.Phone_number" type="tel" onInputChanged={jj} />

          <FormField ID="password-input" label="_user.Password" type="password" onInputChanged={jj} />

          <div className="mb-4 text-sm">
            <span>{ t('By_registering_you_agree_to_our') }</span>
            <Link to="/terms-of-service" className="text-blue-500 font-bold"> { t('_extra.Terms_of_service') }.</Link>
          </div>

          <FormButton text="Register" />

          <div className="mb-4 text-center text-sm">
            <span>{ t('Already_have_an_account') } </span>
            <Link to="/" className="text-blue-500 font-bold">{ t('login') }</Link>
          </div>

        </form>
        
      </div>
      
    </section>
  );
}

