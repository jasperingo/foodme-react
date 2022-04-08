
import React, { useCallback, useEffect } from 'react';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import { useCustomerTransactionList } from '../../hooks/customer/customerTransactionListHook';
import TransactionList from '../../components/list/TransactionList';

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
  ] = useCustomerTransactionList(customer.id, customerToken);

  const transactionsFetch = useCallback(
    function() {
      if (!transactionsLoading) 
        fetchCustomerTransactions();
    },
    [transactionsLoading, fetchCustomerTransactions]
  );

  useEffect(
    function() { if (!transactionsLoaded) transactionsFetch(); },
    [transactionsLoaded, transactionsFetch]
  );

  return (
    <section>
      <div className="container-x">
        
        <TransactionList
          transactions={transactions}
          transactionsPage={transactionsPage}
          transactionsError={transactionsError}
          transactionsLoading={transactionsLoading}
          transactionsLoaded={transactionsLoaded}
          transactionsNumberOfPages={transactionsNumberOfPages}
          fetchTransactions={transactionsFetch}
          refreshList={refreshCustomerTransactions}
          />

      </div>
    </section>
  );
}

