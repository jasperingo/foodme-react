
import React, { useEffect } from 'react';
import AddButton from '../../components/AddButton';
import RouteList from '../../components/list/RouteList';
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
    fetchDeliveryFirmRoutes,
    routes, 
    routesLoading,
    routesError,
    routesLoaded,
    routesPage, 
    routesNumberOfPages,
    refreshDeliveryFirmRoutes
  ] = useDeliveryFirmRouteList(deliveryFirmToken);

  useEffect(
    function() {
      if (!routesLoaded && routesError === null) 
        fetchDeliveryFirmRoutes(deliveryFirm.id); 
    },
    [deliveryFirm.id, routesError, routesLoaded, fetchDeliveryFirmRoutes]
  );

  return (
    <section>
      
      <div className="container-x">

        <AddButton text="_delivery.Add_delivery_route" href="/delivery-route/create" />
         
      </div>
      
      <RouteList 
        routes={routes}
        routesPage={routesPage}
        routesError={routesError}
        routesLoaded={routesLoaded}
        routesLoading={routesLoading}
        routesNumberOfPages={routesNumberOfPages}
        fetchRoutes={()=> fetchDeliveryFirmRoutes(deliveryFirm.id)}
        refreshList={refreshDeliveryFirmRoutes}
        />

    </section>
  );
}
