
import React, { useCallback, useEffect } from 'react';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import { useCustomerTransactionList } from '../../hooks/customer/customerTransactionListHook';
import TransactionList from '../../components/list/TransactionList';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';


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
    setCustomerTransactionsError, 
    refreshCustomerTransactions
  ] = useCustomerTransactionList(customer.id, customerToken);

  const fetch = useCallback(
    function() {
      if (!window.navigator.onLine && transactionsError === null)
        setCustomerTransactionsError(NetworkErrorCodes.NO_NETWORK_CONNECTION);
      else if (window.navigator.onLine && !transactionsLoading) 
        fetchCustomerTransactions();
    },
    [transactionsError, transactionsLoading, fetchCustomerTransactions, setCustomerTransactionsError]
  );

  useEffect(
    function() { if (!transactionsLoaded) fetch(); },
    [transactionsLoaded, fetch]
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
          getNextPage={fetch}
          retryFetch={()=> setCustomerTransactionsError(null)}
          refreshList={refreshCustomerTransactions}
          />

      </div>
    </section>
  );
}

