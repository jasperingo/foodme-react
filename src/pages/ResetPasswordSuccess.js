
import React from 'react';
import SuccessBox from '../components/SuccessBox';
import { useHeader } from '../hooks/headerHook';

export default function ResetPasswordSuccess() {

  useHeader({ 
    title: 'Reset Password - DailyNeeds',
    headerTitle: '_user.Reset_password'
  });

  return (
    <section>
      
      <div className="container-x">

        <SuccessBox 
          href="/login"
          linkText="_user.Log_in"
          message="_user._reset_password_success"
          />

      </div>

    </section>
  );
}
