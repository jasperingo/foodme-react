
import React from 'react';
import EmptyList from '../../components/EmptyList';
import FetchMoreButton from '../../components/FetchMoreButton';
import Loading from '../../components/Loading';
import OrderItem from '../../components/list_item/OrderItem';
import Reload from '../../components/Reload';
import { orderIcon } from '../../assets/icons';
import { useHasMoreToFetchViaScroll, useRenderListFooter } from '../../hooks/viewHook';
import ScrollList from '../../components/list/ScrollList';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import { useCustomerOrderList } from '../../hooks/customer/customerOrderListHook';

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
    orders, 
    ordersFetchStatus, 
    ordersPage, 
    ordersNumberOfPages, 
    refetch,
    refresh
  ] = useCustomerOrderList(customer.id, customerToken);
  
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
            ()=> <li key="orders-footer" className="list-2-x-col-span"> <Loading /> </li>, 
            ()=> <li key="orders-footer" className="list-2-x-col-span"> <Reload action={refetch} /> </li>,
            ()=> <li key="orders-footer" className="list-2-x-col-span"> <EmptyList text="_empty.No_order" icon={orderIcon} /> </li>,
            ()=> <li key="orders-footer" className="list-2-x-col-span"> <FetchMoreButton action={refetch} /> </li>
          )}
          />

      </div>
    </section>
  );
}


