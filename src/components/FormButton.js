
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function FormButton({ text }) {

  const { t } = useTranslation();

  return (
    <div className="mb-4">
      <button 
        type="submit" 
        className="block w-full p-2 bg-yellow-500 hover:bg-yellow-400 text-white font-bold rounded">
        { t(text) }
      </button>
    </div>
  );
}

