
import { useCallback, useEffect } from "react";
import { DELIVERY_ROUTE, getDeliveryRoutesListFetchStatusAction } from "../../context/actions/deliveryRouteActions";
import DeliveryFirmRepository from "../../repositories/DeliveryFirmRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";
import { useUpdateListFetchStatus } from "../viewHook";


export function useDeliveryFirmRouteList(userToken) {

  const { 
    deliveryFirm: {
      deliveryFirmDispatch,
      deliveryFirm: {
        deliveryFirm,
        routes,
        routesPage,
        routesLoading,
        routesNumberOfPages,
        routesFetchStatus
      } 
    }
  } = useAppContext();

  const listStatusUpdater = useUpdateListFetchStatus();

  const refetch = useCallback(
    ()=> {
      if (routesFetchStatus !== FETCH_STATUSES.LOADING) 
        deliveryFirmDispatch(getDeliveryRoutesListFetchStatusAction(FETCH_STATUSES.LOADING, true));
    },
    [deliveryFirmDispatch, routesFetchStatus]
  );
  
  useEffect(
    ()=> {
      if (routesLoading && routesFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        deliveryFirmDispatch(getDeliveryRoutesListFetchStatusAction(FETCH_STATUSES.ERROR, false));

      } else if (routesLoading && routesFetchStatus === FETCH_STATUSES.LOADING) {

        deliveryFirmDispatch(getDeliveryRoutesListFetchStatusAction(FETCH_STATUSES.LOADING, false));
        
        const api = new DeliveryFirmRepository(userToken);
        api.getRoutesList(deliveryFirm.id, routesPage)
        .then(res=> {
          
          if (res.status === 200) {
            deliveryFirmDispatch({
              type: DELIVERY_ROUTE.LIST_FETCHED, 
              payload: {
                list: res.body.data, 
                numberOfPages: res.body.pagination.number_of_pages,
                fetchStatus: listStatusUpdater(
                  routesPage, 
                  res.body.pagination.number_of_pages, 
                  routes.length, 
                  res.body.data.length
                ),
              }
            });
          } else if (res.status === 404) {

            deliveryFirmDispatch(getDeliveryRoutesListFetchStatusAction(FETCH_STATUSES.NOT_FOUND, false));

          } else if (res.status === 403) {

            deliveryFirmDispatch(getDeliveryRoutesListFetchStatusAction(FETCH_STATUSES.FORBIDDEN, false));

          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          deliveryFirmDispatch(getDeliveryRoutesListFetchStatusAction(FETCH_STATUSES.ERROR, false));
        });
      }
    },
    [deliveryFirm.id, routes, routesPage, routesLoading, routesFetchStatus, userToken, deliveryFirmDispatch, listStatusUpdater]
  );

  return [routes, routesFetchStatus, routesPage, routesNumberOfPages, refetch];
}

