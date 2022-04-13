
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import OrderFilter from '../../components/filter/OrderFilter';
import OrderList from '../../components/list/OrderList';
import { useHeader } from '../../hooks/headerHook';
import { useOrderList } from '../../hooks/order/orderListHook';
import { useURLQuery } from '../../hooks/viewHook';
import Order from '../../models/Order';

export default function Orders() {

  const param = new URLSearchParams();

  const history = useHistory()

  const [status] = useURLQuery(['status']);

  useHeader({
    topNavPaths: ['/messages'],
    title: 'Orders - DailyNeeds'
  });

  const [
    fetchOrders,
    orders, 
    ordersLoading,
    ordersLoaded,
    ordersError,
    ordersPage, 
    ordersNumberOfPages,
    refreshOrders
  ] = useOrderList();

  useEffect(
    function() { 
      if (!ordersLoaded && ordersError === null) 
        fetchOrders(status); 
    },
    [status, ordersLoaded, ordersError, fetchOrders]
  );

  function change(value) {
    
    if (value)
      param.set('status', value);
    else 
      param.delete('status');

    history.replace(`/orders?${param.toString()}`);
    
    refreshOrders();
  }

  return (
    <section>
      <div className="container-x">
        <OrderFilter 
          status={status} 
          onFilterChange={change} 
          statuses={Order.getStatuses()} 
          />
      </div>

      <OrderList 
        orders={orders}
        ordersPage={ordersPage}
        ordersError={ordersError}
        ordersLoaded={ordersLoaded}
        ordersLoading={ordersLoading}
        ordersNumberOfPages={ordersNumberOfPages}
        fetchOrders={()=> fetchOrders(status)}
        refreshList={refreshOrders}
        />
    </section>
  );
}
