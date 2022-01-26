
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Reload({ message, btnText, action }) {

  const { t } = useTranslation();

  return (
    <div className="bg-color-gray rounded py-5 px-2 my-2 text-center">
      <div className="mb-2">{ (message && t(message)) || t('_errors.Something_went_wrong') }</div>
      <button 
        onClick={action} 
        className="bg-yellow-500 p-2 rounded"
        >
        <span>{ (btnText && t(btnText)) || t('Retry') }</span>
      </button>
    </div>
  );
}


