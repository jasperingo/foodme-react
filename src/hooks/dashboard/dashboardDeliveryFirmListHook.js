
import { useCallback, useMemo } from "react";
import { DELIVERY_FIRM } from "../../context/actions/deliveryFirmActions";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import DeliveryFirmRepository from "../../repositories/DeliveryFirmRepository";
import { useAppContext } from "../contextHook";

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
        deliveryFirmsError,
        deliveryFirmsLoaded,
        deliveryFirmsLoading
      } 
    }
  } = useAppContext();

  const api = useMemo(function() { return new DeliveryFirmRepository(adminToken); }, [adminToken]);

  function refreshDeliveryFirms() {
    dashboardDispatch({ type: DELIVERY_FIRM.LIST_UNFETCHED }); 
  }
  
  const fetchDeliveryFirms = useCallback(
    async function() {

      if (deliveryFirmsLoading) return;

      if (!window.navigator.onLine) {
        dashboardDispatch({
          type: DELIVERY_FIRM.LIST_ERROR_CHANGED,
          payload: { error: NetworkErrorCodes.NO_NETWORK_CONNECTION }
        });
        return;
      } 
      
      dashboardDispatch({ type: DELIVERY_FIRM.LIST_FETCHING });
      
      try {

        const res = await api.getList(1);
          
        if (res.status === 200) {
          dashboardDispatch({
            type: DELIVERY_FIRM.LIST_FETCHED, 
            payload: { list: res.body.data }
          });
        } else {
          throw new Error();
        }

      } catch(error) {
        dashboardDispatch({
          type: DELIVERY_FIRM.LIST_ERROR_CHANGED,
          payload: { error: NetworkErrorCodes.UNKNOWN_ERROR }
        });
      }
      
    },
    [
      api, 
      deliveryFirmsLoading, 
      dashboardDispatch,
    ]
  );

  return [
    fetchDeliveryFirms,
    deliveryFirms, 
    deliveryFirmsLoading,
    deliveryFirmsLoaded,
    deliveryFirmsError,
    refreshDeliveryFirms
  ];
}
