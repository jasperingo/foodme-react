import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import OrderFilter from '../../components/filter/OrderFilter';
import OrderList from '../../components/list/OrderList';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import { useStoreOrderList } from '../../hooks/store/storeOrderListHook';
import { useURLQuery } from '../../hooks/viewHook';
import Order from '../../models/Order';

export default function Orders() {

  const { 
    store: { 
      store: {
        store,
        storeToken
      }
    } 
  } = useAppContext();

  useHeader({ 
    title: `${store.user.name} - Orders`,
    topNavPaths: ['/messages', '/cart']
  });

  const param = new URLSearchParams();

  const history = useHistory()

  const [status] = useURLQuery(['status']);

  const [
    fetchStoreOrders,
    orders, 
    ordersLoaded,
    ordersLoading,
    ordersError,
    ordersPage, 
    ordersNumberOfPages,
    refreshStoreOrders
  ] = useStoreOrderList(storeToken);

  useEffect(
    function() { 
      if (!ordersLoaded && ordersError === null) 
        fetchStoreOrders(store.id, status); 
    },
    [store.id, status, ordersLoaded, ordersError, fetchStoreOrders]
  );

  function change(value) {
    
    if (value)
      param.set('status', value);
    else 
      param.delete('status');

    history.replace(`/orders?${param.toString()}`);
    
    refreshStoreOrders();
  }

  return (
    <section>
      <div className="container-x">
        <OrderFilter statuses={Order.getStatuses()} status={status} onFilterChange={change} />
      </div>

      <OrderList 
        orders={orders}
        ordersPage={ordersPage}
        ordersError={ordersError}
        ordersLoaded={ordersLoaded}
        ordersLoading={ordersLoading}
        ordersNumberOfPages={ordersNumberOfPages}
        fetchOrders={()=> fetchStoreOrders(store.id, status)}
        refreshList={refreshStoreOrders}
        />

    </section>
  );
}
