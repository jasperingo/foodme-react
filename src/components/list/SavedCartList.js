
import React from 'react';
import { cartIcon } from '../../assets/icons';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import { useListFooter, useLoadOnListScroll } from '../../hooks/viewHook';
import EmptyList from '../EmptyList';
import FetchMoreButton from '../FetchMoreButton';
import Forbidden from '../Forbidden';
import SavedCartItem from '../list_item/SavedCartItem';
import Loading from '../Loading';
import NotFound from '../NotFound';
import Reload from '../Reload';
import ScrollList from './ScrollList';

export default function SavedCartList(
  { 
    savedCarts, 
    savedCartsLoading, 
    savedCartsLoaded, 
    savedCartsError, 
    savedCartsPage, 
    savedCartsNumberOfPages, 
    fetchSavedCarts,
    refreshList 
  }
) {

  const listFooter = useListFooter();

  const loadOnScroll = useLoadOnListScroll();

  return (
    <div className="container-x">

      <ScrollList
        data={savedCarts}
        nextPage={fetchSavedCarts}
        refreshPage={refreshList}
        hasMore={loadOnScroll(savedCartsPage, savedCartsNumberOfPages, savedCartsError)}
        className="list-2-x"
        renderDataItem={(item)=> (
          <SavedCartItem key={`saved-cart-${item.id}`} cart={item} />
        )}
        footer={listFooter([
          { 
            canRender: savedCartsLoading, 
            render() { 
              return <li key="saved-cart-footer" className="list-2-x-col-span"> <Loading /> </li>; 
            }
          },
          { 
            canRender: savedCartsError === NetworkErrorCodes.UNKNOWN_ERROR, 
            render() { 
              return <li key="saved-cart-footer" className="list-2-x-col-span"> <Reload action={fetchSavedCarts} /> </li>; 
            }
          },
          { 
            canRender: savedCartsLoaded && savedCarts.length === 0, 
            render() { 
              return <li key="saved-cart-footer" className="list-2-x-col-span"> <EmptyList text="_empty.No_saved_cart" icon={cartIcon} /> </li>; 
            }
          },
          { 
            canRender: savedCartsPage <= savedCartsNumberOfPages, 
            render() { 
              return <li key="saved-cart-footer" className="list-2-x-col-span"> <FetchMoreButton action={fetchSavedCarts} /> </li>; 
            }
          },
          { 
            canRender: savedCartsError === NetworkErrorCodes.NOT_FOUND,
            return() { 
              return <li key="saved-cart-footer" className="list-2-x-col-span"> <NotFound /> </li>;
            }
          },

          { 
            canRender: savedCartsError === NetworkErrorCodes.FORBIDDEN,
            render() { 
              return <li key="saved-cart-footer" className="list-2-x-col-span"> <Forbidden /> </li>; 
            }
          },

          {
            canRender: savedCartsError === NetworkErrorCodes.NO_NETWORK_CONNECTION,
            render() {
              return (
                <li key="saved-cart-footer" className="list-2-x-col-span">
                  <Reload message="_errors.No_netowrk_connection" action={fetchSavedCarts} />
                </li>
              );
            }
          }
        ])}
        />

    </div>
  );
}
