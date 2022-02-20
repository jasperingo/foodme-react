
import React from 'react';
import Forbidden from '../components/Forbidden';
import Loading from '../components/Loading';
import NotFound from '../components/NotFound';
import TransactionProfile from '../components/profile/TransactionProfile';
import Reload from '../components/Reload';
import { useHeader } from '../hooks/headerHook';
import { useTransactionFetch } from '../hooks/transaction/transactionFetchHook';
import { useTransactionStatusUpdate } from '../hooks/transaction/transactionStatusUpdateHook';
import { useRenderOnDataFetched } from '../hooks/viewHook';

export default function Transaction({ userToken, canCancel, canProcessAndDecline }) {

  const [
    transaction, 
    transactionFetchStatus, 
    refetch
  ] = useTransactionFetch(userToken);

  useHeader({ 
    title: `${transaction?.reference ?? 'Loading'} - Transaction`,
    headerTitle: "_transaction.Transaction"
  });

  const onUpdateStatusSubmit = useTransactionStatusUpdate(userToken);
  
  return (
    <section>
      <div className="container-x">
        {
          useRenderOnDataFetched(
            transactionFetchStatus,
            ()=> (
              <TransactionProfile 
                transaction={transaction} 
                canCancel={canCancel} 
                canProcessAndDecline={canProcessAndDecline} 
                onUpdateStatusSubmit={onUpdateStatusSubmit}
                />
            ),
            ()=> <Loading />,
            ()=> <Reload action={refetch} />,
            ()=> <NotFound />,
            ()=> <Forbidden />,
          )
        }
      </div>
    </section>
  );
}
