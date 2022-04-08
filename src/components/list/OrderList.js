
import React from 'react';
import { orderIcon } from '../../assets/icons';
import EmptyList from '../EmptyList';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import { useListFooter, useLoadOnListScroll } from '../../hooks/viewHook';
import ScrollList from './ScrollList';
import OrderItem from '../list_item/OrderItem';
import FetchMoreButton from '../FetchMoreButton';
import Loading from '../Loading';
import NotFound from '../NotFound';
import Forbidden from '../Forbidden';
import Reload from '../Reload';

export default function OrderList(
  { orders, ordersLoading, ordersLoaded, ordersError, ordersPage, ordersNumberOfPages, getNextPage, retryFetch, refreshList }
) {

  const listFooter = useListFooter();

  const loadOnScroll = useLoadOnListScroll();

  return (
    <div className="container-x">

      <ScrollList
        data={orders}
        nextPage={getNextPage}
        refreshPage={refreshList}
        hasMore={loadOnScroll(ordersPage, ordersNumberOfPages, ordersError)}
        className="list-2-x"
        renderDataItem={(item)=> (
          <OrderItem key={`order-${item.id}`} order={item} />
        )}
        footer={listFooter([

          { 
            canRender: ordersLoading,
            render() { 
              return <li key="orders-footer" className="list-2-x-col-span"> <Loading /> </li>; 
            } 
          },

          { 
            canRender: ordersError === NetworkErrorCodes.UNKNOWN_ERROR,
            render() { 
              return <li key="orders-footer" className="list-2-x-col-span"> <Reload action={retryFetch} /> </li>;
            }
          },

          { 
            canRender: ordersLoaded && orders.length === 0,
            render() { 
              return <li key="orders-footer" className="list-2-x-col-span"> <EmptyList text="_empty.No_order" icon={orderIcon} /> </li>;
            }
          },

          { 
            canRender: ordersPage <= ordersNumberOfPages,
            render() { 
              return <li key="orders-footer" className="list-2-x-col-span"> <FetchMoreButton action={getNextPage} /> </li>; 
            }
          },

          { 
            canRender: ordersError === NetworkErrorCodes.NOT_FOUND,
            return() { 
              return <li key="orders-footer" className="list-2-x-col-span"> <NotFound /> </li>;
            }
          },

          { 
            canRender: ordersError === NetworkErrorCodes.FORBIDDEN,
            render() { 
              return <li key="orders-footer" className="list-2-x-col-span"> <Forbidden /> </li>; 
            }
          }

        ])}
        />

    </div>
  );
}
