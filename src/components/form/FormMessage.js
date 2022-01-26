
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function FormMessage({ text, type = FormMessage.TYPE_ERROR }) {

  const { t } = useTranslation();

  const color = type === FormMessage.TYPE_SUCCESS ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className={`${color} mb-4 p-2 text-white rounded text-sm`}>{ t(text) }</div>
  );
}

FormMessage.TYPE_ERROR = 0;

FormMessage.TYPE_SUCCESS = 1;
