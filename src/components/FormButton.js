
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function FormButton({ text }) {

  const { t } = useTranslation();

  function onButtonClick(e) {
    e.preventDefault();
  }

  return (
    <div className="mb-4">
      <button 
        type="submit" 
        onClick={onButtonClick}
        className="block w-full p-2 bg-gray-900 hover:bg-gray-700 text-white font-bold rounded">
        { t(text) }
      </button>
    </div>
  );
}

