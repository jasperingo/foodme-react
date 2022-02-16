
import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { orderIcon } from '../../assets/icons';
import EmptyList from '../../components/EmptyList';
import FetchMoreButton from '../../components/FetchMoreButton';
import OrderFilter from '../../components/filter/OrderFilter';
import ScrollList from '../../components/list/ScrollList';
import OrderItem from '../../components/list_item/OrderItem';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import { useAppContext } from '../../hooks/contextHook';
import { useDeliveryFirmOrderList } from '../../hooks/delivery_firm/deliveryFirmOrderListHook';
import { useHeader } from '../../hooks/headerHook';
import { useHasMoreToFetchViaScroll, useRenderListFooter, useURLQuery } from '../../hooks/viewHook';
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

  const [
    orders, 
    ordersFetchStatus, 
    ordersPage, 
    ordersNumberOfPages, 
    refetch,
    refresh,
    onStatusChange
  ] = useDeliveryFirmOrderList(deliveryFirmToken);

  const history = useHistory()

  const param = useURLQuery();

  function change(value) {
    param.set('status', value);
    history.replace(`/orders?${param.toString()}`);
    onStatusChange();
  }

  return (
    <section>
      <div className="container-x">

        <OrderFilter statuses={Order.getStatuses()} status={param.get('status')} onFilterChange={change} />
        
        <ScrollList
          data={orders}
          nextPage={refetch}
          refreshPage={refresh}
          hasMore={useHasMoreToFetchViaScroll(ordersPage, ordersNumberOfPages, ordersFetchStatus)}
          className="list-2-x"
          renderDataItem={(item)=> (
            <OrderItem key={`order-${item.id}`} order={item} />
          )}
          footer={useRenderListFooter(
            ordersFetchStatus,
            ()=> <li key="order-footer"> <Loading /> </li>, 
            ()=> <li key="order-footer"> <Reload action={refetch} /> </li>,
            ()=> <li key="order-footer" className="col-span-2"> <EmptyList text="_empty.No_order" icon={orderIcon} /> </li>,
            ()=> <li key="order-footer"> <FetchMoreButton action={refetch} /> </li>
          )}
          />

      </div>
    </section>
  );
}
