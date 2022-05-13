
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { deliveryIcon } from '../../assets/icons';
import AuthFormHeader from '../../components/AuthFormHeader';
import LoadingDialog from '../../components/dialog/LoadingDialog';
import ForgotPasswordLink from '../../components/form/ForgotPasswordLink';
import FormButton from '../../components/form/FormButton';
import FormField from '../../components/form/FormField';
import FormMessage from '../../components/form/FormMessage';
import RegisterIfNoAccountLink from '../../components/form/RegisterIfNoAccountLink';
import { useAuthRedirectURL } from '../../hooks/authHook';
import { useDeliveryFirmLogin } from '../../hooks/delivery_firm/deliveryFirmLoginHook';
import { useHeader } from '../../hooks/headerHook';

export default function LogIn() {

  useHeader({ 
    title: 'Log in delivery firm - DailyNeeds',
    headerTitle: '_user.Log_in',
  });

  const history = useHistory();

  const redirectTo = useAuthRedirectURL('/delivery-routes');

  const nameInput = useRef(null);

  const emailInput = useRef(null);

  const passwordInput = useRef(null);

  const [onSubmit, loading, success, formError] = useDeliveryFirmLogin();

  useEffect(
    function() {
      if (success && !loading) history.replace(redirectTo);
    },
    [success, loading, history, redirectTo]
  );
  
  function onLoginSubmit(e) {
    e.preventDefault();
    onSubmit(
      nameInput.current.value,
      emailInput.current.value,
      passwordInput.current.value,
      
      nameInput.current.validity,
      emailInput.current.validity,
      passwordInput.current.validity,
    );
  }

  return (
    <section>

      <div className="container-x">

        <form method="POST" action="" onSubmit={onLoginSubmit} className="form-1-x" noValidate>

          <AuthFormHeader icon={deliveryIcon} text="_delivery.Delivery_firm_login_note" />

          <FormMessage error={formError} />

          <FormField
            ref={nameInput} 
            ID="name-input" 
            label="_delivery.Delivery_name" 
            required={true}
            />

          <FormField
            ref={emailInput} 
            ID="email-input" 
            label="_user.Administrator_email" 
            type="email"
            required={true}
            />

          <FormField 
            ref={passwordInput}
            ID="password-input" 
            label="_user.Administrator_password" 
            type="password" 
            required={true}
            minLength={6}
            />

          <ForgotPasswordLink />

          <FormButton text="_user.Log_in" />

          <RegisterIfNoAccountLink />

        </form>

      </div>

      { loading && <LoadingDialog /> }
      
    </section>
  );
}

