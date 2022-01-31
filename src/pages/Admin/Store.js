
import React from 'react';


// const NAV_LINKS = [
//   { title : '_product.Products', href: '' },
//   { title : '_extra.Reviews', href: '/reviews' },
//   { title : '_discount.Discounts', href: '/discounts' },
//   { title : '_order.Orders', href: '/orders' },
//   { title : '_transaction.Transactions', href: '/transactions' }
// ];


// function Transactions() {
  
  //   const { ID } = useParams();
  
  //   const { 
  //     user: { user }, 
  //     stores: {
  //       transactions: {
  //         transactions,
  //         transactionsFetchStatus,
  //         transactionsPage,
  //         transactionsNumberOfPages
  //       }
  //     }, 
  //     storesDispatch 
  //   } = useAppContext();
  
  //   useEffect(()=>{
  //     if (transactionsFetchStatus === FETCH_STATUSES.LOADING) {
  //       const api = new TransactionApi(user.api_token);
  //       api.getListByStore(ID, transactionsPage, storesDispatch);
  //     }
  //   });
  
  //   function refetchTransactions() {
  //     if (transactionsFetchStatus !== FETCH_STATUSES.LOADING) 
  //       storesDispatch(getTransactionsListFetchStatusAction(FETCH_STATUSES.LOADING));
  //   }
  
  //   return (
  //     <div>
  //       <div className="container-x">
  //         <InfiniteScroll
  //           dataLength={transactions.length}
  //           next={refetchTransactions}
  //           hasMore={useHasMoreToFetchViaScroll(transactionsPage, transactionsNumberOfPages, transactionsFetchStatus)}
  //           >
  //           <ul className="list-2-x">
  //             { 
  //               useListRender(
  //                 transactions, 
  //                 transactionsFetchStatus,
  //                 (item, i)=> <TransactionItem key={`transaction-${i}`} transaction={item} />, 
  //                 (k)=> <li key={k}> <Loading /> </li>, 
  //                 (k)=> <li key={k}> <Reload action={refetchTransactions} /> </li>,
  //                 (k)=> <li key={k}> <EmptyList text="_empty.No_transaction" icon={transactionIcon} /> </li>, 
  //                 (k)=> <li key={k}> <FetchMoreButton action={refetchTransactions} /> </li>,
  //               )
  //             }
  //           </ul>
  //         </InfiniteScroll>
  //       </div>
  //     </div>
  //   );
  // }
  
  // function Orders() {
  
  //   const { ID } = useParams();
    
  //   const { 
  //     user: { user }, 
  //     stores: {
  //       orders: {
  //         orders,
  //         ordersFetchStatus,
  //         ordersPage,
  //         ordersNumberOfPages
  //       }
  //     }, 
  //     storesDispatch 
  //   } = useAppContext();
  
  //   useEffect(()=> {
  //     if (ordersFetchStatus === FETCH_STATUSES.LOADING) {
  //       const api = new OrderApi(user.api_token);
  //       api.getListByStore(ID, ordersPage, storesDispatch);
  //     }
  //   });
  
  //   function refetchOrders() {
  //     if (ordersFetchStatus !== FETCH_STATUSES.LOADING) 
  //       storesDispatch(getOrdersListFetchStatusAction(FETCH_STATUSES.LOADING));
  //   }
  
  //   return (
  //     <div>
  //        <div className="container-x">
            
  //         <InfiniteScroll
  //           dataLength={orders.length}
  //           next={refetchOrders}
  //           hasMore={useHasMoreToFetchViaScroll(ordersPage, ordersNumberOfPages, ordersFetchStatus)}
  //           >
  //           <ul className="list-2-x">
  //             { 
  //               useListRender(
  //                 orders, 
  //                 ordersFetchStatus,
  //                 (item, i)=> <OrderItem key={`order-${i}`} order={item} href={`/order/${item.id}`} appType={AdminApp.TYPE} />, 
  //                 (k)=> <li key={k}> <Loading /> </li>, 
  //                 (k)=> <li key={k}> <Reload action={refetchOrders} /> </li>,
  //                 (k)=> <li key={k}> <EmptyList text="_empty.No_order" icon={orderIcon} /> </li>, 
  //                 (k)=> <li key={k}> <FetchMoreButton action={refetchOrders} /> </li>,
  //               )
  //             }
  //           </ul>
  //         </InfiniteScroll>
  //       </div>
  //     </div>
  //   );
  // }

export default function Store() {
  return <div></div>;
}
