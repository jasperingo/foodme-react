
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function RegistrationAgreementLink() {

  const { t } = useTranslation();

  return (
    <div className="mb-4 text-sm">
      <span>{ t('_user.By_registering_you_agree_to_our') }</span>
      <Link to="/terms-of-service" className="text-blue-500 font-bold"> { t('_extra.Terms_of_service') }.</Link>
    </div>
  );
}
