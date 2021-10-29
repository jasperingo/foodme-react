
import React from 'react';
import { URL } from '../../apps/StoreApp';
import AddButton from '../../components/AddButton';

export default function Promotions() {
  return (
    <section>
      
      <div className="container-x">

        <AddButton text="_discount.Add_promotion" href={URL+'/promotions'} />
      
        

      </div>
      
    </section>
  );
}

