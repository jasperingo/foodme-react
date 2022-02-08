
import React, { useRef } from 'react';
import { storeIcon } from '../../assets/icons';
import AuthFormHeader from '../../components/AuthFormHeader';
import LoadingDialog from '../../components/dialog/LoadingDialog';
import ForgotPasswordLink from '../../components/form/ForgotPasswordLink';
import FormButton from '../../components/form/FormButton';
import FormField from '../../components/form/FormField';
import FormMessage from '../../components/form/FormMessage';
import RegisterIfNoAccountLink from '../../components/form/RegisterIfNoAccountLink';
import { useStoreLogin } from '../../hooks/store/storeLoginHook';


export default function LogIn({ guestMiddleware }) {

  const nameInput = useRef(null);

  const emailInput = useRef(null);

  const passwordInput = useRef(null);


  const [onSubmit, dialog, formError] = useStoreLogin();

  
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
  
  return guestMiddleware() || (
    <section>

      <div className="container-x">

        <form method="POST" action="" onSubmit={onLoginSubmit} className="form-1-x" noValidate>

          <AuthFormHeader icon={storeIcon} text="_user.Welcome_back" />

          <FormMessage error={formError} />

          <FormField
            ref={nameInput} 
            ID="name-input" 
            label="_store.Store_name" 
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

      { dialog && <LoadingDialog /> }

    </section>
  );
}

