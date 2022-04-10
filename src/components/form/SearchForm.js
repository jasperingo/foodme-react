
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { PRODUCT } from '../../context/actions/productActions';
import { STORE } from '../../context/actions/storeActions';
import { useAppContext } from '../../hooks/contextHook';

export default function SearchForm({ onSearchPage }) {

  const { 
    search: {
      searchDispatch 
    }
  } = useAppContext();

  const history = useHistory();

  const location = useLocation();

  const { t } = useTranslation();

  const [q, setQ] = useState('');

  const param = new URLSearchParams();

  function onSearchSubmitted(e) {
    e.preventDefault();

    if (q === '') return;

    param.set('q', q);

    if (!onSearchPage || location.pathname === '/search') {
      history.push(`/search/stores?${param.toString()}`);
    } else {
      history.replace(`${location.pathname}?${param.toString()}`);
    }

    searchDispatch({ type: STORE.LIST_UNFETCHED });
    searchDispatch({ type: PRODUCT.LIST_UNFETCHED });
  }

  return (
    <form method="GET" action="" onSubmit={onSearchSubmitted}>
      <input 
        name="q"
        value={q}
        type="search" 
        onChange={(e)=> setQ(e.target.value)}
        placeholder={ t('_search.Search__app') }
        className="w-full rounded py-1 px-2 border border-yellow-500 bg-color focus:outline-none" 
        />
    </form>
  );
}


