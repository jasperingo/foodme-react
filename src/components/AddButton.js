
import Icon from '@mdi/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { addIcon } from '../assets/icons';

export default function AddButton({ text, href }) {

  const { t } = useTranslation();

  return (
    <div className="py-5">
      <Link
        to={href}
        className="flex items-center gap-2 border rounded p-2 w-full hover:bg-color-gray-h"
        >
        <Icon path={addIcon} className="text-color-primary w-10 h-10 " />
        <div>{ t(text) }</div>
      </Link>
    </div>
  );
}

