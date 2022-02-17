
import { useCallback, useEffect } from "react";
import { DELIVERY_ROUTE, getDeliveryBaseRoutesListFetchStatusAction } from "../../context/actions/deliveryRouteActions";
import DeliveryFirmRepository from "../../repositories/DeliveryFirmRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";
import { useUpdateListFetchStatus } from "../viewHook";


export function useDeliveryFirmBaseRouteList(userToken) {

  const { 
    deliveryFirm: {
      deliveryFirmDispatch,
      deliveryFirm: {
        deliveryFirm,
        deliveryBaseRoutes,
        deliveryBaseRoutesPage,
        deliveryBaseRoutesLoading,
        deliveryBaseRoutesNumberOfPages,
        deliveryBaseRoutesFetchStatus
      } 
    }
  } = useAppContext();

  const listStatusUpdater = useUpdateListFetchStatus();

  const refetch = useCallback(
    ()=> {
      if (deliveryBaseRoutesFetchStatus !== FETCH_STATUSES.LOADING) 
        deliveryFirmDispatch(getDeliveryBaseRoutesListFetchStatusAction(FETCH_STATUSES.LOADING, true));
    },
    [deliveryFirmDispatch, deliveryBaseRoutesFetchStatus]
  );
  
  useEffect(
    ()=> {
      if (deliveryBaseRoutesLoading && deliveryBaseRoutesFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        deliveryFirmDispatch(getDeliveryBaseRoutesListFetchStatusAction(FETCH_STATUSES.ERROR, false));

      } else if (deliveryBaseRoutesLoading && deliveryBaseRoutesFetchStatus === FETCH_STATUSES.LOADING) {

        deliveryFirmDispatch(getDeliveryBaseRoutesListFetchStatusAction(FETCH_STATUSES.LOADING, false));
        
        const api = new DeliveryFirmRepository(userToken);
        api.getBaseRoutesList(deliveryFirm.id, deliveryBaseRoutesPage)
        .then(res=> {
          
          if (res.status === 200) {

            deliveryFirmDispatch({
              type: DELIVERY_ROUTE.BASE_LIST_FETCHED, 
              payload: {
                list: res.body.data, 
                numberOfPages: res.body.pagination.number_of_pages,
                fetchStatus: listStatusUpdater(
                  deliveryBaseRoutesPage, 
                  res.body.pagination.number_of_pages, 
                  deliveryBaseRoutes.length, 
                  res.body.data.length
                ),
              }
            });

          } else if (res.status === 404) {

            deliveryFirmDispatch(getDeliveryBaseRoutesListFetchStatusAction(FETCH_STATUSES.NOT_FOUND, false));

          } else if (res.status === 403) {

            deliveryFirmDispatch(getDeliveryBaseRoutesListFetchStatusAction(FETCH_STATUSES.FORBIDDEN, false));

          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          deliveryFirmDispatch(getDeliveryBaseRoutesListFetchStatusAction(FETCH_STATUSES.ERROR, false));
        });
      }
    },
    [
      deliveryFirm.id, 
      deliveryBaseRoutes, 
      deliveryBaseRoutesPage, 
      deliveryBaseRoutesLoading, 
      deliveryBaseRoutesFetchStatus, 
      userToken, 
      deliveryFirmDispatch, 
      listStatusUpdater
    ]
  );

  return [
    deliveryBaseRoutes, 
    deliveryBaseRoutesFetchStatus, 
    deliveryBaseRoutesPage, 
    deliveryBaseRoutesNumberOfPages, 
    refetch
  ];
}

