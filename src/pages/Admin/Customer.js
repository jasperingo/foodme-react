
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import AddressApi from '../../api/AddressApi';
import OrderApi from '../../api/OrderApi';
import ProductApi from '../../api/ProductApi';
import TransactionApi from '../../api/TransactionApi';
import UserApi from '../../api/UserApi';
import AdminApp from '../../apps/AdminApp';
import { dateIcon, editIcon, emailIcon, messageIcon, orderIcon, phoneIcon, productIcon, transactionIcon } from '../../assets/icons';
import AddressItem from '../../components/AddressItem';
import EmptyList from '../../components/EmptyList';
import FetchMoreButton from '../../components/FetchMoreButton';
import Loading from '../../components/Loading';
import OrderItem from '../../components/OrderItem';
import ProductItem from '../../components/ProductItem';
import ProfileDetails from '../../components/ProfileDetails';
import ProfileHeader from '../../components/ProfileHeader';
import Reload from '../../components/Reload';
import Tab from '../../components/Tab';
import TransactionItem from '../../components/TransactionItem';
import { 
  CUSTOMER, 
  FETCH_STATUSES, 
  getAddressesListFetchStatusAction, 
  getCustomerFetchStatusAction, 
  getOrdersListFetchStatusAction, 
  getProductsListFetchStatusAction,
  getTransactionsListFetchStatusAction
} from '../../context/AppActions';
import { useAppContext } from '../../context/AppContext';
import { useDataRender, useHasMoreToFetchViaScroll, useListRender } from '../../context/AppHooks';

const TAB_LINKS = [
  { title : '_order.Orders', href: '' },
  { title : '_extra.Favorites', href: '/favorites' },
  { title : '_transaction.Transactions', href: '/transactions' },
  { title : '_user.Addresses', href: '/addresses' },
];


function Favorites() {
  
  const { ID } = useParams();

  const { 
    user: { user }, 
    customers: {
      products: {
        products,
        productsFetchStatus,
        productsPage,
        productsNumberOfPages
      }
    }, 
    customersDispatch 
  } = useAppContext();

  useEffect(()=> {
    if (productsFetchStatus === FETCH_STATUSES.LOADING) {
      const api = new ProductApi(user.api_token);
      api.getListByCustomer(ID, productsPage, customersDispatch);
    }
  }, [ID, user, productsFetchStatus, productsPage, customersDispatch]);

  function refetchProducts() {
    if (productsFetchStatus !== FETCH_STATUSES.LOADING) 
      customersDispatch(getProductsListFetchStatusAction(FETCH_STATUSES.LOADING));
  }
  
  return (
    <div>
      <InfiniteScroll 
        dataLength={products.length}
        next={refetchProducts}
        hasMore={useHasMoreToFetchViaScroll(productsPage, productsNumberOfPages, productsFetchStatus)}
        >
        <ul className="list-x">
          { 
            useListRender(
              products, 
              productsFetchStatus,
              (item, i)=> <li key={`prod-${i}`}> <ProductItem prod={item} /> </li>, 
              (k)=> <li key={k}> <Loading /> </li>, 
              (k)=> <li key={k}> <Reload action={refetchProducts} /> </li>,
              (k)=> <li key={k}> <EmptyList text="_empty.No_product" Icon={productIcon} /> </li>, 
              (k)=> <li key={k}> <FetchMoreButton action={refetchProducts} /> </li>,
            )
          }
        </ul>
      </InfiniteScroll>
      </div>
  );
}

function Transactions() {
  
  const { ID } = useParams();

  const { 
    user: { user }, 
    customers: {
      transactions: {
        transactions,
        transactionsFetchStatus,
        transactionsPage,
        transactionsNumberOfPages
      }
    }, 
    customersDispatch 
  } = useAppContext();

  useEffect(()=>{
    if (transactionsFetchStatus === FETCH_STATUSES.LOADING) {
      const api = new TransactionApi(user.api_token);
      api.getListByCustomer(ID, transactionsPage, customersDispatch);
    }
  });

  function refetchTransactions() {
    if (transactionsFetchStatus !== FETCH_STATUSES.LOADING) 
      customersDispatch(getTransactionsListFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  return (
    <div>
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
  );
}

function Addresses() {
  
  const { 
    user: { user }, 
    customers: {
      customer: {
        customer
      },
      addresses: {
        addresses,
        addressesFetchStatus
      }
    }, 
    customersDispatch 
  } = useAppContext();

  useEffect(()=> {
    if (addressesFetchStatus === FETCH_STATUSES.LOADING) {
      const api = new AddressApi(user.api_token);
      api.getListByCustomer(customer.id, customersDispatch);
    }
  }, [user, customer, addressesFetchStatus, customersDispatch]);

  function refetchAddresses() {
    if (addressesFetchStatus !== FETCH_STATUSES.LOADING) 
      customersDispatch(getAddressesListFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  return (
    <div>
      <ul className="list-2-x">
        { 
          useListRender(
            addresses, 
            addressesFetchStatus,
            (item, i)=> <AddressItem key={`address-${i}`} address={item} />,
            (k)=> <li key={k}> <Loading /> </li>, 
            (k)=> <li key={k}> <Reload action={refetchAddresses} /> </li>,
          )
        }
      </ul>
    </div>
  );
}

function Orders() {

  const { 
    user: { user }, 
    customers: {
      customer: {
        customer
      },
      orders: {
        orders,
        ordersFetchStatus,
        ordersPage,
        ordersNumberOfPages
      }
    }, 
    customersDispatch 
  } = useAppContext();

  useEffect(()=> {
    if (ordersFetchStatus === FETCH_STATUSES.LOADING) {
      const api = new OrderApi(user.api_token);
      api.getListByCustomer(customer.id, ordersPage, customersDispatch);
    }
  });

  function refetchOrders() {
    if (ordersFetchStatus !== FETCH_STATUSES.LOADING) 
      customersDispatch(getOrdersListFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  return (
    <div>
      <InfiniteScroll
        dataLength={orders.length}
        next={refetchOrders}
        hasMore={useHasMoreToFetchViaScroll(ordersPage, ordersNumberOfPages, ordersFetchStatus)}
        >
        <ul className="list-2-x">
          { 
            useListRender(
              orders, 
              ordersFetchStatus,
              (item, i)=> <OrderItem key={`order-${i}`} order={item} href={`/order/${item.id}`} appType={AdminApp.TYPE} />, 
              (k)=> <li key={k}> <Loading /> </li>, 
              (k)=> <li key={k}> <Reload action={refetchOrders} /> </li>,
              (k)=> <li key={k}> <EmptyList text="_empty.No_order" icon={orderIcon} /> </li>, 
              (k)=> <li key={k}> <FetchMoreButton action={refetchOrders} /> </li>,
            )
          }
        </ul>
      </InfiniteScroll>
    </div>
  );
}

export default function Customer() {

  const match = useRouteMatch();

  const cID = parseInt(useParams().ID);

  const { 
    user: { user }, 
    customers: {
      customer: {
        customer,
        customerFetchStatus
      }
    }, 
    customersDispatch 
  } = useAppContext();

  useEffect(()=> {
    if (customer !== null && cID !== customer.id) {
      customersDispatch({ type: CUSTOMER.UNFETCH });
    } else if (customerFetchStatus === FETCH_STATUSES.LOADING) {
      const api = new UserApi(user.api_token);
      api.get(cID, customersDispatch);
    }
  }, [cID, user, customer, customerFetchStatus, customersDispatch]);

  function refetchCustomer() {
    if (customerFetchStatus !== FETCH_STATUSES.LOADING) 
      customersDispatch(getCustomerFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  return (
    <section>
      <div className="container-x">
        { 
          useDataRender(
            customer, 
            customerFetchStatus,
            ()=> (
              <div>
                <ProfileHeader
                  photo={`/photos/customer/${customer.photo}`}
                  name={`${customer.first_name} ${customer.last_name}`}
                  links={[
                    {
                      href: `/messages/${customer.id}`,
                      title: '_message.Message',
                      icon: messageIcon
                    },
                    {
                      href: `/customer/${customer.id}/update`,
                      title: '_extra.Edit',
                      icon: editIcon
                    }
                  ]}
                  />

                <ProfileDetails 
                  details={[
                    {
                      icon: phoneIcon,
                      data: customer.phone_number
                    },
                    {
                      icon: emailIcon,
                      data: customer.email
                    },
                    {
                      icon: dateIcon,
                      data: customer.created_at
                    }
                  ]}
                  />

                <Tab items={TAB_LINKS} />

                <Switch>
                  <Route path={`${match.url}/addresses`} render={()=> <Addresses />} />
                  <Route path={`${match.url}/transactions`} render={()=> <Transactions />} />
                  <Route path={`${match.url}/favorites`} render={()=> <Favorites />} />
                  <Route path={match.url} render={()=> <Orders />} />
                </Switch>
              </div>
            ),
            (k)=> <Loading />, 
            (k)=> <Reload action={refetchCustomer} />,
          )
        }
      </div>
    </section>
  );
}
