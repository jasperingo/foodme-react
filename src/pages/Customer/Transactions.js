
import React from 'react';
import { transactionIcon } from '../../assets/icons';
import EmptyList from '../../components/EmptyList';
import FetchMoreButton from '../../components/FetchMoreButton';
import ScrollList from '../../components/list/ScrollList';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import TransactionItem from '../../components/list_item/TransactionItem';
import { useCustomerTransactionList } from '../../hooks/transaction/customerTransactionListHook';
import { useHasMoreToFetchViaScroll, useRenderListFooter } from '../../hooks/viewHook';


export default function Transactions() {

  const [
    transactions, 
    transactionsFetchStatus, 
    transactionsPage, 
    transactionsNumberOfPages, 
    refetch,
    refresh
  ] = useCustomerTransactionList();

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
            ()=> <li key="transactions-footer"> <Loading /> </li>, 
            ()=> <li key="transactions-footer"> <Reload action={refetch} /> </li>,
            ()=> <li key="transactions-footer" className="col-span-2"> <EmptyList text="_empty.No_transaction" icon={transactionIcon} /> </li>,
            ()=> <li key="transactions-footer"> <FetchMoreButton action={refetch} /> </li>
          )}
          />

      </div>
    </section>
  );
}

