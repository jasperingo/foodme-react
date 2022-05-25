
import React, { useRef, useEffect } from 'react';
import LoadingDialog from '../components/dialog/LoadingDialog';
import FormButton from '../components/form/FormButton';
import FormMessage from '../components/form/FormMessage';
import FormField from '../components/form/FormField';
// import SocialLoginList from '../components/SocialLoginList';
import { useHeader } from '../hooks/headerHook';
import RegistrationAgreementLink from '../components/form/RegistrationAgreementLink';
import LoginIfHasAccountLink from '../components/form/LoginIfHasAccountLink';
import { useCustomerCreate } from '../hooks/customer/customerCreateHook';

export default function Register() {

  useHeader({ 
    title: `Register - DailyNeeds`,
    headerTitle: '_user.Register'
  });

  const firstNameInput = useRef(null);

  const lastNameInput = useRef(null);

  const emailInput = useRef(null);

  const phoneInput = useRef(null);

  const passwordInput = useRef(null);

  const [
    onSubmit, 
    loading, 
    formSuccess,
    formError, 
    firstNameError, 
    lastNameError, 
    emailError, 
    phoneError, 
    passwordError
  ] = useCustomerCreate();
  
  useEffect(
    function() {
      if (formSuccess !== null) {
        firstNameInput.current.value = ''; 
        lastNameInput.current.value = '';  
        emailInput.current.value = '';  
        phoneInput.current.value = '';  
        passwordInput.current.value = ''; 
      }
    },
    [formSuccess]
  );

  function onRegisterSubmit(e) {
    e.preventDefault();
    onSubmit(
      firstNameInput.current.value,
      lastNameInput.current.value,
      emailInput.current.value,
      phoneInput.current.value,
      passwordInput.current.value,
      
      {
        firstNameValidity: firstNameInput.current.validity, 
        lastNameValidity: lastNameInput.current.validity, 
        emailValidity: emailInput.current.validity, 
        phoneValidity: phoneInput.current.validity, 
        passwordValidity: passwordInput.current.validity
      }
    );
  }
  
  return (
    <section>

      <div className="container-x">

        <form method="POST" action="" onSubmit={onRegisterSubmit} className="form-1-x" noValidate>

          <FormMessage error={formError} success={formSuccess} />

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

          <RegistrationAgreementLink />

          <FormButton text="Register" />

          <LoginIfHasAccountLink />

          {/* <SocialLoginList href="/login" /> */}

        </form>
        
      </div>

      { loading && <LoadingDialog /> }
      
    </section>
  );
}
