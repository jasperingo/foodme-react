
import React, { useEffect } from 'react';
import { useAppContext } from '../hooks/contextHook';
import { useHeader } from '../hooks/headerHook';
import { useCustomerTransactionList } from '../hooks/customer/customerTransactionListHook';
import TransactionList from '../components/list/TransactionList';

export default function Transactions() {

  const {
    customer: {
      customer: {
        customer: {
          customer,
          customerToken
        }
      } 
    } 
  } = useAppContext();

  useHeader({ 
    title: `${customer.user.name} - Transactions`,
    headerTitle: "_transaction.Transactions"
  });
  
  const [
    fetchCustomerTransactions, 
    transactions, 
    transactionsLoading, 
    transactionsLoaded, 
    transactionsError,
    transactionsPage, 
    transactionsNumberOfPages, 
    refreshCustomerTransactions
  ] = useCustomerTransactionList(customerToken);

  useEffect(
    function() { 
      if (!transactionsLoaded && transactionsError === null) 
        fetchCustomerTransactions(customer.id); 
    },
    [customer.id, transactionsLoaded, transactionsError, fetchCustomerTransactions]
  );

  return (
    <section>
        
      <TransactionList
        transactions={transactions}
        transactionsPage={transactionsPage}
        transactionsError={transactionsError}
        transactionsLoading={transactionsLoading}
        transactionsLoaded={transactionsLoaded}
        transactionsNumberOfPages={transactionsNumberOfPages}
        fetchTransactions={()=> fetchCustomerTransactions(customer.id)}
        refreshList={refreshCustomerTransactions}
        />

    </section>
  );
}
