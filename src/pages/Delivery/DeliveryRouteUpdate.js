
import React from 'react';
import DeliveryRouteForm from '../../components/form/DeliveryRouteForm';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import { useLocationList } from '../../hooks/address/locationListHook';
import { useAppContext } from '../../hooks/contextHook';
import { useDeliveryRouteFetch } from '../../hooks/delilvery_route/deliveryRouteFetchHook';
import { useDeliveryRouteUpdate } from '../../hooks/delilvery_route/deliveryRoutetUpdateHook';
import { useHeader } from '../../hooks/headerHook';
import { useRenderOnDataFetched } from '../../hooks/viewHook';

export default function DeliveryRouteUpdate() {

  const {
    deliveryFirm: { 
      deliveryFirm: {
        deliveryFirmToken
      }
    } 
  } = useAppContext();

  const [
    deliveryRoute, 
    deliveryRouteFetchStatus,
    refetch
  ] = useDeliveryRouteFetch(deliveryFirmToken);

  const [
    locations, 
    locationsFetchStatus,
    retry
  ] = useLocationList();

  useHeader({ 
    title: `${(deliveryRoute?.state || deliveryRoute?.origin_route?.state) ?? 'Loading...'} - Delivery Route`,
    headerTitle: '_delivery.Edit_delivery_route'
  });

  const [
    onSubmit, 
    dialog, 
    formError, 
    formSuccess, 
    stateError, 
    cityError, 
    doorDeliveryError,
  ] = useDeliveryRouteUpdate();

  function retryLoad() {
    retry();
    refetch();
  }

  return (
    <section>
      <div className="container-x">
        {
          useRenderOnDataFetched(
            [locationsFetchStatus, deliveryRouteFetchStatus],
            ()=> (
              <DeliveryRouteForm 
                deliveryRoute={deliveryRoute}
                locations={locations}
                onSubmit={onSubmit}
                dialog={dialog}
                formError={formError}
                formSuccess={formSuccess}
                stateError={stateError} 
                cityError={cityError}
                doorDeliveryError={doorDeliveryError}
                />
            ),
            ()=> <Loading />,
            ()=> <Reload action={retryLoad} />
          )
        }
      </div>
    </section>
  );
}
