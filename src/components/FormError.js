
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function FormError({ text }) {

  const { t } = useTranslation();

  return (
    <div className="bg-red-500 my-4 p-2 text-white rounded text-sm">{ t(text) }</div>
  );
}
