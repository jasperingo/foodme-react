
import React from 'react';
import SubHeader from '../components/SubHeader';

export default function Search() {
  return (
    <section>

      <SubHeader search={true} />

      <div className="container-x">
        Searching...
      </div>

    </section>
  );
}

