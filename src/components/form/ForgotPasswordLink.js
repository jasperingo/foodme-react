
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function ForgotPasswordLink() {

  const { t } = useTranslation();

  return (
    <div className="mb-4 text-sm">
      <Link to="/forgot-password" className="text-blue-500 font-bold">{ t('_user.Forgot_your_password') }</Link>
    </div>
  );
}
