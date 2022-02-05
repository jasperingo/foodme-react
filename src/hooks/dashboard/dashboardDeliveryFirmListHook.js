
import { useCallback, useEffect } from "react";
import { DELIVERY_FIRM, getDeliveryFirmsListFetchStatusAction } from "../../context/actions/deliveryFirmActions";
import DeliveryFirmRepository from "../../repositories/DeliveryFirmRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";
import { useUpdateListFetchStatus } from "../viewHook";


export function useDashboardDeliveryFirmList() {

  const { 
    admin: { 
      admin: {
        adminToken
      }
    },
    dashboard: {
      dashboardDispatch,
      dashboard: {
        deliveryFirms,
        deliveryFirmsLoading,
        deliveryFirmsFetchStatus
      } 
    }
  } = useAppContext();

  const listStatusUpdater = useUpdateListFetchStatus();

  const refetch = useCallback(
    ()=> {
      if (deliveryFirmsFetchStatus !== FETCH_STATUSES.LOADING) 
        dashboardDispatch(getDeliveryFirmsListFetchStatusAction(FETCH_STATUSES.LOADING, true));
    },
    [dashboardDispatch, deliveryFirmsFetchStatus]
  );
  
  useEffect(
    ()=> {
      if (deliveryFirmsLoading && deliveryFirmsFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        dashboardDispatch(getDeliveryFirmsListFetchStatusAction(FETCH_STATUSES.ERROR, false));

      } else if (deliveryFirmsLoading && deliveryFirmsFetchStatus === FETCH_STATUSES.LOADING) {

        dashboardDispatch(getDeliveryFirmsListFetchStatusAction(FETCH_STATUSES.LOADING, false));
        
        const api = new DeliveryFirmRepository(adminToken);
        api.getList(1)
        .then(res=> {
          
          if (res.status === 200) {

            dashboardDispatch({
              type: DELIVERY_FIRM.LIST_FETCHED, 
              payload: {
                list: res.body.data, 
                fetchStatus: listStatusUpdater(1, 1, 0, res.body.data.length),
              }
            });

          } else if (res.status === 404) {

            dashboardDispatch(getDeliveryFirmsListFetchStatusAction(FETCH_STATUSES.NOT_FOUND, false));

          } else if (res.status === 403) {

            dashboardDispatch(getDeliveryFirmsListFetchStatusAction(FETCH_STATUSES.FORBIDDEN, false));
            
          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          dashboardDispatch(getDeliveryFirmsListFetchStatusAction(FETCH_STATUSES.ERROR, false));
        });
      }
    },
    [
      deliveryFirms, 
      deliveryFirmsLoading, 
      deliveryFirmsFetchStatus, 
      adminToken, 
      dashboardDispatch, 
      listStatusUpdater
    ]
  );

  return [deliveryFirms, deliveryFirmsFetchStatus, refetch];
}

