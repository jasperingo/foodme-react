
import React from 'react';
import { useTranslation } from 'react-i18next';
import VisibilityIcon from '../icons/VisibilityIcon';

export default function FormField({ ID, label, type, error, value, onInputChanged }) {

  const { t } = useTranslation();

  return (
    <div className="mb-4">
      <label htmlFor={ID} className="sr-only">{ t(label) }</label>
      <input 
        id={ ID }
        value={ value }
        type={ type || "text" }
        placeholder={ t(label) }
        onInput={ (e)=> onInputChanged(e.target.value) }
        className={`inline-block w-full border ${error ? 'border-red-500' : 'border-yellow-500'} bg-color focus:outline-none rounded p-2 font-bold ${type === "password" && 'pr-12'}`} 
        />
        {type === "password" && <button type="button" className="-ml-8 hover:bg-color-gray-h">
          <VisibilityIcon classList="inline-block fill-current" />
        </button>}
        <div className="text-red-500 text-sm">{ t(error) }</div>
    </div>
  );
}


