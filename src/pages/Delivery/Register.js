
import React, { useRef } from 'react';
import { deliveryIcon } from '../../assets/icons';
import AuthFormHeader from '../../components/AuthFormHeader';
import LoadingDialog from '../../components/dialog/LoadingDialog';
import FormButton from '../../components/form/FormButton';
import FormField from '../../components/form/FormField';
import FormMessage from '../../components/form/FormMessage';
import LoginIfHasAccountLink from '../../components/form/LoginIfHasAccountLink';
import RegistrationAgreementLink from '../../components/form/RegistrationAgreementLink';
import { useDeliveryFirmCreate } from '../../hooks/delivery_firm/deliveryFirmCreateHook';
import { useHeader } from '../../hooks/headerHook';

export default function Register({ guestMiddleware }) {

  useHeader({ 
    title: `Register delivery firm - DailyNeeds`
  });

  const nameInput = useRef(null);

  const emailInput = useRef(null);

  const phoneInput = useRef(null);

  const adminEmailInput = useRef(null);

  const adminPasswordInput = useRef(null);

  const [
    onSubmit, 
    dialog, 
    formError, 
    nameError, 
    emailError, 
    phoneError, 
    adminEmailError, 
    adminPasswordError
  ] = useDeliveryFirmCreate();


  function onRegisterSubmit(e) {
    e.preventDefault();
    onSubmit(
      nameInput.current.value, 
      emailInput.current.value, 
      phoneInput.current.value, 
      adminEmailInput.current.value,
      adminPasswordInput.current.value, 

      nameInput.current.validity, 
      emailInput.current.validity, 
      phoneInput.current.validity, 
      adminEmailInput.current.validity, 
      adminPasswordInput.current.validity
    );
  }

  

  return guestMiddleware() || (
    <section>

      <div className="container-x">

        <form method="POST" action="" onSubmit={onRegisterSubmit} className="form-1-x" noValidate>

          <AuthFormHeader icon={deliveryIcon} text="_user.Join_us" />

          <FormMessage error={formError} />

          <FormField
            ref={nameInput}
            error={nameError}
            ID="name-input" 
            label="_user.Name" 
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
            required={true}
            />

          <FormField 
            ref={adminEmailInput}
            error={adminEmailError}
            ID="admin-email-input" 
            label="_user.Administrator_email" 
            type="email" 
            required={true}
            tip="_user._admin_email_registration_tip"
            />

          <FormField 
            ref={adminPasswordInput}
            error={adminPasswordError}
            ID="admin-password-input" 
            label="_user.Administrator_password" 
            type="password" 
            required={true}
            minLength={6}
            />

          <RegistrationAgreementLink />

          <FormButton text="_user.Register" />

          <LoginIfHasAccountLink />

        </form>
        
      </div>

      { dialog && <LoadingDialog /> }
      
    </section>
  );
}

