
import React, { useEffect } from 'react';
import FormMessage from '../components/form/FormMessage';
import Loading from '../components/Loading';
import SuccessBox from '../components/SuccessBox';
import { useEmailVerificationVerify } from '../hooks/email_verification/emailVerificationVerifyHook';
import { useURLQuery } from '../hooks/viewHook';

export default function EmailVerify() {

  const [token] = useURLQuery(['token']);

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
            href="/login"
            linkText="_user.Log_in"
            message="_user._email_verification_success"
            />

        }

      </div>
    </section>
  );
}
