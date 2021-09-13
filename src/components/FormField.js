
import React from 'react';
import { useTranslation } from 'react-i18next';
import VisibilityIcon from '../icons/VisibilityIcon';

export default function FormField({  _id, label, type }) {

  const { t } = useTranslation();

  return (
    <div className="mb-4">
      <label htmlFor={_id} className="sr-only">{ t(label) }</label>
      <input 
        type={ type?type:"text" }
        id={_id}
        placeholder={ t(label) }
        className="inline-block w-full border border-yellow-500 bg-yellow-500 focus:bg-yellow-400 focus:outline-none placeholder-white rounded p-2 font-bold pr-12" 
        />
        {type === "password" && <button type="button" className="-ml-8">
          <VisibilityIcon />
        </button>}
    </div>
  );
}


