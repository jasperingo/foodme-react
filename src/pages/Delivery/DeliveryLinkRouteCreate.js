
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import DeliveryLinkRouteForm from '../../components/form/DeliveryLinkRouteForm';
import { useDeliveryLinkRouteCreate } from '../../hooks/delilvery_route/deliveryLinkRouteCreateHook';
import { useDeliveryFirmBaseRouteList } from '../../hooks/delivery_firm/deliveryFirmBaseRouteListHook';
import { useHeader } from '../../hooks/headerHook';

export default function DeliveryLinkRouteCreate() {

  useHeader({ 
    title: `Create Delivery Route - DailyNeeds`,
    headerTitle: '_delivery.Add_delivery_link_route'
  });

  const [
    deliveryBaseRoutes, 
    deliveryBaseRoutesFetchStatus, 
    deliveryBaseRoutesPage, 
    deliveryBaseRoutesNumberOfPages, 
    refetch
  ] = useDeliveryFirmBaseRouteList();

  const  [
    onSubmit, 
    id, 
    dialog, 
    formError, 
    formSuccess, 
    originError, 
    destinationError,
  ] = useDeliveryLinkRouteCreate();

  const history = useHistory();

  useEffect(
    ()=> {
      if (id) {
        history.push(`/delivery-route/${id}`);
      }
    }, 
    [id, history]
  );

  return (
    <section>
      <div className="container-x">
        <DeliveryLinkRouteForm 
          deliveryRoute={{}}
          deliveryRoutes={deliveryBaseRoutes}
          deliveryRoutesFetchStatus={deliveryBaseRoutesFetchStatus}
          deliveryRoutesPage={deliveryBaseRoutesPage}
          deliveryRoutesNumberOfPages={deliveryBaseRoutesNumberOfPages}
          deliveryRouteRefetch={refetch}

          onSubmit={onSubmit}
          dialog={dialog}
          formError={formError}
          formSuccess={formSuccess}
          originError={originError} 
          destinationError={destinationError}
          />
      </div>
    </section>
  );
}
