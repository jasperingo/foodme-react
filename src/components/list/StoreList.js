
import React from 'react';
import { storeIcon } from '../../assets/icons';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import { useListFooter, useLoadOnListScroll } from '../../hooks/viewHook';
import EmptyList from '../EmptyList';
import FetchMoreButton from '../FetchMoreButton';
import Forbidden from '../Forbidden';
import StoreItem from '../list_item/StoreItem';
import Loading from '../Loading';
import NotFound from '../NotFound';
import Reload from '../Reload';
import ScrollList from './ScrollList';

export default function StoreList(
  { single, stores, storesLoading, storesLoaded, storesError, storesPage, storesNumberOfPages, fetchStores, refreshList }
) {
  
  const listFooter = useListFooter();

  const loadOnScroll = useLoadOnListScroll();

  return (
    <div className="container-x">

      <ScrollList
        data={stores}
        nextPage={fetchStores}
        refreshPage={refreshList}
        hasMore={!single && loadOnScroll(storesPage, storesNumberOfPages, storesError)}
        className="list-x"
        renderDataItem={(item)=> (
          <li key={`store-${item.id}`}> <StoreItem store={item} /> </li>
        )}
        footer={listFooter([
          
          { 
            canRender: storesLoading, 
            render() { 
              return <li key="store-footer" className="list-x-col-span"> <Loading /> </li>;
            }
          },

          { 
            canRender: storesError === NetworkErrorCodes.UNKNOWN_ERROR, 
            render() { 
              return <li key="store-footer" className="list-x-col-span"> <Reload action={fetchStores} /> </li>;
            }
          },

          { 
            canRender: storesLoaded && stores.length === 0, 
            render() { 
              return <li key="store-footer" className="list-x-col-span"> <EmptyList text="_empty.No_product" icon={storeIcon} /> </li>;
            }
          },

          { 
            canRender: !single && storesPage <= storesNumberOfPages, 
            render() { 
              return <li key="store-footer" className="list-x-col-span"> <FetchMoreButton action={fetchStores} /> </li>;
            }
          },

          { 
            canRender: storesError === NetworkErrorCodes.NOT_FOUND, 
            render() { 
              return <li key="store-footer" className="list-x-col-span"> <NotFound /> </li>;
            }
          },

          { 
            canRender: storesError === NetworkErrorCodes.FORBIDDEN, 
            render() { 
              return <li key="store-footer" className="list-x-col-span"> <Forbidden /> </li>;
            }
          },

          {
            canRender: storesError === NetworkErrorCodes.NO_NETWORK_CONNECTION,
            render() {
              return (
                <li key="store-footer" className="list-x-col-span">
                  <Reload message="_errors.No_netowrk_connection" action={fetchStores} />
                </li>
              );
            }
          },

        ])}
        />

    </div>
  );
}
