
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useURLQuery } from '../context/AppHooks';

export default function SearchForm({ href }) {

  const history = useHistory();

  const { t } = useTranslation();

  const [q, setQ] = useState('');

  const queryParam = useURLQuery().get('q');

  function onSearchSubmitted(e) {
    e.preventDefault();
    if (q === '') return;
    history.push(`${href}?q=${q}`)
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


