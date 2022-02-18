
import React from 'react';
import Loading from '../../components/Loading';
import TransactionList from '../../components/profile/section/TransactionList';
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
        storeToken
      }
    } 
  } = useAppContext();
  
  const [
    transactions, 
    transactionsFetchStatus, 
    transactionsPage, 
    transactionsNumberOfPages, 
    refetch
  ] = useStoreTransactionList(storeToken);

  return (
    <TransactionList
      transactions={transactions}
      transactionsFetchStatus={transactionsFetchStatus}
      transactionsPage={transactionsPage}
      transactionsNumberOfPages={transactionsNumberOfPages}
      refetch={refetch}
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
