
import React, { useEffect } from 'react';
import { Route, Switch, useRouteMatch, useParams } from 'react-router-dom';
import Forbidden from '../../components/Forbidden';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import CustomerProfile from '../../components/profile/CustomerProfile';
import AddressList from '../../components/list/AddressList';
import Reload from '../../components/Reload';
import { useAppContext } from '../../hooks/contextHook';
import { useCustomerAddressList } from '../../hooks/customer/customerAddressListHook';
import { useCustomerFavoriteList } from '../../hooks/customer/customerFavoriteListHook';
import { useCustomerFetch } from '../../hooks/customer/customerFetchHook';
import { useCustomerOrderList } from '../../hooks/customer/customerOrderListHook';
import { useCustomerTransactionList } from '../../hooks/customer/customerTransactionListHook';
import { useHeader } from '../../hooks/headerHook';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import OrderList from '../../components/list/OrderList';
import ProductList from '../../components/list/ProductList';
import TransactionList from '../../components/list/TransactionList';

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
    fetchCustomerAddresses, 
    addresses, 
    addressesLoading, 
    addressesError, 
    addressesLoaded, 
  ] = useCustomerAddressList(adminToken);

  useEffect(
    function() {
      if (!addressesLoaded && addressesError === null) 
        fetchCustomerAddresses(customer.id);
    }, 
    [customer.id, addressesLoaded, addressesError, fetchCustomerAddresses]
  );

  return (
    <AddressList 
      canEdit={false}
      addresses={addresses}
      addressesLoading={addressesLoading}
      addressesError={addressesError}
      addressesLoaded={addressesLoaded}
      fetchAddresses={()=> fetchCustomerAddresses(customer.id)}
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
    fetchCustomerTransactions, 
    transactions, 
    transactionsLoading, 
    transactionsLoaded, 
    transactionsError,
    transactionsPage, 
    transactionsNumberOfPages
  ] = useCustomerTransactionList(adminToken);

  useEffect(
    function() { 
      if (!transactionsLoaded && transactionsError === null) 
        fetchCustomerTransactions(customer.id); 
    },
    [customer.id, transactionsLoaded, transactionsError, fetchCustomerTransactions]
  );

  return (
    <TransactionList
      transactions={transactions}
      transactionsPage={transactionsPage}
      transactionsError={transactionsError}
      transactionsLoading={transactionsLoading}
      transactionsLoaded={transactionsLoaded}
      transactionsNumberOfPages={transactionsNumberOfPages}
      fetchTransactions={()=> fetchCustomerTransactions(customer.id)}
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
    fetchCustomerProducts, 
    products, 
    productsLoading, 
    productsLoaded, 
    productsError,
    productsPage, 
    productsNumberOfPages, 
  ] = useCustomerFavoriteList(adminToken);
  
  useEffect(
    function() { 
      if (!productsLoaded && productsError === null) 
        fetchCustomerProducts(customer.id); 
    },
    [customer.id, productsLoaded, productsError, fetchCustomerProducts]
  );

  return (
    <ProductList 
      products={products.map(i=> i.product)}
      productsPage={productsPage}
      productsError={productsError}
      productsLoaded={productsLoaded}
      productsLoading={productsLoading}
      productsNumberOfPages={productsNumberOfPages}
      fetchProducts={()=> fetchCustomerProducts(customer.id)}
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
    fetchCustomerOrders, 
    orders, 
    ordersLoading, 
    ordersLoaded, 
    ordersError,
    ordersPage, 
    ordersNumberOfPages, 
  ] = useCustomerOrderList(adminToken);

  useEffect(
    function() { 
      if (!ordersLoaded && ordersError === null) 
        fetchCustomerOrders(customer.id); 
    },
    [customer.id, ordersLoaded, ordersError, fetchCustomerOrders]
  );

  return (
    <OrderList 
      orders={orders}
      ordersPage={ordersPage}
      ordersError={ordersError}
      ordersLoaded={ordersLoaded}
      ordersLoading={ordersLoading}
      ordersNumberOfPages={ordersNumberOfPages}
      fetchOrders={()=> fetchCustomerOrders(customer.id)}
      />
  );
}

export default function Customer() {

  const { ID } = useParams();

  const match = useRouteMatch();

  const { 
    admin: { 
      admin: {
        adminToken
      }
    } 
  } = useAppContext();

  const [
    fetchCustomer,
    customer,
    customerLoading,
    customerError,
    customerID,
    unfetchCustomer
  ] = useCustomerFetch(adminToken);

  useHeader({ 
    title: `${customer?.user.name ?? 'Loading...'} - Customer`,
    headerTitle: '_user.Customer'
  });

  useEffect(
    function() {
      if ((customer !== null || customerError !== null) && customerID !== ID) 
        unfetchCustomer();
      else if (customer === null && customerError === null)
        fetchCustomer(ID);
    },
    [ID, customer, customerError, customerID, fetchCustomer, unfetchCustomer]
  );
  
  return (
    <section>

      <div className="container-x">
        { customer !== null && <CustomerProfile customer={customer} isAdmin={true} navLinks={TAB_LINKS} /> }
        { customerLoading && <Loading /> }
        { customerError === NetworkErrorCodes.NOT_FOUND && <NotFound /> }
        { customerError === NetworkErrorCodes.FORBIDDEN && <Forbidden /> }
        { customerError === NetworkErrorCodes.UNKNOWN_ERROR && <Reload action={()=> fetchCustomer(ID)} /> }
        { customerError === NetworkErrorCodes.NO_NETWORK_CONNECTION && <Reload message="_errors.No_netowrk_connection" action={()=> fetchCustomer(ID)} /> }
      </div>
      
      {
        customer !== null && 
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
