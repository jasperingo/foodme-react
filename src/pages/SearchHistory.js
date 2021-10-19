
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import HistoryIcon from '../icons/HistoryIcon';

function HistoryItem({ text }) {
  return (
    <li>
      <Link to={`/search/stores?q=${text}`} className="flex hover:bg-color-gray-h py-4">
        <HistoryIcon classList="fill-current text-color" />
        <div className="flex-grow ml-1">{ text }</div>
      </Link>
    </li>
  );
}

export default function SearchHistory() {

  const { t } = useTranslation();

  return (
    <section>

      <div className="container-x">
        <h3 className="font-bold my-1">{ t('_search.Search_history') }</h3>
        <ul>
          <HistoryItem text="Chicken pizza" />
          <HistoryItem text="Egusi soup" />
          <HistoryItem text="chika booker" />
          <HistoryItem text="Palace Fast food" />
        </ul>
      </div>

    </section>
  );
}

