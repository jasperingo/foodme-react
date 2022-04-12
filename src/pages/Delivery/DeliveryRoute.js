
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Forbidden from '../../components/Forbidden';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import DeliveryRouteProfile from '../../components/profile/DeliveryRouteProfile';
import Reload from '../../components/Reload';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import { useAppContext } from '../../hooks/contextHook';
import { useDeliveryRouteFetch } from '../../hooks/delilvery_route/deliveryRouteFetchHook';
import { useHeader } from '../../hooks/headerHook';

export default function DeliveryRoute() {

  const { ID } = useParams();

  const {
    deliveryFirm: { 
      deliveryFirm: {
        deliveryFirmToken
      }
    } 
  } = useAppContext();

  const [
    fetchDeliveryRoute,
    deliveryRoute,
    deliveryRouteLoading,
    deliveryRouteError,
    deliveryRouteID,
    unfetchDeliveryRoute
  ] = useDeliveryRouteFetch(deliveryFirmToken);

  useHeader({ 
    title: `${(deliveryRoute?.state || deliveryRoute?.origin_route?.state) ?? 'Loading...'} - Delivery Route`,
    headerTitle: '_delivery.Delivery_route'
  });

  useEffect(
    function() {
      if ((deliveryRoute !== null || deliveryRouteError !== null) && deliveryRouteID !== ID) 
        unfetchDeliveryRoute();
      else if (deliveryRoute === null && deliveryRouteError === null)
        fetchDeliveryRoute(ID);
    },
    [ID, deliveryRoute, deliveryRouteError, deliveryRouteID, fetchDeliveryRoute, unfetchDeliveryRoute]
  );

  return (
    <section>
      
      { deliveryRoute !== null && <DeliveryRouteProfile deliveryRoute={deliveryRoute} isDelieryFirm={true} /> }
      { deliveryRouteLoading && <Loading /> }
      { deliveryRouteError === NetworkErrorCodes.NOT_FOUND && <NotFound /> }
      { deliveryRouteError === NetworkErrorCodes.FORBIDDEN && <Forbidden /> }
      { deliveryRouteError === NetworkErrorCodes.UNKNOWN_ERROR && <Reload action={()=> fetchDeliveryRoute(ID)} /> }
      { deliveryRouteError === NetworkErrorCodes.NO_NETWORK_CONNECTION && <Reload message="_errors.No_netowrk_connection" action={()=> fetchDeliveryRoute(ID)} /> }
      
    </section>
  );
}
