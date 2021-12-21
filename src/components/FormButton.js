
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function FormButton({ text, color = 'btn-color-primary' }) {

  const { t } = useTranslation();

  return (
    <div className="mb-4">
      <button 
        type="submit" 
        className={`block w-full p-2 font-bold rounded ${color}`}
        >
        { t(text) }
      </button>
    </div>
  );
}

