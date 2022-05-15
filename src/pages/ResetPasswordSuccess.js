
import React from 'react';
import SuccessBox from '../components/SuccessBox';
import { useHeader } from '../hooks/headerHook';
import { useURLQuery, useUserDomain } from '../hooks/viewHook';

export default function ResetPasswordSuccess() {

  useHeader({ 
    title: 'Reset Password - DailyNeeds',
    headerTitle: '_user.Reset_password'
  });
  
  const [userType] = useURLQuery(['user_type']);

  const userDomain = useUserDomain();

  return (
    <section>
      
      <div className="container-x">

        <SuccessBox 
          linkText="_user.Log_in"
          href={`${userDomain(userType)}login`}
          message="_user._reset_password_success"
          />

      </div>

    </section>
  );
}
