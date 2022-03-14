
import React from 'react';
import { useHistory } from 'react-router-dom';
import { orderIcon } from '../../assets/icons';
import EmptyList from '../../components/EmptyList';
import FetchMoreButton from '../../components/FetchMoreButton';
import OrderFilter from '../../components/filter/OrderFilter';
import ScrollList from '../../components/list/ScrollList';
import OrderItem from '../../components/list_item/OrderItem';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import { useHeader } from '../../hooks/headerHook';
import { useOrderList } from '../../hooks/order/orderListHook';
import { useHasMoreToFetchViaScroll, useRenderListFooter, useURLQuery } from '../../hooks/viewHook';
import Order from '../../models/Order';


export default function Orders() {

  useHeader({
    topNavPaths: ['/messages'],
    title: 'Orders - DailyNeeds'
  });

  const [
    orders, 
    ordersFetchStatus, 
    ordersPage, 
    ordersNumberOfPages, 
    refetch,
    refresh,
    onStatusChange
  ] = useOrderList();

  const history = useHistory();

  const param = useURLQuery();

  function change(value) {
    if (value)
      param.set('status', value);
    else 
      param.delete('status');
    
    history.replace(`/orders?${param.toString()}`);
    onStatusChange();
  }

  return (
    <section>
      <div className="container-x">

        <OrderFilter 
          onFilterChange={change} 
          status={param.get('status')} 
          statuses={Order.getStatuses()} 
          />
        
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
            ()=> <li key="order-footer" className="list-2-x-col-span"> <Loading /> </li>, 
            ()=> <li key="order-footer" className="list-2-x-col-span"> <Reload action={refetch} /> </li>,
            ()=> <li key="order-footer" className="list-2-x-col-span"> <EmptyList text="_empty.No_order" icon={orderIcon} /> </li>,
            ()=> <li key="order-footer" className="list-2-x-col-span"> <FetchMoreButton action={refetch} /> </li>
          )}
          />

      </div>
    </section>
  );
}
