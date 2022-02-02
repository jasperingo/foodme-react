
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LoadingDialog from '../../components/dialog/LoadingDialog';
import FormButton from '../../components/form/FormButton';
import FormField from '../../components/form/FormField';
import FormMessage from '../../components/form/FormMessage';
import SocialLoginList from '../../components/SocialLoginList';
import { useCustomerLogin } from '../../hooks/customerHook';
import { useHeader } from '../../hooks/headerHook';

export default function LogIn({ guestMiddleware }) {

  useHeader({ 
    title: 'Log In - DailyNeeds',
    headerTitle: '_user.Log_in'
  });

  const { t } = useTranslation();

  const emailInput = useRef(null);

  const passwordInput = useRef(null);

  const [onSubmit, dialog, formError] = useCustomerLogin();
  
  function onLoginSubmit(e) {
    e.preventDefault();
    onSubmit(
      emailInput.current.value,
      passwordInput.current.value,
      emailInput.current.validity,
      passwordInput.current.validity,
    );
  }

  return guestMiddleware() || (
    <section>

      <div className="container-x">

        <form method="POST" action="" onSubmit={onLoginSubmit} className="form-1-x" noValidate>

          <FormMessage error={formError} />

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

          <div className="mb-4 text-sm">
            <Link to="/forgot-password" className="text-blue-500 font-bold">{ t('_user.Forgot_your_password') }</Link>
          </div>

          <FormButton text="_user.Log_in" />

          <div className="mb-4 text-center text-sm">
            <span>{ t('_user.Dont_have_an_account') } </span>
            <Link to="/register" className="text-blue-500 font-bold">{ t('_user.Register') }</Link>
          </div>

          <SocialLoginList href="/login" />

        </form>

      </div>

      { dialog && <LoadingDialog /> }

    </section>
  );
}


