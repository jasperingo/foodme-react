
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FETCH_STATUSES, getOrdersListFetchStatusAction } from '../../context/AppActions';
import { useAppContext } from '../../context/AppContext';
import { useHasMoreToFetchViaScroll, useListRender } from '../../context/AppHooks';
import EmptyList from '../../components/EmptyList';
import FetchMoreButton from '../../components/FetchMoreButton';
import Loading from '../../components/Loading';
import OrderItem from '../../components/OrderItem';
import Reload from '../../components/Reload';
import { orderIcon } from '../../assets/icons';
import OrderApi from '../../api/OrderApi';

export default function Orders() {

  const { 
    user: { user },
    orders: {
      orders: {
        orders,
        ordersFetchStatus,
        ordersPage,
        ordersNumberOfPages
      }
    }, 
    ordersDispatch 
  } = useAppContext();

  useEffect(()=>{
    if (ordersFetchStatus === FETCH_STATUSES.LOADING) {
      const api = new OrderApi(user.api_token);
      api.getListByCustomer(user.id, ordersPage, ordersDispatch);
    }
  });

  function refetchOrders() {
    if (ordersFetchStatus !== FETCH_STATUSES.LOADING) 
      ordersDispatch(getOrdersListFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  return (
    <section className="flex-grow">
      <div className="container-x">
        <InfiniteScroll
          dataLength={orders.length}
          next={refetchOrders}
          hasMore={useHasMoreToFetchViaScroll(ordersPage, ordersNumberOfPages, ordersFetchStatus)}
          >
          <ul className="list-2-x">
            { 
              useListRender(
                orders, 
                ordersFetchStatus,
                (item, i)=> <OrderItem key={`order-${i}`} order={item} href={`/account/order/${item.id}`} />, 
                (k)=> <li key={k}> <Loading /> </li>, 
                (k)=> <li key={k}> <Reload action={refetchOrders} /> </li>,
                (k)=> <li key={k}> <EmptyList text="_empty.No_order" icon={orderIcon} /> </li>, 
                (k)=> <li key={k}> <FetchMoreButton action={refetchOrders} /> </li>,
              )
            }
          </ul>
        </InfiniteScroll>
      </div>
    </section>
  );
}


