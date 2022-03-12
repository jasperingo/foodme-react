
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function CreateAppAccountLink() {

  const { t } = useTranslation();

  return (
    <div className="text-sm bg-color-gray p-2 rounded mb-4">
      <span>{ t('_user.Dont_have_a_dailyneeds_account') } </span>
      <a href="/register?app=0" className="text-blue-500">{ t('_user.Create_a_dailyneeds_account') }</a>
    </div>
  );
}
