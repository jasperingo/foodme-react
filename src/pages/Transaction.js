
import React, { useEffect } from 'react';
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

  const [
    onSubmit,
    loading, 
    formError, 
    formSuccess,
    resetSubmit
  ] = useTransactionStatusUpdate(userToken);

  useEffect(
    function() {
      if ((transaction !== null || transactionError !== null) && transactionID !== ID) 
        unfetchTransaction();
      else if (transaction === null && transactionError === null)
        fetchTransaction(ID);
    },
    [ID, transaction, transactionError, transactionID, fetchTransaction, unfetchTransaction]
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
              onUpdateStatusSubmit={onSubmit}
              updateStatusLoading={loading}
              updateStatusFormSuccess={formSuccess}
              updateStatusFormError={formError}
              resetUpdateStatus={resetSubmit}
              />
          ) 
        }

        { transactionLoading && <Loading /> }

        { transactionError === NetworkErrorCodes.NOT_FOUND && <NotFound /> }

        { transactionError === NetworkErrorCodes.FORBIDDEN && <Forbidden /> }

        { transactionError === NetworkErrorCodes.UNKNOWN_ERROR && <Reload action={()=> fetchTransaction(ID)} /> }

        { transactionError === NetworkErrorCodes.NO_NETWORK_CONNECTION && <Reload message="_errors.No_netowrk_connection" action={()=> fetchTransaction(ID)} /> }
        
      </div>
    </section>
  );
}
