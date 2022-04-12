
import React, { useEffect } from 'react';
import TransactionList from '../../components/list/TransactionList';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import WalletAmount from '../../components/WalletAmount';
import { useAppContext } from '../../hooks/contextHook';
import { useDeliveryFirmTransactionBalance } from '../../hooks/delivery_firm/deliveryFirmTransactionBalanceHook';
import { useDeliveryFirmTransactionList } from '../../hooks/delivery_firm/deliveryFirmTransactionListHook';
import { useHeader } from '../../hooks/headerHook';
import { useTransactionWithdraw } from '../../hooks/transaction/transactionWithdrawHook';

function DeliveryFirmTransactionsList() {

  const { 
    deliveryFirm: { 
      deliveryFirm: {
        deliveryFirm,
        deliveryFirmToken
      }
    } 
  } = useAppContext();
  
  const [
    fetchDeliveryFirmTransactions,
    transactions, 
    transactionsLoading,
    transactionsLoaded,
    transactionsError,
    transactionsPage, 
    transactionsNumberOfPages,
    refreshDeliveryFirmTransactions
  ] = useDeliveryFirmTransactionList(deliveryFirmToken);

  useEffect(
    function() { 
      if (!transactionsLoaded && transactionsError === null) 
        fetchDeliveryFirmTransactions(deliveryFirm.id); 
    },
    [deliveryFirm.id, transactionsLoaded, transactionsError, fetchDeliveryFirmTransactions]
  );
  
  return (
    <TransactionList
      transactions={transactions}
      transactionsPage={transactionsPage}
      transactionsError={transactionsError}
      transactionsLoading={transactionsLoading}
      transactionsLoaded={transactionsLoaded}
      transactionsNumberOfPages={transactionsNumberOfPages}
      fetchTransactions={()=> fetchDeliveryFirmTransactions(deliveryFirm.id)}
      refreshList={refreshDeliveryFirmTransactions}
      />
  );
}


export default function Wallet() {

  const { 
    deliveryFirm: { 
      deliveryFirm: {
        deliveryFirm,
        deliveryFirmToken
      }
    } 
  } = useAppContext();

  useHeader({ 
    title: `${deliveryFirm.user.name} - Wallet`,
    topNavPaths: ['/messages']
  });

  const [
    fetchDeliveryFirmTransactionBalance,
    transactionBalance, 
    transactionBalanceLoading,
    transactionBalanceError,
    refreshDeliveryFirmTransactionBalance
  ] = useDeliveryFirmTransactionBalance(deliveryFirmToken);

  const [
    withdraw,
    withdrawDialog,
    withdrawFormError, 
    withdrawFormSuccess
  ] = useTransactionWithdraw(deliveryFirmToken, { deliveryFirm: true });

  useEffect(
    function() {
      if (transactionBalance === null && transactionBalanceError === null)
        fetchDeliveryFirmTransactionBalance(deliveryFirm.id);
    },
    [deliveryFirm.id, transactionBalance, transactionBalanceError, fetchDeliveryFirmTransactionBalance]
  );
  
  return (
    <section>
      {
        transactionBalance !== null && 
        <>
          <div className="container-x">
            <WalletAmount 
              amount={transactionBalance} 
              onSubmitWithdraw={withdraw} 
              withdrawDialog={withdrawDialog} 
              withdrawFormError={withdrawFormError}
              withdrawFormSuccess={withdrawFormSuccess}
              onRefreshClicked={refreshDeliveryFirmTransactionBalance}
              />
          </div>
          <DeliveryFirmTransactionsList />
        </>
      }

      { transactionBalanceLoading && <Loading /> }

      { transactionBalanceError !== null && <Reload action={()=> fetchDeliveryFirmTransactionBalance(deliveryFirm.id)} /> }
       
    </section>
  );
}
