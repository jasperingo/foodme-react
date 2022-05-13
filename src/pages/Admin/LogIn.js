
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { adminIcon } from '../../assets/icons';
import LoadingDialog from '../../components/dialog/LoadingDialog';
import AuthFormHeader from '../../components/AuthFormHeader';
import FormButton from '../../components/form/FormButton';
import FormField from '../../components/form/FormField';
import FormMessage from '../../components/form/FormMessage';
import { useHeader } from '../../hooks/headerHook';
import { useAdminLogin } from '../../hooks/admin/adminLoginHook';
import ForgotPasswordLink from '../../components/form/ForgotPasswordLink';
import { useAuthRedirectURL } from '../../hooks/authHook';

export default function LogIn() {

  useHeader({ title: 'Log In - DailyNeeds' });
  
  const history = useHistory();

  const redirectTo = useAuthRedirectURL('/dashboard');

  const emailInput = useRef(null);

  const passwordInput = useRef(null);

  const [onSubmit, loading, success, formError] = useAdminLogin();

  useEffect(
    function() {
      if (success && !loading) history.replace(redirectTo);
    },
    [success, loading, history, redirectTo]
  );

  function onLoginSubmit(e) {
    e.preventDefault();
    onSubmit(
      emailInput.current.value,
      passwordInput.current.value,
      emailInput.current.validity,
      passwordInput.current.validity
    );
  }
  
  return (
    <section>

      <div className="container-x">

        <form method="POST" action="" onSubmit={onLoginSubmit} className="form-1-x" noValidate>

          <FormMessage error={formError} />

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

          <ForgotPasswordLink />

          <FormButton text="_user.Log_in" />

        </form>

      </div>

      { loading && <LoadingDialog /> }

    </section>
  );
}
