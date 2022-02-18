
import React, { useRef } from 'react';
import LoadingDialog from '../components/dialog/LoadingDialog';
import FormButton from '../components/form/FormButton';
import FormField from '../components/form/FormField';
import FormMessage from '../components/form/FormMessage';
import FormTopTip from '../components/form/FormTopTip';
import { useHeader } from '../hooks/headerHook';
import { usePasswordResetCreate } from '../hooks/password_reset/passwordResetCreateHook';

export default function ForgotBusinessPassword({ store, deliveryFirm }) {

  useHeader({ 
    title: 'Forgot password - DailyNeeds',
    headerTitle: '_user.Forgot_password'
  });

  const nameInput = useRef(null);

  const emailInput = useRef(null);

  const [onSubmit, dialog, formError, formSuccess] = usePasswordResetCreate({ store, deliveryFirm });

  function onFormSubmit(e) {
    e.preventDefault();
    onSubmit(
      emailInput.current.value, 
      nameInput.current.value,
      
      emailInput.current.validity,
      nameInput.current.validity,
    );
  }
  

  return (
   <section>
      
      <div className="container-x">

        <form method="POST" action="" onSubmit={onFormSubmit} className="form-1-x" noValidate>

          <FormMessage 
            error={formError} 
            success={formSuccess} 
            /> 

          <FormTopTip text="_user._forgot_password_instruction_for_business" />

          <FormField 
            ref={nameInput} 
            ID="name-input" 
            label={store ? '_store.Store_name' : deliveryFirm ? '_delivery.Delivery_name' : '_user.Name'} 
            required={true}
            />

          <FormField 
            ref={emailInput} 
            ID="email-input" 
            label="_user.Administrator_email" 
            type="email"
            required={true}
            />

          <FormButton text="_extra.Submit" />

        </form>

      </div>

      { dialog && <LoadingDialog /> }

    </section>
  );
}
