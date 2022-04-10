
import React, { useEffect } from 'react';
import TransactionList from '../../components/list/TransactionList';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import WalletAmount from '../../components/WalletAmount';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import { useStoreTransactionBalance } from '../../hooks/store/storeTransactionBalanceHook';
import { useStoreTransactionList } from '../../hooks/store/storeTransactionListHook';
import { useTransactionWithdraw } from '../../hooks/transaction/transactionWithdrawHook';
import { useRenderOnDataFetched } from '../../hooks/viewHook';

function StoreTransactionsList() {

  const { 
    store: { 
      store: {
        store,
        storeToken
      }
    } 
  } = useAppContext();
  
  const [
    fetchStoreTransactions, 
    transactions, 
    transactionsLoading, 
    transactionsLoaded, 
    transactionsError,
    transactionsPage, 
    transactionsNumberOfPages, 
    refreshStoreTransactions
  ] = useStoreTransactionList(storeToken);

  useEffect(
    function() { 
      if (!transactionsLoaded && transactionsError === null) 
        fetchStoreTransactions(store.id); 
    },
    [store.id, transactionsLoaded, transactionsError, fetchStoreTransactions]
  );

  return (
    <TransactionList
      transactions={transactions}
      transactionsPage={transactionsPage}
      transactionsError={transactionsError}
      transactionsLoading={transactionsLoading}
      transactionsLoaded={transactionsLoaded}
      transactionsNumberOfPages={transactionsNumberOfPages}
      fetchTransactions={()=> fetchStoreTransactions(store.id)}
      refreshList={refreshStoreTransactions}
      />
  );
}

export default function Wallet() {

  const { 
    store: { 
      store: {
        store,
        storeToken
      }
    } 
  } = useAppContext();

  useHeader({ 
    title: `${store.user.name} - Wallet`,
    headerTitle: "_transaction.Wallet"
  });

  const [
    transactionBalance, 
    transactionBalanceFetchStatus, 
    refetch
  ] = useStoreTransactionBalance(storeToken);

  const [
    withdraw,
    withdrawDialog,
    withdrawFormError, 
    withdrawFormSuccess
  ] = useTransactionWithdraw(storeToken, { store: true });
  
  return (
    <section>
      {
        useRenderOnDataFetched(
          transactionBalanceFetchStatus,
          ()=> (
            <>
              <div className="container-x">
                <WalletAmount 
                  amount={transactionBalance} 
                  onSubmitWithdraw={withdraw} 
                  withdrawDialog={withdrawDialog} 
                  withdrawFormError={withdrawFormError}
                  withdrawFormSuccess={withdrawFormSuccess}
                  />
              </div>
              <StoreTransactionsList />
            </>
          ),
          ()=> <Loading />,
          ()=> <Reload action={refetch} />,
        )
      }
    </section>
  );
}
