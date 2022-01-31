
import React from 'react';
import EmptyList from '../../components/EmptyList';
import FetchMoreButton from '../../components/FetchMoreButton';
import Loading from '../../components/Loading';
import OrderItem from '../../components/list_item/OrderItem';
import Reload from '../../components/Reload';
import { orderIcon } from '../../assets/icons';
import { useOrderList } from '../../hooks/order/orderListHook';
import { useHasMoreToFetchViaScroll, useRenderListFooter } from '../../hooks/viewHook';
import ScrollList from '../../components/list/ScrollList';
import { useAppContext } from '../../hooks/contextHook';

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

  const [
    orders, 
    ordersFetchStatus, 
    ordersPage, 
    ordersNumberOfPages, 
    refetch,
    refresh
  ] = useOrderList(customer.id, customerToken);
  
  return (
    <section>
      <div className="container-x">

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
            ()=> <li key="orders-footer"> <Loading /> </li>, 
            ()=> <li key="orders-footer"> <Reload action={refetch} /> </li>,
            ()=> <li key="orders-footer" className="col-span-2"> <EmptyList text="_empty.No_order" icon={orderIcon} /> </li>,
            ()=> <li key="orders-footer"> <FetchMoreButton action={refetch} /> </li>
          )}
          />

      </div>
    </section>
  );
}


