
import React from 'react';
import Forbidden from '../../components/Forbidden';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import DeliveryRouteProfile from '../../components/profile/DeliveryRouteProfile';
import Reload from '../../components/Reload';
import { useAppContext } from '../../hooks/contextHook';
import { useDeliveryRouteFetch } from '../../hooks/delilvery_route/deliveryRouteFetchHook';
import { useHeader } from '../../hooks/headerHook';
import { useRenderOnDataFetched } from '../../hooks/viewHook';

export default function DeliveryRoute() {

  const {
    admin: { 
      admin: {
        adminToken
      }
    } 
  } = useAppContext();

  const [
    deliveryRoute, 
    deliveryRouteFetchStatus,
    refetch
  ] = useDeliveryRouteFetch(adminToken);

  useHeader({ 
    title: `${(deliveryRoute?.state || deliveryRoute?.origin_route?.state) ?? 'Loading...'} - Delivery Route`,
    headerTitle: '_delivery.Delivery_route'
  });

  return (
    <section>
      {
        useRenderOnDataFetched(
          deliveryRouteFetchStatus,
          ()=> <DeliveryRouteProfile deliveryRoute={deliveryRoute} />,
          ()=> <div className="container-x"> <Loading /> </div>,
          ()=> <div className="container-x"> <Reload action={refetch} /> </div>,
          ()=> <div className="container-x"> <NotFound /> </div>,
          ()=> <div className="container-x"> <Forbidden /> </div>,
        )
      }
    </section>
  );
}
