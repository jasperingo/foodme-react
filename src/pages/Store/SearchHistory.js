
import React from 'react';
import { useTranslation } from 'react-i18next';


export default function SearchHistory() {

  const { t } = useTranslation();

  return (
    <section>

      <div className="container-x">
        <h3 className="font-bold my-2">{ t('_search.Search_history') }</h3>
        
      </div>

    </section>
  );
}

