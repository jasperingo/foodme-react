
import React from 'react';
import { transactionIcon } from '../../assets/icons';
import EmptyList from '../EmptyList';
import FetchMoreButton from '../FetchMoreButton';
import Forbidden from '../Forbidden';
import ScrollList from './ScrollList';
import TransactionItem from '../list_item/TransactionItem';
import Loading from '../Loading';
import NotFound from '../NotFound';
import Reload from '../Reload';
import { useListFooter, useLoadOnListScroll } from '../../hooks/viewHook';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';

export default function TransactionList(
  {  
    transactions, 
    transactionsLoading, 
    transactionsLoaded, 
    transactionsError, 
    transactionsPage, 
    transactionsNumberOfPages,
    fetchTransactions,
    refreshList
  }
) {
  
  const listFooter = useListFooter();

  const loadOnScroll = useLoadOnListScroll();
  
  return (
    <div className="container-x">
      
      <ScrollList
        data={transactions}
        nextPage={fetchTransactions}
        refreshPage={refreshList}
        hasMore={loadOnScroll(transactionsPage, transactionsNumberOfPages, transactionsError)}
        className="list-2-x"
        renderDataItem={(item)=> (
          <TransactionItem key={`transaction-${item.id}`} transaction={item} />
        )}
        footer={listFooter([
          { 
            canRender: transactionsLoading, 
            render() { 
              return <li key="transactions-footer" className="list-2-x-col-span"> <Loading /> </li>;
            }
          }, 
          { 
            canRender: transactionsError === NetworkErrorCodes.UNKNOWN_ERROR, 
            render() { 
              return <li key="transactions-footer" className="list-2-x-col-span"> <Reload action={fetchTransactions} /> </li>;
            }
          },
          { 
            canRender: transactionsLoaded && transactions.length === 0, 
            render() { 
              return <li key="transactions-footer" className="list-2-x-col-span"> <EmptyList text="_empty.No_transaction" icon={transactionIcon} /> </li>;
            }
          },
          { 
            canRender: transactionsPage <= transactionsNumberOfPages, 
            render() { 
              return <li key="transactions-footer" className="list-2-x-col-span"> <FetchMoreButton action={fetchTransactions} /> </li>;
            }
          },
          { 
            canRender: transactionsError === NetworkErrorCodes.NOT_FOUND, 
            render() { 
              return <li key="transactions-footer" className="list-2-x-col-span"> <NotFound /> </li>;
            }
          },
          { 
            canRender: transactionsError === NetworkErrorCodes.FORBIDDEN, 
            render() { 
              return <li key="transactions-footer" className="list-2-x-col-span"> <Forbidden /> </li>;
            }
          },
          {
            canRender: transactionsError === NetworkErrorCodes.NO_NETWORK_CONNECTION,
            render() {
              return (
                <li key="transactions-footer" className="list-2-x-col-span">
                  <Reload message="_errors.No_netowrk_connection" action={fetchTransactions} />
                </li>
              );
            }
          }
        ])}
        />

    </div>
  );
}
