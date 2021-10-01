
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Reload({ message }) {

  const { t } = useTranslation();

  return (
    <div>
      <div>{ message }</div>
      <button>
        <span>{ t('Retry') }</span>
      </button>
    </div>
  );
}


