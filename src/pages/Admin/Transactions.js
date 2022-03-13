
import React from 'react';
import { transactionIcon } from '../../assets/icons';
import EmptyList from '../../components/EmptyList';
import FetchMoreButton from '../../components/FetchMoreButton';
import ScrollList from '../../components/list/ScrollList';
import TransactionItem from '../../components/list_item/TransactionItem';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import { useHeader } from '../../hooks/headerHook';
import { useTransactionList } from '../../hooks/transaction/transactionListHook';
import { useHasMoreToFetchViaScroll, useRenderListFooter } from '../../hooks/viewHook';

export default function Transactions() {

  useHeader({
    topNavPaths: ['/messages'],
    title: 'Transactions - DailyNeeds'
  });

  const [
    transactions, 
    transactionsFetchStatus, 
    transactionsPage, 
    transactionsNumberOfPages, 
    refetch,
    refresh
  ] = useTransactionList();
  
  return (
    <section>
      <div className="container-x">
        
        <ScrollList
          data={transactions}
          nextPage={refetch}
          refreshPage={refresh}
          hasMore={useHasMoreToFetchViaScroll(transactionsPage, transactionsNumberOfPages, transactionsFetchStatus)}
          className="list-2-x"
          renderDataItem={(item)=> (
            <TransactionItem key={`transaction-${item.id}`} transaction={item} />
          )}
          footer={useRenderListFooter(
            transactionsFetchStatus,
            ()=> <li key="transactions-footer" className="list-2-x-col-span"> <Loading /> </li>, 
            ()=> <li key="transactions-footer" className="list-2-x-col-span"> <Reload action={refetch} /> </li>,
            ()=> <li key="transactions-footer" className="list-2-x-col-span"> <EmptyList text="_empty.No_transaction" icon={transactionIcon} /> </li>,
            ()=> <li key="transactions-footer" className="list-2-x-col-span"> <FetchMoreButton action={refetch} /> </li>
          )}
          />

      </div>
    </section>
  );
}
