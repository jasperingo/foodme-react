
import { useCallback, useEffect } from "react";
import { DELIVERY_FIRM, getDeliveryFirmsListFetchStatusAction } from "../../context/actions/deliveryFirmActions";
import DeliveryFirmRepository from "../../repositories/DeliveryFirmRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";
import { useUpdateListFetchStatus } from "../viewHook";


export function useDeliveryFirmList(userToken) {

  const { 
    deliveryFirm: {
      deliveryFirmDispatch,
      deliveryFirm: {
        deliveryFirms,
        deliveryFirmsPage,
        deliveryFirmsLoading,
        deliveryFirmsNumberOfPages,
        deliveryFirmsFetchStatus
      } 
    }
  } = useAppContext();

  const listStatusUpdater = useUpdateListFetchStatus();

  const refetch = useCallback(
    ()=> {
      if (deliveryFirmsFetchStatus !== FETCH_STATUSES.LOADING) 
        deliveryFirmDispatch(getDeliveryFirmsListFetchStatusAction(FETCH_STATUSES.LOADING, true));
    },
    [deliveryFirmDispatch, deliveryFirmsFetchStatus]
  );

  const refresh = useCallback(
    ()=> {
      deliveryFirmDispatch({ type: DELIVERY_FIRM.LIST_UNFETCHED });
    },
    [deliveryFirmDispatch]
  );
  
  useEffect(
    ()=> {
      if (deliveryFirmsLoading && deliveryFirmsFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        deliveryFirmDispatch(getDeliveryFirmsListFetchStatusAction(FETCH_STATUSES.ERROR, false));

      } else if (deliveryFirmsLoading && deliveryFirmsFetchStatus === FETCH_STATUSES.LOADING) {

        deliveryFirmDispatch(getDeliveryFirmsListFetchStatusAction(FETCH_STATUSES.LOADING, false));
        
        const api = new DeliveryFirmRepository(userToken);
        api.getList(deliveryFirmsPage)
        .then(res=> {
          
          if (res.status === 200) {

            deliveryFirmDispatch({
              type: DELIVERY_FIRM.LIST_FETCHED, 
              payload: {
                list: res.body.data, 
                numberOfPages: res.body.pagination.number_of_pages,
                fetchStatus: listStatusUpdater(
                  deliveryFirmsPage, 
                  res.body.pagination.number_of_pages, 
                  deliveryFirms.length, 
                  res.body.data.length
                ),
              }
            });

          } else if (res.status === 404) {

            deliveryFirmDispatch(getDeliveryFirmsListFetchStatusAction(FETCH_STATUSES.NOT_FOUND, false));

          } else if (res.status === 403) {

            deliveryFirmDispatch(getDeliveryFirmsListFetchStatusAction(FETCH_STATUSES.FORBIDDEN, false));
            
          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          deliveryFirmDispatch(getDeliveryFirmsListFetchStatusAction(FETCH_STATUSES.ERROR, false));
        });
      }
    },
    [
      deliveryFirms, 
      deliveryFirmsPage, 
      deliveryFirmsLoading, 
      deliveryFirmsFetchStatus, 
      userToken, 
      deliveryFirmDispatch, 
      listStatusUpdater
    ]
  );

  return [deliveryFirms, deliveryFirmsFetchStatus, deliveryFirmsPage, deliveryFirmsNumberOfPages, refetch, refresh];
}

