
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLocation } from 'react-router';
import { orderIcon } from '../../assets/icons';
import EmptyList from '../../components/EmptyList';
import FetchMoreButton from '../../components/FetchMoreButton';
import Loading from '../../components/Loading';
import OrderItem from '../../components/OrderItem';
import Reload from '../../components/Reload';
import Tab from '../../components/Tab';
import { FETCH_STATUSES, ORDER } from '../../context/AppActions';
import { API_URL, useAppContext } from '../../context/AppContext';
import { useHasMoreToFetchViaScroll, useListRender } from '../../context/AppHooks';

const TAB_LINKS = [
  { title : '_order.Pending', href: '' },
  { title : '_order.Processing', href: '/processing' },
  { title : '_order.Delivered', href: '/delivered' },
  { title : '_order.In_transit', href: '/in-transit' },
  { title : '_order.Declined', href: '/declined' },
  { title : '_order.Cancelled', href: '/cancelled' },
  { title : '_order.Returned', href: '/returned' }
];

const getFetchStatusAction = (payload) => ({
  type: ORDER.LIST_FETCH_STATUS_CHANGED,
  payload
});

export default function Orders() {

  const paths = useLocation().pathname.split('/');

  const status = paths.length < 3 ? 'pending' : paths[paths.length-1];

  const { orders: {
    orders: {
      orders,
      ordersStatus,
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
        let response = await fetch(`${API_URL}orders.json?status=${status}`);

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
    
    
    if (status !== ordersStatus) {
      ordersDispatch({
        type: ORDER.LIST_STATUS_FILTER_CHANGED,
        payload: status
      });
    }

    fetchOrders();

  }, [status, ordersFetchStatus, ordersStatus, ordersDispatch]);

  function refetchOrders() {
    if (ordersFetchStatus === FETCH_STATUSES.LOADING) 
      return;
    
    ordersDispatch(getFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  return (
    <section>
      
      <div className="container-x">

        <Tab items={ TAB_LINKS } keyPrefix="orders-tab" />
      
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
                (item, i)=> <OrderItem key={`order-${i}`} order={item} href={`/order/${item.id}`} />, 
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

