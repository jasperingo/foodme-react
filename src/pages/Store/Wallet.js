
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import { transactionIcon } from '../../assets/icons';
import EmptyList from '../../components/EmptyList';
import FetchMoreButton from '../../components/FetchMoreButton';
import H4Heading from '../../components/H4Heading';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import TransactionItem from '../../components/TransactionItem';
import { FETCH_STATUSES, TRANSACTION } from '../../context/AppActions';
import { API_URL, useAppContext } from '../../context/AppContext';
import { useHasMoreToFetchViaScroll, useListRender, useMoneyFormat } from '../../context/AppHooks';

const getFetchStatusAction = (payload) => ({
  type: TRANSACTION.LIST_FETCH_STATUS_CHANGED,
  payload
});

export default function Wallet() {

  const { t } = useTranslation();

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
        <div className="my-4 rounded py-4 px-2 bg-color-gray md:flex md:items-center">
          <h3 className="text-3xl md:flex-grow">{ useMoneyFormat(4000) }</h3>
          <div className="mt-2">
            <button className="btn-color-primary rounded-full p-2">{ t('_transaction.Withdraw') }</button>
          </div>
        </div>

        <div>
          <H4Heading text="_transaction.Transactions" />
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
      </div>
    </section>
  );
}
