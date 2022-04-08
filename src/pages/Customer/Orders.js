
import React, { useEffect, useCallback } from 'react';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import { useCustomerOrderList } from '../../hooks/customer/customerOrderListHook';
import OrderList from '../../components/list/OrderList';

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
    refreshCustomerOrders
  ] = useCustomerOrderList(customer.id, customerToken);

  const ordersFetch = useCallback(
    function() {
      if (!ordersLoading) 
        fetchCustomerOrders();
    },
    [ordersLoading, fetchCustomerOrders]
  );

  useEffect(
    function() { if (!ordersLoaded) ordersFetch(); },
    [ordersLoaded, ordersFetch]
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
          fetchOrders={ordersFetch}
          refreshList={refreshCustomerOrders}
          />

      </div>
    </section>
  );
}


