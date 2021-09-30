
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import BackIcon from '../icons/BackIcon';

export default function SubHeader({ title }) {

  const { t } = useTranslation();

  const history = useHistory();

  return (
    <header className="px-2 py-4">
      <div className="container mx-auto">
        <div className="flex items-center">
          <button
            onClick={ ()=> { history.goBack(); } }
            className="hover:bg-gray-200">
            <BackIcon />
            <span className="sr-only">{ t('Previous_page') }</span>
          </button>
          <h2 className="font-bold flex-grow text-left text-xl">{ t(title) }</h2>
        </div>
      </div>
    </header>
  );
}


