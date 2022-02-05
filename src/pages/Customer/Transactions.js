
import React from 'react';
import { transactionIcon } from '../../assets/icons';
import EmptyList from '../../components/EmptyList';
import FetchMoreButton from '../../components/FetchMoreButton';
import ScrollList from '../../components/list/ScrollList';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import TransactionItem from '../../components/list_item/TransactionItem';
import { useHasMoreToFetchViaScroll, useRenderListFooter } from '../../hooks/viewHook';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import { useCustomerTransactionList } from '../../hooks/customer/customerTransactionListHook';


export default function Transactions() {

  const {
    customer: {
      customer: {
        customer: {
          customer,
          customerToken
        }
      } 
    } 
  } = useAppContext();

  useHeader({ 
    title: `${customer.user.name} - Transactions`,
    headerTitle: "_transaction.Transactions"
  });
  
  const [
    transactions, 
    transactionsFetchStatus, 
    transactionsPage, 
    transactionsNumberOfPages, 
    refetch,
    refresh
  ] = useCustomerTransactionList(customer.id, customerToken);

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
            ()=> <li key="transactionfooter"> <Loading /> </li>, 
            ()=> <li key="transaction-footer"> <Reload action={refetch} /> </li>,
            ()=> <li key="transaction-footer" className="col-span-2"> <EmptyList text="_empty.No_transaction" icon={transactionIcon} /> </li>,
            ()=> <li key="transaction-footer"> <FetchMoreButton action={refetch} /> </li>
          )}
          />

      </div>
    </section>
  );
}

