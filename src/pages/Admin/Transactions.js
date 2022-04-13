
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import SelectFilter from '../../components/filter/SelectFilter';
import TransactionList from '../../components/list/TransactionList';
import { useHeader } from '../../hooks/headerHook';
import { useTransactionList } from '../../hooks/transaction/transactionListHook';
import { useTransactionTypeText } from '../../hooks/transaction/transactionViewHook';
import { useURLQuery } from '../../hooks/viewHook';
import Transaction from '../../models/Transaction';

export default function Transactions() {

  const { t } = useTranslation();

  const history = useHistory();

  const param = new URLSearchParams();

  const [type] = useURLQuery(['type']);

  const typeText = useTransactionTypeText();

  useHeader({
    topNavPaths: ['/messages'],
    title: 'Transactions - DailyNeeds'
  });

  const [
    fetchTransactions,
    transactions,  
    transactionsLoading,
    transactionsLoaded,
    transactionsError,
    transactionsPage, 
    transactionsNumberOfPages,
    refreshTransactions
  ] = useTransactionList();

  useEffect(
    function() { 
      if (!transactionsLoaded && transactionsError === null) 
        fetchTransactions(type); 
    },
    [type, transactionsLoaded, transactionsError, fetchTransactions]
  );
  
  function onFilterChange(value) {
    if (value)
      param.set('type', value);
    else 
      param.delete('type');

    history.replace(`/transactions?${param.toString()}`);

    refreshTransactions();
  }

  return (
    <section>
      <div className="container-x">
        <SelectFilter 
          value={type} 
          onFilterChange={onFilterChange} 
          options={Transaction.getTypes().map(i=> ({ text: t(typeText(i)), value: i }))} 
          /> 
      </div>

      <TransactionList
        transactions={transactions}
        transactionsPage={transactionsPage}
        transactionsError={transactionsError}
        transactionsLoading={transactionsLoading}
        transactionsLoaded={transactionsLoaded}
        transactionsNumberOfPages={transactionsNumberOfPages}
        fetchTransactions={()=> fetchTransactions(type)}
        refreshList={refreshTransactions}
        />
    </section>
  );
}
