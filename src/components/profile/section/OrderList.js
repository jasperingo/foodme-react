
import React from 'react';
import { orderIcon } from '../../../assets/icons';
import { useHasMoreToFetchViaScroll, useRenderListFooter } from '../../../hooks/viewHook';
import EmptyList from '../../EmptyList';
import FetchMoreButton from '../../FetchMoreButton';
import Forbidden from '../../Forbidden';
import ScrollList from '../../list/ScrollList';
import OrderItem from '../../list_item/OrderItem';
import Loading from '../../Loading';
import NotFound from '../../NotFound';
import Reload from '../../Reload';

export default function OrderList({ orders, ordersFetchStatus, ordersPage, ordersNumberOfPages, refetch }) {
  return (
    <div>
			<div className="container-x">

				<ScrollList
          data={orders}
          nextPage={refetch}
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
            ()=> <li key="orders-footer"> <FetchMoreButton action={refetch} /> </li>,
						()=> <li key="orders-footer"> <NotFound /> </li>,
						()=> <li key="orders-footer"> <Forbidden /> </li>,
					)}
					/>

			</div>
		</div>
  );
}
