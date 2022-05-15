
import React, { useEffect } from 'react';
import FormMessage from '../components/form/FormMessage';
import Loading from '../components/Loading';
import SuccessBox from '../components/SuccessBox';
import { useEmailVerificationVerify } from '../hooks/email_verification/emailVerificationVerifyHook';
import { useHeader } from '../hooks/headerHook';
import { useURLQuery, useUserDomain } from '../hooks/viewHook';

export default function EmailVerify() {

  useHeader({
    title: `Verify Email - Dailyneeds`,
    headerTitle: '_user.Verify_email'
  });

  const [token, userType] = useURLQuery(['token', 'user_type']);

  const userDomain = useUserDomain();

  const [
    onSubmit,  
    loading, 
    success,
    error,
    loaded
  ] = useEmailVerificationVerify();

  useEffect(
    function() {
      if (!loaded) onSubmit(token);
    },
    [loaded, token, onSubmit]
  );

  return (
    <section>
      <div className="container-x py-8">

        { loading && <Loading /> }

        <FormMessage error={error} />

        {
          success !== null && 
          <SuccessBox 
            linkText="_user.Log_in"
            href={`${userDomain(userType)}login`}
            message="_user._email_verification_success"
            />

        }

      </div>
    </section>
  );
}
