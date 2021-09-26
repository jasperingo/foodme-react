
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { useAppLocation } from '../context/AppContext';
import BackIcon from '../icons/BackIcon';

export default function SubHeader({ title }) {

  const { t } = useTranslation();

  const location = useLocation();

  return (
    <header className="px-2 py-4">
      <div className="container mx-auto">
        <div className="flex items-center">
          <Link 
            to={ useAppLocation(location.state.previousPath, location) }
            className="hover:bg-gray-200">
            <BackIcon />
            <span className="sr-only">{ t('Previous_page') }</span>
          </Link>
          <h2 className="font-bold flex-grow text-center text-xl">{ t(title) }</h2>
        </div>
      </div>
    </header>
  );
}


