
import React from 'react';
import Forbidden from '../../components/Forbidden';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import TransactionProfile from '../../components/profile/TransactionProfile';
import Reload from '../../components/Reload';
import { useTransactionFetch } from '../../hooks/transaction/transactionFetchHook';
import { useRenderOnDataFetched } from '../../hooks/viewHook';

export default function Transaction() {

  const [
    transaction, 
    transactionFetchStatus, 
    refetch
  ] = useTransactionFetch();

  return (
    <section>
      <div className="container-x">
        {
          useRenderOnDataFetched(
            transactionFetchStatus,
            ()=> <TransactionProfile transaction={transaction} canCancel={true} />,
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
