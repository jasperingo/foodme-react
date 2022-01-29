
import Icon from '@mdi/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { notFoundIcon } from '../assets/icons';

export default function Forbidden() {

  const { t } = useTranslation();

  return (
    <div className="bg-color-gray rounded py-5 px-2 my-2 text-center">
      <div className="text-3xl font-bold mb-2">403</div>
      <div className="mb-2">{ t('_errors.Forbidden') }</div>
      <Icon path={notFoundIcon} className="w-40 h-40 m-auto text-color-primary" />
    </div>
  );
}
