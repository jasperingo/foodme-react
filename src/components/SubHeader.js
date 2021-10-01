
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import BackIcon from '../icons/BackIcon';

export default function SubHeader({ title, search }) {

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
          {title && 
            <h2 className="font-bold flex-grow text-left text-xl">{ t(title) }</h2>
          }
          {search && 
            <form method="GET" action="" className="flex-grow">
              <input 
                name="q"
                type="search" 
                placeholder="Search Foodme" 
                className="w-full rounded py-1 px-2 border border-yellow-500 focus:outline-none" 
                />
            </form>
          }
        </div>
      </div>
    </header>
  );
}


