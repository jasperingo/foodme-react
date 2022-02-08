import React from 'react';
// import { useHistory } from 'react-router-dom';
import { orderIcon } from '../../assets/icons';
import EmptyList from '../../components/EmptyList';
import FetchMoreButton from '../../components/FetchMoreButton';
// import OrderFilter from '../../components/filter/OrderFilter';
import ScrollList from '../../components/list/ScrollList';
import OrderItem from '../../components/list_item/OrderItem';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import { useStoreOrderList } from '../../hooks/store/storeOrderListHook';
import { useHasMoreToFetchViaScroll, useRenderListFooter } from '../../hooks/viewHook';
// import Order from '../../models/Order';


export default function Orders() {

  useHeader({
    topNavPaths: ['/messages', '/cart'],
    title: 'Orders - DailyNeeds'
  });

  const { 
    store: { 
      store: {
        storeToken
      }
    } 
  } = useAppContext();

  const [
    orders, 
    ordersFetchStatus, 
    ordersPage, 
    ordersNumberOfPages, 
    refetch,
    refresh,
    //onStatusChange
  ] = useStoreOrderList(storeToken);

  // const history = useHistory()

  // const param = useURLQuery();

  // function change(value) {
  //   param.set('status', value);
  //   history.replace(`/orders?${param.toString()}`);
  //   onStatusChange();
  // }

  return (
    <section>
      <div className="container-x">

        {/* <OrderFilter statuses={Order.getStatuses()} status={param.get('status')} onFilterChange={change} /> */}
        
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