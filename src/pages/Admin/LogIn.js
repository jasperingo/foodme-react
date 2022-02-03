
import React, { useRef } from 'react';
import { adminIcon } from '../../assets/icons';
import LoadingDialog from '../../components/dialog/LoadingDialog';
import AuthFormHeader from '../../components/AuthFormHeader';
import FormButton from '../../components/form/FormButton';
import FormField from '../../components/form/FormField';
import FormMessage from '../../components/form/FormMessage';
import { useHeader } from '../../hooks/headerHook';
import { useAdminLogin } from '../../hooks/admin/adminLoginHook';

export default function LogIn({ guestMiddleware }) {

  useHeader({ title: 'Log In - DailyNeeds' });
  
  const emailInput = useRef(null);

  const passwordInput = useRef(null);

  const [onSubmit, dialog, formError] = useAdminLogin();

  function onLoginSubmit(e) {
    e.preventDefault();
    onSubmit(
      emailInput.current.value,
      passwordInput.current.value,
      emailInput.current.validity,
      passwordInput.current.validity
    );
  }
  
  return guestMiddleware() || (
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

          <FormButton text="_user.Log_in" />

        </form>

      </div>

      { dialog && <LoadingDialog /> }

    </section>
  );
}


