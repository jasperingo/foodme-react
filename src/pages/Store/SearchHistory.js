
import React from 'react';
import { useTranslation } from 'react-i18next';
import SearchHistoryItem from '../../components/SearchHistoryItem';


export default function SearchHistory() {

  const { t } = useTranslation();

  return (
    <section>

      <div className="container-x">
        <h3 className="font-bold my-2">{ t('_search.Search_history') }</h3>
        <ul>
          <SearchHistoryItem text="Chicken pizza" />
          <SearchHistoryItem text="Egusi soup" />
          <SearchHistoryItem text="chika booker" />
          <SearchHistoryItem text="Palace Fast food" />
        </ul>
      </div>

    </section>
  );
}

