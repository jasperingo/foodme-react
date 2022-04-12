
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import OrderFilter from '../../components/filter/OrderFilter';
import OrderList from '../../components/list/OrderList';
import { useAppContext } from '../../hooks/contextHook';
import { useDeliveryFirmOrderList } from '../../hooks/delivery_firm/deliveryFirmOrderListHook';
import { useHeader } from '../../hooks/headerHook';
import { useURLQuery } from '../../hooks/viewHook';
import Order from '../../models/Order';

export default function Orders() {

  const { 
    deliveryFirm: { 
      deliveryFirm: {
        deliveryFirm,
        deliveryFirmToken
      }
    } 
  } = useAppContext();

  useHeader({
    topNavPaths: ['/messages'],
    title: `${deliveryFirm.user.name} - Orders`
  });

  const param = new URLSearchParams();

  const history = useHistory()

  const [status] = useURLQuery(['status']);

  const [
    fetchDeliveryFirmOrders,
    orders, 
    ordersLoaded,
    ordersLoading,
    ordersError,
    ordersPage, 
    ordersNumberOfPages,
    refreshDeliveryFirmOrders
  ] = useDeliveryFirmOrderList(deliveryFirmToken);

  useEffect(
    function() { 
      if (!ordersLoaded && ordersError === null) 
        fetchDeliveryFirmOrders(deliveryFirm.id, status); 
    },
    [deliveryFirm.id, status, ordersLoaded, ordersError, fetchDeliveryFirmOrders]
  );

  function change(value) {
    if (value)
      param.set('status', value);
    else 
      param.delete('status');

    history.replace(`/orders?${param.toString()}`);
    
    refreshDeliveryFirmOrders();
  }

  return (
    <section>
      <div className="container-x">

        <OrderFilter statuses={Order.getStatuses()} status={param.get('status')} onFilterChange={change} />
        
        <OrderList 
          orders={orders}
          ordersPage={ordersPage}
          ordersError={ordersError}
          ordersLoaded={ordersLoaded}
          ordersLoading={ordersLoading}
          ordersNumberOfPages={ordersNumberOfPages}
          fetchOrders={()=> fetchDeliveryFirmOrders(deliveryFirm.id, status)}
          refreshList={refreshDeliveryFirmOrders}
          />

      </div>
    </section>
  );
}
