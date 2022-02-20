
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function FormLabel({ ID, label, required, hide }) {

  const { t } = useTranslation();

  return (
    <label 
      htmlFor={ID} 
      className={hide ? 'sr-only' : 'px-0.5 font-bold text-sm'}
      >
      { t(label) } {!required ? `(${t('_extra.optional')})` : ''}
    </label>
  );
}
