
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import LoadingDialog from '../components/dialog/LoadingDialog';
import FormButton from '../components/form/FormButton';
import FormField from '../components/form/FormField';
import FormMessage from '../components/form/FormMessage';
import FormTopTip from '../components/form/FormTopTip';
import { useHeader } from '../hooks/headerHook';
import { usePasswordResetUpdate } from '../hooks/password_reset/passwordResetUpdateHook';
import { useURLQuery } from '../hooks/viewHook';

export default function ResetPassword() {

  useHeader({ 
    title: 'Reset Password - DailyNeeds',
    headerTitle: '_user.Reset_password'
  });

  const history = useHistory();

  const passwordInput = useRef(null);

  const [token, userType] = useURLQuery(['token', 'user_type']);

  const [onSubmit, dialog, formError, formSuccess] = usePasswordResetUpdate();

  useEffect(
    function() {
      if (formSuccess !== null) {
        history.replace(`reset-password-success?user_type=${userType}`);
      }
    },
    [formSuccess, history, userType]
  );
  
  function onFormSubmit(e) {
    e.preventDefault();
    onSubmit(token ?? '', passwordInput.current.value, passwordInput.current.validity);
  }

  return (
    <section>
      
      <div className="container-x">

        <form method="POST" action="" onSubmit={onFormSubmit} className="form-1-x" noValidate>

          <FormMessage error={formError} /> 

          <FormTopTip text="_user._reset_password_instruction" />

          <FormField
            ref={passwordInput}
            ID="password-input" 
            label="_user.Password" 
            type="password" 
            required={true}
            minLength={6}
            />

          <FormButton text="_user.Reset_password" />

        </form>

      </div>

      { dialog && <LoadingDialog /> }

    </section>
  );
}
