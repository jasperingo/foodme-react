
import React from 'react';
import { deliveryIcon } from '../../assets/icons';
import EmptyList from '../../components/EmptyList';
import FetchMoreButton from '../../components/FetchMoreButton';
import Forbidden from '../../components/Forbidden';
import ScrollList from '../../components/list/ScrollList';
import DeliveryFirmItem from '../../components/list_item/DeliveryFirmItem';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import Reload from '../../components/Reload';
import { useAppContext } from '../../hooks/contextHook';
import { useDeliveryFirmList } from '../../hooks/delivery_firm/deliveryFirmListHook';
import { useHeader } from '../../hooks/headerHook';
import { useHasMoreToFetchViaScroll, useRenderListFooter } from '../../hooks/viewHook';

export default function DeliveryFirms() {

  useHeader({ 
    title: 'Delivery Firms - DailyNeeds',
    headerTitle: "_delivery.Delivery_firms"
  });

  const { 
    admin: { 
      admin: {
        adminToken
      }
    } 
  } = useAppContext();

  const [
    deliveryFirms, 
    deliveryFirmsFetchStatus, 
    deliveryFirmsPage, 
    deliveryFirmsNumberOfPages, 
    refetch
  ] = useDeliveryFirmList(adminToken);

  return (
    <section>
      
      <div className="container-x">

        <ScrollList
          data={deliveryFirms}
          nextPage={refetch}
          hasMore={useHasMoreToFetchViaScroll(deliveryFirmsPage, deliveryFirmsNumberOfPages, deliveryFirmsFetchStatus)}
          className="list-x"
          renderDataItem={(item)=> (
            <DeliveryFirmItem key={`delivery-firm-${item.id}`} deliveryFirm={item} />
          )}
          footer={useRenderListFooter(
            deliveryFirmsFetchStatus,
            ()=> <li key="delivery-firm-footer"> <Loading /> </li>, 
            ()=> <li key="delivery-firm-footer"> <Reload action={refetch} /> </li>,
            ()=> <li key="delivery-firm-footer"> <EmptyList text="_empty.No_delivery_firm" icon={deliveryIcon} /> </li>,
            ()=> <li key="delivery-firm-footer"> <FetchMoreButton action={refetch} /> </li>,
            ()=> <li key="delivery-firm-footer"> <NotFound /> </li>,
            ()=> <li key="delivery-firm-footer"> <Forbidden /> </li>,
          )}
          />

      </div>

    </section>
  );
}
