
import React from 'react';
import TransactionItem from '../../components/TransactionItem';

export default function Transactions() {
  return (
    <section className="flex-grow">
      <div className="container-x">

        <ul className="list-2-x">

          <TransactionItem 
            transaction={{
              amount: 2000, 
              type: 'Payment', 
              created_at: '20 Nov 2021', 
              status: 'Approved'
            }}
            />
          
          <TransactionItem 
            transaction={{
              amount: 800.34, 
              type: 'Refund', 
              created_at: '10 Nov 2021', 
              status: 'Approved'
            }}
            />

        </ul>

      </div>
    </section>
  );
}

