
import { useCallback, useMemo } from "react";
import { STORE } from "../../context/actions/storeActions";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import StoreRepository from "../../repositories/StoreRepository";
import { useAppContext } from "../contextHook";

export function useDashboardStoreList() {

  const { 
    admin: { 
      admin: {
        adminToken
      }
    },
    dashboard: {
      dashboardDispatch,
      dashboard: {
        stores,
        storesError,
        storesLoaded,
        storesLoading,
      } 
    }
  } = useAppContext();

  const api = useMemo(function() { return new StoreRepository(adminToken); }, [adminToken]);

  function refreshStores() {
    dashboardDispatch({ type: STORE.LIST_UNFETCHED }); 
  }
  
  const fetchStores = useCallback(
    async function() {

      if (storesLoading) return;

      if (!window.navigator.onLine) {
        dashboardDispatch({
          type: STORE.LIST_ERROR_CHANGED,
          payload: { error: NetworkErrorCodes.NO_NETWORK_CONNECTION }
        });
        return;
      } 
      
      dashboardDispatch({ type: STORE.LIST_FETCHING });
      
      try {

        const res = await api.getList(1);
          
        if (res.status === 200) {
          dashboardDispatch({
            type: STORE.LIST_FETCHED, 
            payload: { list: res.body.data }
          });
        } else {
          throw new Error();
        }
      } catch(error) {
        dashboardDispatch({
          type: STORE.LIST_ERROR_CHANGED,
          payload: { error: NetworkErrorCodes.UNKNOWN_ERROR }
        });
      }
    },
    [
      api, 
      storesLoading,
      dashboardDispatch, 
    ]
  );

  return [
    fetchStores,
    stores, 
    storesLoading,
    storesLoaded,
    storesError,
    refreshStores
  ];
}
