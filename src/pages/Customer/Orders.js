
import React, { useEffect } from 'react';
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
  ] = useCustomerOrderList(customerToken);

  useEffect(
    function() { 
      if (!ordersLoaded && ordersError === null) 
        fetchCustomerOrders(customer.id); 
    },
    [customer.id, ordersLoaded, ordersError, fetchCustomerOrders]
  );
  
  return (
    <section>

      <OrderList 
        orders={orders}
        ordersPage={ordersPage}
        ordersError={ordersError}
        ordersLoaded={ordersLoaded}
        ordersLoading={ordersLoading}
        ordersNumberOfPages={ordersNumberOfPages}
        fetchOrders={()=> fetchCustomerOrders(customer.id)}
        refreshList={refreshCustomerOrders}
        />

    </section>
  );
}
