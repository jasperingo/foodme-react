
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import BackIcon from '../icons/BackIcon';

export default function SubHeader({ title }) {

  const { t } = useTranslation();

  return (
    <header className="px-2 py-4">
      <div className="flex items-center">
        <Link to="/" className="hover:bg-gray-200">
          <BackIcon />
          <span className="sr-only">{ t('Previous_page') }</span>
        </Link>
        <h2 className="font-bold flex-grow text-center text-xl">{ t(title) }</h2>
      </div>
    </header>
  );
}


