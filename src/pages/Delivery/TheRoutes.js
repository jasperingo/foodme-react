
import React from 'react';
import AddButton from '../../components/AddButton';

export default function TheRoutes() {
  return (
    <section>
      <div className="container-x">

        <AddButton text="_delivery.Add_route" href="/route/add" />

        <div>Routes....</div>

      </div>
    </section>
  );
}
