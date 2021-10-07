
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import BackIcon from '../icons/BackIcon';
import SearchForm from './SearchForm';

export default function SubHeader({ title, search }) {

  const history = useHistory();

  const { t } = useTranslation();

  return (
    <header className="px-2 py-4">
      <div className="container mx-auto">
        <div className="flex items-center">
          <button
            onClick={ ()=> { history.goBack(); } }
            className="hover:bg-color-gray-h">
            <BackIcon classList="fill-current text-color" />
            <span className="sr-only">{ t('Previous_page') }</span>
          </button>
          { title && <h2 className="font-bold flex-grow text-left text-xl">{ t(title) }</h2> }
          { search && <div className="flex-grow lg:hidden"> <SearchForm /> </div> }
        </div>
      </div>
    </header>
  );
}


