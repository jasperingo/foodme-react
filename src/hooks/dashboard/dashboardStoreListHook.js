
import { useCallback, useEffect } from "react";
import { getStoresListFetchStatusAction, STORE } from "../../context/actions/storeActions";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import StoreRepository from "../../repositories/StoreRepository";
import { useAppContext } from "../contextHook";
import { useUpdateListFetchStatus } from "../viewHook";

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
        storesLoading,
        storesFetchStatus
      } 
    }
  } = useAppContext();

  const listStatusUpdater = useUpdateListFetchStatus();

  const refetch = useCallback(
    ()=> {
      if (storesFetchStatus !== FETCH_STATUSES.LOADING)
        dashboardDispatch(getStoresListFetchStatusAction(FETCH_STATUSES.LOADING, true));
    },
    [storesFetchStatus, dashboardDispatch]
  );
  
  useEffect(
    ()=> {

      if (storesLoading && storesFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        dashboardDispatch(getStoresListFetchStatusAction(FETCH_STATUSES.ERROR, false));

      } else if (storesLoading && storesFetchStatus === FETCH_STATUSES.LOADING) {

        dashboardDispatch(getStoresListFetchStatusAction(FETCH_STATUSES.LOADING, false));

        const api = new StoreRepository(adminToken);
        api.getList(1)
        .then(res=> {
          
          if (res.status === 200) {

            dashboardDispatch({
              type: STORE.LIST_FETCHED, 
              payload: {
                list: res.body.data, 
                numberOfPages: res.body.pagination.number_of_pages,
                fetchStatus: listStatusUpdater(1, 1, 0, res.body.data.length),
              }
            });

          } else if (res.status === 404) {

            dashboardDispatch(getStoresListFetchStatusAction(FETCH_STATUSES.NOT_FOUND, false));

          } else if (res.status === 403) {

            dashboardDispatch(getStoresListFetchStatusAction(FETCH_STATUSES.FORBIDDEN, false));

          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          dashboardDispatch(getStoresListFetchStatusAction(FETCH_STATUSES.ERROR, false));
        });
      }
    },
    [
      stores, 
      storesLoading,
      storesFetchStatus, 
      adminToken, 
      dashboardDispatch, 
      listStatusUpdater
    ]
  );

  return [stores, storesFetchStatus, refetch];
}

