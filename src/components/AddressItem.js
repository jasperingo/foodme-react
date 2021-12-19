
import Icon from '@mdi/react';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { deleteIcon, editIcon } from '../assets/icons';

export default function  AddressItem({ address: { id, title, street, city, state, is_default } }) {

  const { t } = useTranslation();

  return (
    <li>
      <div className="border rounded mb-4">
        <div className="p-2">
          <div className="py-2 font-bold">{ title }</div>
          <div>{ street }</div>
          <div>{ city }</div>
          <div>{ state }</div>
        </div>
        <div className="flex gap-4 p-2 border-t">

          <button className={`${is_default ? 'text-color-gray' : 'text-color-primary'} flex-grow text-left`}>
            { is_default ? t('_user.Default_address') : t('_extra.Make_default') }
          </button>

          <Link to={`/account/address/${id}`}>
            <span className="sr-only">{ t('_extra.Edit') }</span>
            <Icon path={editIcon} className="w-6 h-6 text-color-primary" />
          </Link>

          <button>
            <span className="sr-only">{ t('_extra.Delete') }</span>
            <Icon path={deleteIcon} className="w-6 h-6 text-color-primary" />
          </button>
        </div>
      </div>
    </li>
  );
}
