
import React, { useEffect, useCallback } from 'react';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import { useCustomerOrderList } from '../../hooks/customer/customerOrderListHook';
import OrderList from '../../components/list/OrderList';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';

export default function Orders() {

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
    title: `${customer.user.name} - Orders`,
    headerTitle: "_order.Orders"
  });

  const [
    fetchCustomerOrders, 
    orders, 
    ordersLoading, 
    ordersLoaded, 
    ordersError,
    ordersPage, 
    ordersNumberOfPages, 
    setCustomerOrdersError, 
    refreshCustomerOrders
  ] = useCustomerOrderList(customer.id, customerToken);

  const fetch = useCallback(
    function() {
      if (!window.navigator.onLine && ordersError === null)
        setCustomerOrdersError(NetworkErrorCodes.NO_NETWORK_CONNECTION);
      else if (window.navigator.onLine && !ordersLoading) 
        fetchCustomerOrders();
    },
    [ordersError, ordersLoading, fetchCustomerOrders, setCustomerOrdersError]
  );

  useEffect(
    function() { if (!ordersLoaded) fetch(); },
    [ordersLoaded, fetch]
  );
  
  return (
    <section>
      <div className="container-x">

        <OrderList 
          orders={orders}
          ordersPage={ordersPage}
          ordersError={ordersError}
          ordersLoaded={ordersLoaded}
          ordersLoading={ordersLoading}
          ordersNumberOfPages={ordersNumberOfPages}
          getNextPage={fetch}
          retryFetch={()=> setCustomerOrdersError(null)}
          refreshList={refreshCustomerOrders}
          />

      </div>
    </section>
  );
}


