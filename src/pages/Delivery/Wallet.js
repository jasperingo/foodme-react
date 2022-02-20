
import React from 'react';
import Loading from '../../components/Loading';
import TransactionList from '../../components/profile/section/TransactionList';
import Reload from '../../components/Reload';
import WalletAmount from '../../components/WalletAmount';
import { useAppContext } from '../../hooks/contextHook';
import { useDeliveryFirmTransactionBalance } from '../../hooks/delivery_firm/deliveryFirmTransactionBalanceHook';
import { useDeliveryFirmTransactionList } from '../../hooks/delivery_firm/deliveryFirmTransactionListHook';
import { useHeader } from '../../hooks/headerHook';
import { useTransactionWithdraw } from '../../hooks/transaction/transactionWithdrawHook';
import { useRenderOnDataFetched } from '../../hooks/viewHook';

function DeliveryFirmTransactionsList() {

  const { 
    deliveryFirm: { 
      deliveryFirm: {
        deliveryFirmToken
      }
    } 
  } = useAppContext();
  
  const [
    transactions, 
    transactionsFetchStatus, 
    transactionsPage, 
    transactionsNumberOfPages, 
    refetch
  ] = useDeliveryFirmTransactionList(deliveryFirmToken);

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
    transactionBalance, 
    transactionBalanceFetchStatus, 
    refetch
  ] = useDeliveryFirmTransactionBalance(deliveryFirmToken);

  const [
    withdraw,
    withdrawDialog
  ] = useTransactionWithdraw(deliveryFirmToken, { deliveryFirm: true });

  return (
    <section>
      {
        useRenderOnDataFetched(
          transactionBalanceFetchStatus,
          ()=> (
            <>
              <div className="container-x">
                <WalletAmount amount={transactionBalance} onSubmitWithdraw={withdraw} withdrawDialog={withdrawDialog} />
              </div>
              <DeliveryFirmTransactionsList />
            </>
          ),
          ()=> <Loading />,
          ()=> <Reload action={refetch} />,
        )
      }
    </section>
  );
}
