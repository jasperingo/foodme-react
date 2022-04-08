
import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Forbidden from '../components/Forbidden';
import Loading from '../components/Loading';
import NotFound from '../components/NotFound';
import TransactionProfile from '../components/profile/TransactionProfile';
import Reload from '../components/Reload';
import NetworkErrorCodes from '../errors/NetworkErrorCodes';
import { useHeader } from '../hooks/headerHook';
import { useTransactionFetch } from '../hooks/transaction/transactionFetchHook';
import { useTransactionStatusUpdate } from '../hooks/transaction/transactionStatusUpdateHook';

export default function Transaction({ userToken, canCancel, canProcessAndDecline }) {

  const { ID } = useParams();

  const [
    fetchTransaction,
    transaction,
    transactionLoading,
    transactionError,
    transactionID,
    unfetchTransaction
  ] = useTransactionFetch(userToken);

  useHeader({ 
    title: `${transaction?.reference ?? 'Loading'} - Transaction`,
    headerTitle: "_transaction.Transaction"
  });

  const onUpdateStatusSubmit = useTransactionStatusUpdate(userToken);
  
  const fetch = useCallback(
    function(ID) {
      if (!transactionLoading) fetchTransaction(ID);
    },
    [transactionLoading, fetchTransaction]
  );

  useEffect(
    function() {
      if ((transaction !== null || transactionError !== null) && transactionID !== ID) 
        unfetchTransaction();
      else if (transaction === null && transactionError === null)
        fetch(ID);
    },
    [ID, transaction, transactionError, transactionID, fetch, unfetchTransaction]
  );

  return (
    <section>
      <div className="container-x">
        { 
          transaction !== null && 
          (
            <TransactionProfile 
              transaction={transaction} 
              canCancel={canCancel} 
              canProcessAndDecline={canProcessAndDecline} 
              onUpdateStatusSubmit={onUpdateStatusSubmit}
              />
          ) 
        }

        { transactionLoading && <Loading /> }

        { transactionError === NetworkErrorCodes.NOT_FOUND && <NotFound /> }

        { transactionError === NetworkErrorCodes.FORBIDDEN && <Forbidden /> }

        { transactionError === NetworkErrorCodes.UNKNOWN_ERROR && <Reload action={()=> fetch(ID)} /> }

        { transactionError === NetworkErrorCodes.NO_NETWORK_CONNECTION && <Reload message="_errors.No_netowrk_connection" action={()=> fetch(ID)} /> }
        
      </div>
    </section>
  );
}
