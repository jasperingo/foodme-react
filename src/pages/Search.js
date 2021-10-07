
import React from 'react';
import SubHeader from '../components/SubHeader';
import { useURLQuery } from '../context/AppHooks';

export default function Search() {
  
  const queryParam = useURLQuery().get('q');

  return (
    <section>

      <SubHeader search={true} />

      <div className="container-x">
        Searching for <strong>{ queryParam }</strong>...
      </div>

    </section>
  );
}


