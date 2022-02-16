
import React from 'react';
import AddButton from '../../components/AddButton';
import RouteList from '../../components/profile/section/RouteList';
import { useAppContext } from '../../hooks/contextHook';
import { useDeliveryFirmRouteList } from '../../hooks/delivery_firm/deliveryFirmRouteListHook';
import { useHeader } from '../../hooks/headerHook';

export default function DeliveryRoutes() {

  const { 
    deliveryFirm: { 
      deliveryFirm: {
        deliveryFirm,
        deliveryFirmToken
      }
    } 
  } = useAppContext();

  useHeader({ 
    title: `${deliveryFirm.user.name} - Delivery Routes`,
    topNavPaths: ['/messages']
  });

  const [
    routes, 
    routesFetchStatus, 
    routesPage, 
    routesNumberOfPages, 
    refetch
  ] = useDeliveryFirmRouteList(deliveryFirmToken);

  return (
    <section>
      
      <div className="container-x">

        <AddButton text="_delivery.Add_delivery_route" href="/delivery-route/create" />

      </div>

      <RouteList 
        routes={routes}
        routesFetchStatus={routesFetchStatus}
        routesPage={routesPage}
        routesNumberOfPages={routesNumberOfPages}
        refetch={refetch}
        />

    </section>
  );
}
