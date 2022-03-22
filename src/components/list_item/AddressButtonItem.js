
import React from 'react'
import { useTranslation } from 'react-i18next';

export default function AddressButtonItem({ address: { id, title, street, city, state, type }, onClick }) {

  const { t } = useTranslation();

  return (
    <li>
      <button className="block w-full border rounded text-left mb-4" onClick={()=> onClick(id)}>
        <div className="p-2 font-bold">{ title }</div>
        <div className="px-2 pb-2">{ street }, { city }, { state }</div>
        <div className={`${type === 'default' ? 'text-color-primary' : 'text-color-gray'} border-t p-2`}>
            { type === 'default' ? t('_user.Default_address') : t('_extra.Not_default') }
        </div>
      </button>
    </li>
  );
}
