
import { useCallback, useEffect } from "react";
import { getStoresListFetchStatusAction, STORE } from "../../context/actions/storeActions";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import StoreRepository from "../../repositories/StoreRepository";
import { useAppContext } from "../contextHook";
import { useUpdateListFetchStatus } from "../viewHook";

export function useStoreList(userToken) {

  const { 
    store: { 
      storeDispatch,
      store: {
        stores,
        storesPage,
        storesLoading,
        storesNumberOfPages,
        storesFetchStatus
      } 
    }
  } = useAppContext();

  const listStatusUpdater = useUpdateListFetchStatus();

  const refetch = useCallback(
    ()=> {
      if (storesFetchStatus !== FETCH_STATUSES.LOADING)
        storeDispatch(getStoresListFetchStatusAction(FETCH_STATUSES.LOADING, true));
    },
    [storesFetchStatus, storeDispatch]
  );

  const refresh = useCallback(
    ()=> {
      storeDispatch({ type: STORE.LIST_UNFETCHED });
    },
    [storeDispatch]
  );
  
  useEffect(
    ()=> {

      if (storesLoading && storesFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        storeDispatch(getStoresListFetchStatusAction(FETCH_STATUSES.ERROR, false));

      } else if (storesLoading && storesFetchStatus === FETCH_STATUSES.LOADING) {

        storeDispatch(getStoresListFetchStatusAction(FETCH_STATUSES.LOADING, false));

        const api = new StoreRepository(userToken);
        api.getList(storesPage)
        .then(res=> {
          
          if (res.status === 200) {

            storeDispatch({
              type: STORE.LIST_FETCHED, 
              payload: {
                list: res.body.data, 
                numberOfPages: res.body.pagination.number_of_pages,
                fetchStatus: listStatusUpdater(
                  storesPage, 
                  res.body.pagination.number_of_pages, 
                  stores.length, 
                  res.body.data.length
                ),
              }
            });

          } else if (res.status === 404) {

            storeDispatch(getStoresListFetchStatusAction(FETCH_STATUSES.NOT_FOUND, false));

          } else if (res.status === 403) {

            storeDispatch(getStoresListFetchStatusAction(FETCH_STATUSES.FORBIDDEN, false));

          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          storeDispatch(getStoresListFetchStatusAction(FETCH_STATUSES.ERROR, false));
        });
      }
    },
    [
      stores, 
      storesPage, 
      storesLoading,
      storesFetchStatus, 
      userToken, 
      storeDispatch, 
      listStatusUpdater
    ]
  );

  return [stores, storesFetchStatus, storesPage, storesNumberOfPages, refetch, refresh];
}

