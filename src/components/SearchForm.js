
import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';

export default function SearchForm() {

  const history = useHistory();

  const location = useLocation();

  const { t } = useTranslation();

  const queryParams = new URLSearchParams(location.search);

  const [q, setQ] = useState(queryParams.get('q'));

  function onSearchSubmitted(e) {
    e.preventDefault();
    if (q === '') return;
    history.push(`/search?q=${q}`)
  }

  return (
    <form method="GET" action="" className="flex-grow" onSubmit={onSearchSubmitted}>
      <input 
        name="q"
        type="search" 
        value={q}
        onChange={(e)=> setQ(e.target.value)}
        placeholder={ t('_search.Search__app') }
        className="w-full rounded py-1 px-2 border border-yellow-500 bg-color focus:outline-none" 
        />
    </form>
  )
}

