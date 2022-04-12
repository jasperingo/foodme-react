
import React from 'react';
import { deliveryIcon } from '../../assets/icons';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import { useListFooter, useLoadOnListScroll } from '../../hooks/viewHook';
import EmptyList from '../EmptyList';
import FetchMoreButton from '../FetchMoreButton';
import Forbidden from '../Forbidden';
import DeliveryFirmItem from '../list_item/DeliveryFirmItem';
import Loading from '../Loading';
import NotFound from '../NotFound';
import Reload from '../Reload';
import ScrollList from './ScrollList';

export default function DeliveryFirmList(
  { single, deliveryFirms, deliveryFirmsLoading, deliveryFirmsLoaded, deliveryFirmsError, deliveryFirmsPage, deliveryFirmsNumberOfPages, fetchDeliveryFirms, refreshList }
) {

  const listFooter = useListFooter();

  const loadOnScroll = useLoadOnListScroll();

  return (
    <div className="container-x">

      <ScrollList
        data={deliveryFirms}
        nextPage={fetchDeliveryFirms}
        refreshPage={refreshList}
        hasMore={!single && loadOnScroll(deliveryFirmsPage, deliveryFirmsNumberOfPages, deliveryFirmsError)}
        className="list-x"
        renderDataItem={(item)=> (
          <DeliveryFirmItem key={`delivery-firm-${item.id}`} deliveryFirm={item} />
        )}
        footer={listFooter([
          
          { 
            canRender: deliveryFirmsLoading, 
            render() { 
              return <li key="delivery-firm-footer" className="list-x-col-span"> <Loading /> </li>;
            }
          },

          { 
            canRender: deliveryFirmsError === NetworkErrorCodes.UNKNOWN_ERROR, 
            render() { 
              return <li key="delivery-firm-footer" className="list-x-col-span"> <Reload action={fetchDeliveryFirms} /> </li>;
            }
          },

          { 
            canRender: deliveryFirmsLoaded && deliveryFirms.length === 0, 
            render() { 
              return <li key="delivery-firm-footer" className="list-x-col-span"> <EmptyList text="_empty.No_product" icon={deliveryIcon} /> </li>;
            }
          },

          { 
            canRender: !single && deliveryFirmsPage <= deliveryFirmsNumberOfPages, 
            render() { 
              return <li key="delivery-firm-footer" className="list-x-col-span"> <FetchMoreButton action={fetchDeliveryFirms} /> </li>;
            }
          },

          { 
            canRender: deliveryFirmsError === NetworkErrorCodes.NOT_FOUND, 
            render() { 
              return <li key="delivery-firm-footer" className="list-x-col-span"> <NotFound /> </li>;
            }
          },

          { 
            canRender: deliveryFirmsError === NetworkErrorCodes.FORBIDDEN, 
            render() { 
              return <li key="delivery-firm-footer" className="list-x-col-span"> <Forbidden /> </li>;
            }
          },

          {
            canRender: deliveryFirmsError === NetworkErrorCodes.NO_NETWORK_CONNECTION,
            render() {
              return (
                <li key="delivery-firm-footer" className="list-x-col-span">
                  <Reload message="_errors.No_netowrk_connection" action={fetchDeliveryFirms} />
                </li>
              );
            }
          },

        ])}
        />

    </div>
  )
}
