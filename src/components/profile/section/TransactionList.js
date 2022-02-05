
import React from 'react';
import { transactionIcon } from '../../../assets/icons';
import { useHasMoreToFetchViaScroll, useRenderListFooter } from '../../../hooks/viewHook';
import EmptyList from '../../EmptyList';
import FetchMoreButton from '../../FetchMoreButton';
import Forbidden from '../../Forbidden';
import ScrollList from '../../list/ScrollList';
import TransactionItem from '../../list_item/TransactionItem';
import Loading from '../../Loading';
import NotFound from '../../NotFound';
import Reload from '../../Reload';

export default function TransactionList({  transactions, transactionsFetchStatus, transactionsPage, transactionsNumberOfPages, refetch }) {
  
  return (
    <section>
      <div className="container-x">
        
        <ScrollList
          data={transactions}
          nextPage={refetch}
          hasMore={useHasMoreToFetchViaScroll(transactionsPage, transactionsNumberOfPages, transactionsFetchStatus)}
          className="list-2-x"
          renderDataItem={(item)=> (
            <TransactionItem key={`transaction-${item.id}`} transaction={item} />
          )}
          footer={useRenderListFooter(
            transactionsFetchStatus,
            ()=> <li key="transactions-footer"> <Loading /> </li>, 
            ()=> <li key="transactions-footer"> <Reload action={refetch} /> </li>,
            ()=> <li key="transactions-footer" className="col-span-2"> <EmptyList text="_empty.No_transaction" icon={transactionIcon} /> </li>,
            ()=> <li key="transactions-footer"> <FetchMoreButton action={refetch} /> </li>,
            ()=> <li key="transactions-footer"> <NotFound /> </li>,
            ()=> <li key="transactions-footer"> <Forbidden /> </li>,
          )}
          />

      </div>
    </section>
  );
}
