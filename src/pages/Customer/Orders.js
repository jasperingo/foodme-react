
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ORDER, FETCH_STATUSES } from '../../context/AppActions';
import { API_URL, useAppContext } from '../../context/AppContext';
import { useHasMoreToFetchViaScroll, useListRender } from '../../context/AppHooks';
import EmptyList from '../../components/EmptyList';
import FetchMoreButton from '../../components/FetchMoreButton';
import Loading from '../../components/Loading';
import OrderItem from '../../components/OrderItem';
import Reload from '../../components/Reload';
import { orderIcon } from '../../assets/icons';

const getFetchStatusAction = (payload) => ({
  type: ORDER.LIST_FETCH_STATUS_CHANGED,
  payload
});

export default function Orders() {

  const { orders: {
    orders: {
      orders,
      ordersFetchStatus,
      ordersPage,
      ordersNumberOfPages
    }
  }, ordersDispatch } = useAppContext();


  useEffect(()=>{

    async function fetchOrders() {
      if (ordersFetchStatus !== FETCH_STATUSES.LOADING) 
        return;
      
      try {
        let response = await fetch(`${API_URL}orders.json`);

        if (!response.ok)
          throw new Error(response.status);
        
        let data = await response.json();
        
        ordersDispatch({
          type: ORDER.LIST_FETCHED,
          payload: {
            orders: data.data,
            ordersNumberOfPages: data.total_pages
          }
        });

      } catch (err) {
        ordersDispatch(getFetchStatusAction(FETCH_STATUSES.ERROR));
      }
    }

    fetchOrders();
  });

  function refetchOrders() {
    if (ordersFetchStatus === FETCH_STATUSES.LOADING) 
      return;
    
    ordersDispatch(getFetchStatusAction(FETCH_STATUSES.LOADING));
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


