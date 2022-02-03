
import React from 'react';
// import { Route, Switch } from 'react-router-dom';
import Forbidden from '../../components/Forbidden';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import CustomerProfile from '../../components/profile/CustomerProfile';
import Reload from '../../components/Reload';
import { useAppContext } from '../../hooks/contextHook';
import { useCustomerFetch } from '../../hooks/customer/customerFetchHook';
import { useHeader } from '../../hooks/headerHook';
import { useRenderOnDataFetched } from '../../hooks/viewHook';

const TAB_LINKS = [
  { title : '_order.Orders', href: '' },
  { title : '_extra.Favorites', href: '/favorites' },
  { title : '_transaction.Transactions', href: '/transactions' },
  { title : '_user.Addresses', href: '/addresses' },
];


// function Favorites() {
  
//   const { ID } = useParams();

//   const { 
//     user: { user }, 
//     customers: {
//       products: {
//         products,
//         productsFetchStatus,
//         productsPage,
//         productsNumberOfPages
//       }
//     }, 
//     customersDispatch 
//   } = useAppContext();

//   useEffect(()=> {
//     if (productsFetchStatus === FETCH_STATUSES.LOADING) {
//       const api = new ProductApi(user.api_token);
//       api.getListByCustomer(ID, productsPage, customersDispatch);
//     }
//   }, [ID, user, productsFetchStatus, productsPage, customersDispatch]);

//   function refetchProducts() {
//     if (productsFetchStatus !== FETCH_STATUSES.LOADING) 
//       customersDispatch(getProductsListFetchStatusAction(FETCH_STATUSES.LOADING));
//   }
  
//   return (
//     <div>
//       <InfiniteScroll 
//         dataLength={products.length}
//         next={refetchProducts}
//         hasMore={useHasMoreToFetchViaScroll(productsPage, productsNumberOfPages, productsFetchStatus)}
//         >
//         <ul className="list-x">
//           { 
//             useListRender(
//               products, 
//               productsFetchStatus,
//               (item, i)=> <li key={`prod-${i}`}> <ProductItem prod={item} /> </li>, 
//               (k)=> <li key={k}> <Loading /> </li>, 
//               (k)=> <li key={k}> <Reload action={refetchProducts} /> </li>,
//               (k)=> <li key={k}> <EmptyList text="_empty.No_product" Icon={productIcon} /> </li>, 
//               (k)=> <li key={k}> <FetchMoreButton action={refetchProducts} /> </li>,
//             )
//           }
//         </ul>
//       </InfiniteScroll>
//       </div>
//   );
// }

// function Transactions() {
  
//   const { ID } = useParams();

//   const { 
//     user: { user }, 
//     customers: {
//       transactions: {
//         transactions,
//         transactionsFetchStatus,
//         transactionsPage,
//         transactionsNumberOfPages
//       }
//     }, 
//     customersDispatch 
//   } = useAppContext();

//   useEffect(()=>{
//     if (transactionsFetchStatus === FETCH_STATUSES.LOADING) {
//       const api = new TransactionApi(user.api_token);
//       api.getListByCustomer(ID, transactionsPage, customersDispatch);
//     }
//   });

//   function refetchTransactions() {
//     if (transactionsFetchStatus !== FETCH_STATUSES.LOADING) 
//       customersDispatch(getTransactionsListFetchStatusAction(FETCH_STATUSES.LOADING));
//   }

//   return (
//     <div>
//       <InfiniteScroll
//         dataLength={transactions.length}
//         next={refetchTransactions}
//         hasMore={useHasMoreToFetchViaScroll(transactionsPage, transactionsNumberOfPages, transactionsFetchStatus)}
//         >
//         <ul className="list-2-x">
//           { 
//             useListRender(
//               transactions, 
//               transactionsFetchStatus,
//               (item, i)=> <TransactionItem key={`transaction-${i}`} transaction={item} />, 
//               (k)=> <li key={k}> <Loading /> </li>, 
//               (k)=> <li key={k}> <Reload action={refetchTransactions} /> </li>,
//               (k)=> <li key={k}> <EmptyList text="_empty.No_transaction" icon={transactionIcon} /> </li>, 
//               (k)=> <li key={k}> <FetchMoreButton action={refetchTransactions} /> </li>,
//             )
//           }
//         </ul>
//       </InfiniteScroll>
//     </div>
//   );
// }

// function Addresses() {
  
//   const { 
//     user: { user }, 
//     customers: {
//       customer: {
//         customer
//       },
//       addresses: {
//         addresses,
//         addressesFetchStatus
//       }
//     }, 
//     customersDispatch 
//   } = useAppContext();

//   useEffect(()=> {
//     if (addressesFetchStatus === FETCH_STATUSES.LOADING) {
//       const api = new AddressApi(user.api_token);
//       api.getListByCustomer(customer.id, customersDispatch);
//     }
//   }, [user, customer, addressesFetchStatus, customersDispatch]);

//   function refetchAddresses() {
//     if (addressesFetchStatus !== FETCH_STATUSES.LOADING) 
//       customersDispatch(getAddressesListFetchStatusAction(FETCH_STATUSES.LOADING));
//   }

//   return (
//     <div>
//       <ul className="list-2-x">
//         { 
//           useListRender(
//             addresses, 
//             addressesFetchStatus,
//             (item, i)=> <AddressItem key={`address-${i}`} address={item} />,
//             (k)=> <li key={k}> <Loading /> </li>, 
//             (k)=> <li key={k}> <Reload action={refetchAddresses} /> </li>,
//           )
//         }
//       </ul>
//     </div>
//   );
// }

// function Orders() {

//   const { 
//     user: { user }, 
//     customers: {
//       customer: {
//         customer
//       },
//       orders: {
//         orders,
//         ordersFetchStatus,
//         ordersPage,
//         ordersNumberOfPages
//       }
//     }, 
//     customersDispatch 
//   } = useAppContext();

//   useEffect(()=> {
//     if (ordersFetchStatus === FETCH_STATUSES.LOADING) {
//       const api = new OrderApi(user.api_token);
//       api.getListByCustomer(customer.id, ordersPage, customersDispatch);
//     }
//   });

//   function refetchOrders() {
//     if (ordersFetchStatus !== FETCH_STATUSES.LOADING) 
//       customersDispatch(getOrdersListFetchStatusAction(FETCH_STATUSES.LOADING));
//   }

//   return (
//     <div>
//       <InfiniteScroll
//         dataLength={orders.length}
//         next={refetchOrders}
//         hasMore={useHasMoreToFetchViaScroll(ordersPage, ordersNumberOfPages, ordersFetchStatus)}
//         >
//         <ul className="list-2-x">
//           { 
//             useListRender(
//               orders, 
//               ordersFetchStatus,
//               (item, i)=> <OrderItem key={`order-${i}`} order={item} href={`/order/${item.id}`} appType={AdminApp.TYPE} />, 
//               (k)=> <li key={k}> <Loading /> </li>, 
//               (k)=> <li key={k}> <Reload action={refetchOrders} /> </li>,
//               (k)=> <li key={k}> <EmptyList text="_empty.No_order" icon={orderIcon} /> </li>, 
//               (k)=> <li key={k}> <FetchMoreButton action={refetchOrders} /> </li>,
//             )
//           }
//         </ul>
//       </InfiniteScroll>
//     </div>
//   );
// }

export default function Customer() {

  const { 
    admin: { 
      admin: {
        adminToken
      }
    } 
  } = useAppContext();

  const [
    customer, 
    customerFetchStatus, 
    refetch
  ] = useCustomerFetch(adminToken);

  useHeader({ 
    title: `${customer?.user.name ?? 'Loading...'} - Customer`,
    headerTitle: '_user.Customer'
  });

  return (
    <section>

      <div className="container-x">
        {
          useRenderOnDataFetched(
            customerFetchStatus,
            ()=> <CustomerProfile customer={customer} navLinks={TAB_LINKS} />,
            ()=> <Loading />,
            ()=> <Reload action={refetch} />,
            ()=> <NotFound />,
            ()=> <Forbidden />,
          )
        }
      </div>

      {/* <Switch>
        <Route path={`${match.url}/addresses`} render={()=> <Addresses />} />
        <Route path={`${match.url}/transactions`} render={()=> <Transactions />} />
        <Route path={`${match.url}/favorites`} render={()=> <Favorites />} />
        <Route path={match.url} render={()=> <Orders />} />
      </Switch> */}
        
    </section>
  );
}
