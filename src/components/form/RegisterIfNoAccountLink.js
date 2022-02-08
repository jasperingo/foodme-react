
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function RegisterIfNoAccountLink() {

  const { t } = useTranslation();

  return (
    <div className="mb-4 text-center text-sm">
      <span>{ t('_user.Dont_have_an_account') }? </span>
      <Link to="/register" className="text-blue-500 font-bold">{ t('Register') }</Link>
    </div>
  );
}

