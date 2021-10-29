
import React from 'react';
import { URL } from '../../apps/StoreApp';
import AddButton from '../../components/AddButton';

export default function Orders() {

  return (
    <section>
      
      <div className="container-x">

        <AddButton text="_order.Add_order" href={URL+'/orders'} />
      
        

      </div>
      
    </section>
  );
}

