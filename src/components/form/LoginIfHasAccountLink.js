
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function LoginIfHasAccountLink() {

  const { t } = useTranslation();

  return (
    <div className="mb-4 text-center text-sm">
      <span>{ t('_user.Already_have_an_account') }? </span>
      <Link to="/" className="text-blue-500 font-bold">{ t('login') }</Link>
    </div>
  );
}
