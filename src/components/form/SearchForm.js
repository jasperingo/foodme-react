
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useURLQuery } from '../../hooks/viewHook';

export default function SearchForm() {

  const history = useHistory();

  const location = useLocation();

  const { t } = useTranslation();

  const [q, setQ] = useState('');

  const param = useURLQuery();
  
  const queryParam = param.get('q');

  function onSearchSubmitted(e) {
    e.preventDefault();
    if (q === '') return;
    param.set('q', q);
    if (location.pathname !== '/search/stores' && location.pathname !== '/search/products') {
      history.push(`/search/stores?${param.toString()}`);
    } else {
      history.replace(`${location.pathname}?${param.toString()}`);
    }
  }

  function updateInputOnRoute() {
    setQ(queryParam || '');
  }

  useEffect(updateInputOnRoute, [queryParam]);

  return (
    <form method="GET" action="" onSubmit={onSearchSubmitted}>
      <input 
        name="q"
        type="search" 
        value={q}
        onChange={(e)=> setQ(e.target.value)}
        placeholder={ t('_search.Search__app') }
        className="w-full rounded py-1 px-2 border border-yellow-500 bg-color focus:outline-none" 
        />
    </form>
  );
}


