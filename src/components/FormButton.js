
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function FormButton({ text }) {

  const { t } = useTranslation();

  return (
    <div className="mb-4">
      <button 
        type="submit" 
        className="block w-full p-2 btn-color-primary font-bold rounded"
        >
        { t(text) }
      </button>
    </div>
  );
}

