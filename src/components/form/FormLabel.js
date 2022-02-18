
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function FormLabel({ ID, label, required }) {

  const { t } = useTranslation();

  return (
    <label htmlFor={ID} className="px-1 font-bold text-sm">{ t(label) } {!required ? `(${t('_extra.optional')})` : ''}</label>
  );
}
