
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { transactionIcon } from '../../assets/icons';
import EmptyList from '../../components/EmptyList';
import FetchMoreButton from '../../components/FetchMoreButton';
import SelectFilter from '../../components/filter/SelectFilter';
import ScrollList from '../../components/list/ScrollList';
import TransactionItem from '../../components/list_item/TransactionItem';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import { useHeader } from '../../hooks/headerHook';
import { useTransactionList } from '../../hooks/transaction/transactionListHook';
import { useTransactionTypeText } from '../../hooks/transaction/transactionViewHook';
import { useHasMoreToFetchViaScroll, useRenderListFooter, useURLQuery } from '../../hooks/viewHook';
import Transaction from '../../models/Transaction';

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
    refresh,
    onTypeFilterChange
  ] = useTransactionList();

  const { t } = useTranslation();

  const history = useHistory();

  const param = useURLQuery();

  const typeText = useTransactionTypeText();

  useEffect(
    function() {
      onTypeFilterChange(param.get('type'));
    },
    [param, onTypeFilterChange]
  );
  
  function onFilterChange(value) {
    if (value)
      param.set('type', value);
    else 
      param.delete('type');

    history.replace(`/transactions?${param.toString()}`);
  }

  return (
    <section>
      <div className="container-x">

        <SelectFilter 
          value={param.get('type')} 
          onFilterChange={onFilterChange} 
          options={Transaction.getTypes().map(i=> ({ text: t(typeText(i)), value: i }))} 
          /> 
        
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
