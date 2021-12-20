
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import TransactionApi from '../../api/TransactionApi';
import AdminApp from '../../apps/AdminApp';
import { transactionIcon } from '../../assets/icons';
import EmptyList from '../../components/EmptyList';
import FetchMoreButton from '../../components/FetchMoreButton';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import TransactionItem from '../../components/TransactionItem';
import { FETCH_STATUSES, getTransactionsListFetchStatusAction } from '../../context/AppActions';
import { useAppContext } from '../../context/AppContext';
import { useHasMoreToFetchViaScroll, useListRender } from '../../context/AppHooks';

export default function Transactions() {

  const { 
    user: { user }, 
    transactions: {
      transactions: {
        transactions,
        transactionsFetchStatus,
        transactionsPage,
        transactionsNumberOfPages
      }
    }, 
    transactionsDispatch 
  } = useAppContext();

  useEffect(()=>{
    if (transactionsFetchStatus === FETCH_STATUSES.LOADING) {
      const api = new TransactionApi(user.api_token);
      api.getListByAdmin(transactionsDispatch);
    }
  });

  function refetchTransactions() {
    if (transactionsFetchStatus !== FETCH_STATUSES.LOADING) 
      transactionsDispatch(getTransactionsListFetchStatusAction(FETCH_STATUSES.LOADING));
  }
  
  return (
    <section>
      <div className="container-x">
        <InfiniteScroll
          dataLength={transactions.length}
          next={refetchTransactions}
          hasMore={useHasMoreToFetchViaScroll(transactionsPage, transactionsNumberOfPages, transactionsFetchStatus)}
          >
          <ul className="list-2-x">
            { 
              useListRender(
                transactions, 
                transactionsFetchStatus,
                (item, i)=> <TransactionItem key={`transaction-${i}`} transaction={item} appType={AdminApp.TYPE} />, 
                (k)=> <li key={k}> <Loading /> </li>, 
                (k)=> <li key={k}> <Reload action={refetchTransactions} /> </li>,
                (k)=> <li key={k}> <EmptyList text="_empty.No_transaction" icon={transactionIcon} /> </li>, 
                (k)=> <li key={k}> <FetchMoreButton action={refetchTransactions} /> </li>,
              )
            }
          </ul>
        </InfiniteScroll>
      </div>
    </section>
  );
}
