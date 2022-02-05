
import React from 'react';
// import { useLocation } from 'react-router-dom';
// import { orderIcon } from '../../assets/icons';
// import EmptyList from '../../components/EmptyList';
// import FetchMoreButton from '../../components/FetchMoreButton';
import OrderFilter from '../../components/filter/OrderFilter';
// import Loading from '../../components/Loading';
// import Reload from '../../components/Reload';
import { useHeader } from '../../hooks/headerHook';
import Order from '../../models/Order';


export default function Orders() {

  useHeader({
    topNavPaths: ['/messages'],
    title: 'Orders - DailyNeeds'
  });

  // const paths = useLocation().pathname.split('/');

  // const status = paths.length < 3 ? 'pending' : paths[paths.length-1];

  // const { 
  //   user: { user }, 
  //   orders: {
  //     orders: {
  //       orders,
  //       ordersStatus,
  //       ordersFetchStatus,
  //       ordersPage,
  //       ordersNumberOfPages
  //     }
  //   }, 
  //   ordersDispatch 
  // } = useAppContext();

  // useEffect(()=>{
    
  //   if (status !== ordersStatus) {
  //     ordersDispatch({
  //       type: ORDER.LIST_STATUS_FILTER_CHANGED,
  //       payload: status
  //     });
  //   } else if (ordersFetchStatus === FETCH_STATUSES.LOADING) {
  //     const api = new OrderApi(user.api_token);
  //     api.getListByAdminAndStatus(status, ordersDispatch);
  //   }

  // }, [status, user, ordersFetchStatus, ordersStatus, ordersDispatch]);

  // function refetchOrders() {
  //   if (ordersFetchStatus !== FETCH_STATUSES.LOADING) 
  //     ordersDispatch(getOrdersListFetchStatusAction(FETCH_STATUSES.LOADING));
  // }


  function change() {
    console.log('Changeing...')
  }

  return (
    <section>
      <div className="container-x">

        <OrderFilter statuses={Order.getStatuses()} status="" onFilterChange={change} />
        
        Orders...
        {/* <InfiniteScroll
          dataLength={orders.length}
          next={refetchOrders}
          hasMore={useHasMoreToFetchViaScroll(ordersPage, ordersNumberOfPages, ordersFetchStatus)}
          >
          <ul className="list-2-x">
            { 
              useListRender(
                orders, 
                ordersFetchStatus,
                (item, i)=> <OrderItem key={`order-${i}`} order={item} href={`/order/${item.id}`} appType={AdminApp.TYPE} />, 
                (k)=> <li key={k}> <Loading /> </li>, 
                (k)=> <li key={k}> <Reload action={refetchOrders} /> </li>,
                (k)=> <li key={k}> <EmptyList text="_empty.No_order" icon={orderIcon} /> </li>, 
                (k)=> <li key={k}> <FetchMoreButton action={refetchOrders} /> </li>,
              )
            }
          </ul>
        </InfiniteScroll> */}
      </div>
    </section>
  );
}
