
import React from 'react';
import SubHeader from '../components/SubHeader';
import { useURLQuery } from '../context/AppHooks';

export default function Search() {
  
  const queryParam = useURLQuery().get('q');
  
  const categoryParam = useURLQuery().get('category');

  return (
    <section>

      <SubHeader search={true} />

      <div className="container-x">
        Searching for <strong>{ queryParam || categoryParam }</strong>...
      </div>

    </section>
  );
}


