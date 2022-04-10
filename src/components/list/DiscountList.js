
import React from 'react';
import { discountIcon } from '../../assets/icons';
import { useListFooter, useLoadOnListScroll } from '../../hooks/viewHook';
import ScrollList from './ScrollList';
import DiscountItem from '../list_item/DiscountItem';
import EmptyList from '../EmptyList';
import FetchMoreButton from '../FetchMoreButton';
import Forbidden from '../Forbidden';
import Loading from '../Loading';
import NotFound from '../NotFound';
import Reload from '../Reload';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';

export default function DiscountList(
  { discounts, discountsLoading, discountsLoaded, discountsError, discountsPage, discountsNumberOfPages, fetchDiscounts, refreshList }
) {
  
  const listFooter = useListFooter();

  const loadOnScroll = useLoadOnListScroll();

  return (
    <div className="container-x">

      <ScrollList
        data={discounts}
        nextPage={fetchDiscounts}
        refreshPage={refreshList}
        hasMore={loadOnScroll(discountsPage, discountsNumberOfPages, discountsError)}
        className="list-3-x"
        renderDataItem={(item)=> (
          <DiscountItem key={`discount-${item.id}`} discount={item} />
        )}
        footer={listFooter([
          
          { 
            canRender: discountsLoading, 
            render() { 
              return <li key="discount-footer" className="list-3-x-col-span"> <Loading /> </li>;
            }
          }, 
          { 
            canRender: discountsError === NetworkErrorCodes.UNKNOWN_ERROR, 
            render() { 
              return <li key="discount-footer" className="list-3-x-col-span"> <Reload action={fetchDiscounts} /> </li>;
            }
          },
          { 
            canRender: discountsLoaded && discounts.length === 0, 
            render() { 
              return <li key="discount-footer" className="list-3-x-col-span"> <EmptyList text="_empty.No_discount" icon={discountIcon} /> </li>;
            }
          },
          { 
            canRender: discountsPage <= discountsNumberOfPages, 
            render() { 
              return <li key="discount-footer" className="list-3-x-col-span"> <FetchMoreButton action={fetchDiscounts} /> </li>;
            }
          },
          { 
            canRender: discountsError === NetworkErrorCodes.NOT_FOUND, 
            render() { 
              return <li key="discount-footer" className="list-3-x-col-span"> <NotFound /> </li>;
            }
          },
          { 
            canRender: discountsError === NetworkErrorCodes.FORBIDDEN, 
            render() { 
              return <li key="discount-footer" className="list-3-x-col-span"> <Forbidden /> </li>;
            }
          },
          {
            canRender: discountsError === NetworkErrorCodes.NO_NETWORK_CONNECTION,
            render() {
              return (
                <li key="discount-footer" className="list-3-x-col-span">
                  <Reload message="_errors.No_netowrk_connection" action={fetchDiscounts} />
                </li>
              );
            }
          },
        ])}
        />

    </div>
  );
}

