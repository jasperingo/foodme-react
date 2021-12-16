
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { transactionIcon } from '../../assets/icons';
import EmptyList from '../../components/EmptyList';
import FetchMoreButton from '../../components/FetchMoreButton';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import TransactionItem from '../../components/TransactionItem';
import { FETCH_STATUSES, TRANSACTION } from '../../context/AppActions';
import { API_URL, useAppContext } from '../../context/AppContext';
import { useHasMoreToFetchViaScroll, useListRender } from '../../context/AppHooks';


const getFetchStatusAction = (payload) => ({
  type: TRANSACTION.LIST_FETCH_STATUS_CHANGED,
  payload
});

export default function Transactions() {

  const { transactions: {
    transactions: {
      transactions,
      transactionsFetchStatus,
      transactionsPage,
      transactionsNumberOfPages
    }
  }, transactionsDispatch } = useAppContext();

  useEffect(()=>{

    async function fetchTransactions() {
      if (transactionsFetchStatus !== FETCH_STATUSES.LOADING) 
        return;
      
      try {
        let response = await fetch(`${API_URL}transactions.json`);

        if (!response.ok)
          throw new Error(response.status);
        
        let data = await response.json();

        // data.data = []
        // data.total_pages=0;
        
        transactionsDispatch({
          type: TRANSACTION.LIST_FETCHED,
          payload: {
            transactions: data.data,
            transactionsNumberOfPages: data.total_pages
          }
        });

      } catch (err) {
        transactionsDispatch(getFetchStatusAction(FETCH_STATUSES.ERROR));
      }
    }

    fetchTransactions();
  });

  function refetchTransactions() {
    if (transactionsFetchStatus === FETCH_STATUSES.LOADING) 
      return;
    
    transactionsDispatch(getFetchStatusAction(FETCH_STATUSES.LOADING));
  }


  return (
    <section className="flex-grow">
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
                (item, i)=> <TransactionItem key={`transaction-${i}`} transaction={item} />, 
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

