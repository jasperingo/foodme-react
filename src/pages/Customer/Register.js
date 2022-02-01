
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LoadingDialog from '../../components/dialog/LoadingDialog';
import FormButton from '../../components/form/FormButton';
import FormMessage from '../../components/form/FormMessage';
import FormField from '../../components/form/FormField';
import SocialLoginList from '../../components/SocialLoginList';
import { useCustomerCreate } from '../../hooks/customerHook';
import { useHeader } from '../../hooks/headerHook';

export default function Register({ guestMiddleware }) {

  useHeader({ 
    title: `Register - DailyNeeds`,
    headerTitle: '_user.Register'
  });

  const { t } = useTranslation();

  const firstNameInput = useRef(null);

  const lastNameInput = useRef(null);

  const emailInput = useRef(null);

  const phoneInput = useRef(null);

  const passwordInput = useRef(null);

  const [
    onSubmit, 
    dialog, 
    formError, 
    firstNameError, 
    lastNameError, 
    emailError, 
    phoneError, 
    passwordError
  ] = useCustomerCreate();

  function onRegisterSubmit(e) {
    e.preventDefault();
    onSubmit(
      firstNameInput.current.value,
      lastNameInput.current.value,
      emailInput.current.value,
      phoneInput.current.value,
      passwordInput.current.value,
      firstNameInput.current.validity,
      lastNameInput.current.validity,
      emailInput.current.validity,
      phoneInput.current.validity,
      passwordInput.current.validity,
    );
  }
  
  return guestMiddleware() || (
    <section>

      <div className="container-x">

        <form method="POST" action="" onSubmit={onRegisterSubmit} className="form-1-x" noValidate>

          <FormMessage error={formError} />

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
            ref={phoneInput}
            error={phoneError}
            ID="phone-input" 
            label="_user.Phone_number" 
            type="tel"
            maxLength="11"
            minLength="11"
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

      { dialog && <LoadingDialog /> }
      
    </section>
  );
}

