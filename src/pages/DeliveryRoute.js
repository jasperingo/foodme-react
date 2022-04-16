
import React, { useEffect } from 'react';
import { Switch, useRouteMatch, Route, useParams } from 'react-router-dom';
import AddButton from '../components/AddButton';
import EmptyList from '../components/EmptyList';
import Forbidden from '../components/Forbidden';
import SingleList from '../components/list/SingleList';
import RouteLocationItem from '../components/list_item/RouteLocationItem';
import RouteWeightItem from '../components/list_item/RouteWeightItem';
import Loading from '../components/Loading';
import NotFound from '../components/NotFound';
import DeliveryRouteProfile from '../components/profile/DeliveryRouteProfile';
import Reload from '../components/Reload';
import Tab from '../components/Tab';
import NetworkErrorCodes from '../errors/NetworkErrorCodes';
import { useDeliveryRouteFetch } from '../hooks/delilvery_route/deliveryRouteFetchHook';
import { useHeader } from '../hooks/headerHook';

const NAV_LINKS = [
  { title : '_delivery.Delivery_locations', href: '' },
  { title : '_delivery.Delivery_weights', href: '/weights' }
];

function RouteWeightList({ id, weights, isDelieryFirm }) {

  return(
    <div className="container-x">
      {
        isDelieryFirm && 
        <AddButton text="_delivery.Add_delivery_weight" href={`/delivery-route-weight/create?delivery_route=${id}`} />
      }

      <SingleList
        data={weights}
        className="list-3-x"
        renderDataItem={(item)=> (
          <RouteWeightItem key={`route-weight-${item.id}`} weight={item} isDelieryFirm={isDelieryFirm} />
        )}
        footer={(weights.length === 0 && <li key="route-weight-footer" className="list-3-x-col-span"> <EmptyList text="_empty.No_delivery_weight" /> </li>) || null}
        />
    </div>
  );
}

function RouteLocationList({ id, locations, isDelieryFirm }) {

  return (
    <div className="container-x">
      {
        isDelieryFirm && 
        <AddButton text="_delivery.Add_delivery_location" href={`/delivery-route-location/create?delivery_route=${id}`} />
      }

      <SingleList
        data={locations}
        className="list-3-x"
        renderDataItem={(item)=> (
          <RouteLocationItem key={`route-location-${item.id}`} location={item} isDelieryFirm={isDelieryFirm} />
        )}
        footer={(locations.length === 0 && <li key="route-location-footer" className="list-3-x-col-span"> <EmptyList text="_empty.No_delivery_location" /> </li>) || null}
        />
    </div>
  );
}

export default function DeliveryRoute({ userToken, isDelieryFirm }) {

  const { ID } = useParams();

  const match = useRouteMatch();

  const [
    fetchDeliveryRoute,
    deliveryRoute,
    deliveryRouteLoading,
    deliveryRouteError,
    deliveryRouteID,
    unfetchDeliveryRoute
  ] = useDeliveryRouteFetch(userToken);

  useHeader({ 
    title: `${(deliveryRoute?.name) ?? 'Loading...'} - Delivery Route`,
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
      
      { 
        deliveryRoute !== null && 
        <>
          <DeliveryRouteProfile deliveryRoute={deliveryRoute} isDelieryFirm={isDelieryFirm} /> 

          <div className="container-x">
            <Tab keyPrefix="delivery-route-tab" items={NAV_LINKS} />
          </div>
          
          <Switch>
            <Route 
              path={`${match.url}/weights`} 
              render={()=> (
                <RouteWeightList 
                  id={deliveryRoute.id} 
                  weights={deliveryRoute.delivery_route_weights} 
                  isDelieryFirm={isDelieryFirm} 
                  />
              )} 
              />
            <Route 
              path={match.url} 
              render={()=> (
                <RouteLocationList 
                  id={deliveryRoute.id} 
                  locations={deliveryRoute.delivery_route_locations} 
                  isDelieryFirm={isDelieryFirm} 
                  />
              )} 
              />
          </Switch>
        </>
      }

      {
        deliveryRoute === null &&
        <div className="container-x">
          { deliveryRouteLoading && <Loading /> }
          { deliveryRouteError === NetworkErrorCodes.NOT_FOUND && <NotFound /> }
          { deliveryRouteError === NetworkErrorCodes.FORBIDDEN && <Forbidden /> }
          { deliveryRouteError === NetworkErrorCodes.UNKNOWN_ERROR && <Reload action={()=> fetchDeliveryRoute(ID)} /> }
          { deliveryRouteError === NetworkErrorCodes.NO_NETWORK_CONNECTION && <Reload message="_errors.No_netowrk_connection" action={()=> fetchDeliveryRoute(ID)} /> }
        </div>
      }

    </section>
  );
}
