
import React, { useRef, useEffect } from 'react';
import FormButton from '../components/form/FormButton';
import FormField from '../components/form/FormField';
import FormTopTip from '../components/form/FormTopTip';
import { useHeader } from '../hooks/headerHook';
import LoadingDialog from '../components/dialog/LoadingDialog';
import { usePasswordResetCreate } from '../hooks/password_reset/passwordResetCreateHook';
import FormMessage from '../components/form/FormMessage';

export default function ForgotPassword({ customer, administrator }) {

  useHeader({ 
    title: 'Forgot password - DailyNeeds',
    headerTitle: '_user.Forgot_password'
  });

  const emailInput = useRef(null);
  
  const [onSubmit, loading, formError, formSuccess] = usePasswordResetCreate({ customer, administrator });

  useEffect(
    function() {
      if (formSuccess !== null)
        emailInput.current.value = '';
    },
    [formSuccess]
  );
  
  function onFormSubmit(e) {
    e.preventDefault();
    onSubmit(emailInput.current.value, undefined, emailInput.current.validity);
  }
  
  return (
    <section>
      
      <div className="container-x">

        <form method="POST" action="" onSubmit={onFormSubmit} className="form-1-x" noValidate>

          <FormMessage 
            error={formError} 
            success={formSuccess} 
            /> 

          <FormTopTip text="_user._forgot_password_instruction" />

          <FormField 
            ref={emailInput} 
            ID="email-input" 
            label="_user.Email" 
            type="email"
            required={true}
            />

          <FormButton text="_extra.Submit" />

        </form>

      </div>

      { loading && <LoadingDialog /> }

    </section>
  );
}
