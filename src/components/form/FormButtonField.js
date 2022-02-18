
import React from 'react'
import { useTranslation } from 'react-i18next';
import FormLabel from './FormLabel';

export default function FormButtonField({ onButtonClick, ID, label, error, value, tip }) {

  const { t } = useTranslation();

  const borderColor = !error ? 'border-yellow-500' : 'border-red-500';

  return (
    <div className="mb-4">
      <FormLabel ID={ID} label={label} required={true} />
      <button 
        id={ ID }
        onClick={ onButtonClick }
        className={ `inline-block w-full p-2 border bg-color text-left focus:outline-none rounded ${borderColor}` } 
        >
        { value ?? t(label) }
      </button>
      <div className="text-red-500 text-sm">{ t(error) }</div>
      <div className="text-color-gray text-sm mt-1">{ t(tip) }</div>
    </div>
  );
}
