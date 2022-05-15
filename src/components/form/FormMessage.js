
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function FormMessage({ error, success }) {

  const { t } = useTranslation();

  if (success) {
    return (
      <div 
        className="bg-green-500 mb-4 p-2 text-white rounded text-sm"
      >
        { t(success) }
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className="bg-red-500 mb-4 p-2 text-white rounded text-sm"
      >
        { t(error) }
      </div>
    );
  }

  return null;
}
