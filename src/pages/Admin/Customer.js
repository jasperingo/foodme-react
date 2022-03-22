
import React, { useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Forbidden from '../../components/Forbidden';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import CustomerProfile from '../../components/profile/CustomerProfile';
import AddressList from '../../components/list/AddressList';
import OrderList from '../../components/profile/section/OrderList';
import ProductList from '../../components/profile/section/ProductList';
import TransactionList from '../../components/profile/section/TransactionList';
import Reload from '../../components/Reload';
import { useAppContext } from '../../hooks/contextHook';
import { useCustomerAddressList } from '../../hooks/customer/customerAddressListHook';
import { useCustomerFavoriteList } from '../../hooks/customer/customerFavoriteListHook';
import { useCustomerFetch } from '../../hooks/customer/customerFetchHook';
import { useCustomerOrderList } from '../../hooks/customer/customerOrderListHook';
import { useCustomerTransactionList } from '../../hooks/customer/customerTransactionListHook';
import { useHeader } from '../../hooks/headerHook';
import { useRenderOnDataFetched } from '../../hooks/viewHook';

const TAB_LINKS = [
  { title : '_order.Orders', href: '' },
  { title : '_extra.Favorites', href: '/favorites' },
  { title : '_transaction.Transactions', href: '/transactions' },
  { title : '_user.Addresses', href: '/addresses' },
];

function CustomerAddressesList() {

  const { 
    admin: { 
      admin: {
        adminToken
      }
    },
    customer: {
      customer: {
        customer: {
          customer,
        }
      } 
    } 
  } = useAppContext();
  
  const [
    fetch, 
    addresses, 
    addressesLoading, 
    addressesError, 
    addressesLoaded, 
    retryFetch,
    refresh
  ] = useCustomerAddressList(customer.id, adminToken);

  useEffect(
    function() {
      if (!addressesLoaded) fetch();
    }, 
    [addressesLoaded, fetch]
  );

  return (
    <AddressList 
      addresses={addresses}
      addressesLoading={addressesLoading}
      addressesError={addressesError}
      addressesLoaded={addressesLoaded}
      refetch={retryFetch}
      refresh={refresh}
      canEdit={false}
      />
  );
}

function CustomerTransactionsList() {

  const { 
    admin: { 
      admin: {
        adminToken
      }
    },
    customer: {
      customer: {
        customer: {
          customer,
        }
      } 
    } 
  } = useAppContext();
  
  const [
    transactions, 
    transactionsFetchStatus, 
    transactionsPage, 
    transactionsNumberOfPages, 
    refetch
  ] = useCustomerTransactionList(customer.id, adminToken);

  return (
    <TransactionList
      transactions={transactions}
      transactionsFetchStatus={transactionsFetchStatus}
      transactionsPage={transactionsPage}
      transactionsNumberOfPages={transactionsNumberOfPages}
      refetch={refetch}
      />
  );
}

function CustomerFavoritesList() {
  
  const { 
    admin: { 
      admin: {
        adminToken
      }
    },
    customer: {
      customer: {
        customer: {
          customer,
        }
      } 
    } 
  } = useAppContext();

  const [
    products, 
    productsFetchStatus, 
    productsPage, 
    productsNumberOfPages, 
    refetch
  ] = useCustomerFavoriteList(customer.id, adminToken);
  
  return (
    <ProductList 
      products={products.map(i=> i.product)}
      productsFetchStatus={productsFetchStatus}
      productsPage={productsPage}
      productsNumberOfPages={productsNumberOfPages}
      refetch={refetch}
      />
  );
}

function CustomerOrdersList() {

  const { 
    admin: { 
      admin: {
        adminToken
      }
    },
    customer: {
      customer: {
        customer: {
          customer,
        }
      } 
    } 
  } = useAppContext();

  const [
    orders, 
    ordersFetchStatus, 
    ordersPage, 
    ordersNumberOfPages, 
    refetch,
  ] = useCustomerOrderList(customer.id, adminToken);

  return (
    <OrderList 
      orders={orders}
      ordersFetchStatus={ordersFetchStatus}
      ordersPage={ordersPage}
      ordersNumberOfPages={ordersNumberOfPages}
      refetch={refetch}
      />
  );
}

export default function Customer() {

  const match = useRouteMatch();

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
            ()=> <CustomerProfile customer={customer} navLinks={TAB_LINKS} isAdmin={true} />,
            ()=> <Loading />,
            ()=> <Reload action={refetch} />,
            ()=> <NotFound />,
            ()=> <Forbidden />,
          )
        }
      </div>
      
      {
        customer && 
        <Switch>
          <Route path={`${match.url}/addresses`} render={()=> <CustomerAddressesList />} />
          <Route path={`${match.url}/transactions`} render={()=> <CustomerTransactionsList />} />
          <Route path={`${match.url}/favorites`} render={()=> <CustomerFavoritesList />} /> 
          <Route path={match.url} render={()=> <CustomerOrdersList />} />
        </Switch>
      }
        
    </section>
  );
}
