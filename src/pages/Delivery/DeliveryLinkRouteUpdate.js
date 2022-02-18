
import React from 'react';
import DeliveryLinkRouteForm from '../../components/form/DeliveryLinkRouteForm';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import { useAppContext } from '../../hooks/contextHook';
import { useDeliveryLinkRouteUpdate } from '../../hooks/delilvery_route/deliveryLinkRouteUpdateHook';
import { useDeliveryRouteFetch } from '../../hooks/delilvery_route/deliveryRouteFetchHook';
import { useDeliveryFirmBaseRouteList } from '../../hooks/delivery_firm/deliveryFirmBaseRouteListHook';
import { useHeader } from '../../hooks/headerHook';
import { useRenderOnDataFetched } from '../../hooks/viewHook';

export default function DeliveryLinkRouteUpdate() {

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
    deliveryBaseRoutes, 
    deliveryBaseRoutesFetchStatus, 
    deliveryBaseRoutesPage, 
    deliveryBaseRoutesNumberOfPages, 
    deliveryBaseRoutesRefetch
  ] = useDeliveryFirmBaseRouteList();

  const  [
    onSubmit, 
    dialog, 
    formError, 
    formSuccess, 
    originError, 
    destinationError,
  ] = useDeliveryLinkRouteUpdate();

  useHeader({ 
    title: `${deliveryRoute?.origin_route?.state ?? 'Loading...'} - Delivery Route`,
    headerTitle: '_delivery.Edit_delivery_link_route'
  });

  return (
    <section>
      <div className="container-x">
        {
          useRenderOnDataFetched(
            deliveryRouteFetchStatus,
            ()=> (
              <DeliveryLinkRouteForm 
                deliveryRoute={deliveryRoute}
                deliveryRoutes={deliveryBaseRoutes}
                deliveryRoutesFetchStatus={deliveryBaseRoutesFetchStatus}
                deliveryRoutesPage={deliveryBaseRoutesPage}
                deliveryRoutesNumberOfPages={deliveryBaseRoutesNumberOfPages}
                deliveryRouteRefetch={deliveryBaseRoutesRefetch}

                onSubmit={onSubmit}
                dialog={dialog}
                formError={formError}
                formSuccess={formSuccess}
                originError={originError} 
                destinationError={destinationError}
                />
            ),
            ()=> <Loading />,
            ()=> <Reload action={refetch} />
          )
        }
      </div>
    </section>
  );
}
