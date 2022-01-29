import { useCallback, useEffect } from "react";
import { getStoresListFetchStatusAction, STORE } from "../../context/actions/storeActions";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import StoreRepository from "../../repositories/StoreRepository";
import { useAppContext } from "../contextHook";


export function useHomeStoreList(start) {

  const { 
    home: { 
      homeDispatch,
      home: {
        stores,
        storesFetchStatus
      } 
    }
  } = useAppContext();

  const refetch = useCallback(
    ()=> {
      if (storesFetchStatus !== FETCH_STATUSES.LOADING) 
        homeDispatch(getStoresListFetchStatusAction(FETCH_STATUSES.LOADING));
    },
    [homeDispatch, storesFetchStatus]
  );

  useEffect(
    ()=> {
      if (start === true && storesFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {
        homeDispatch(getStoresListFetchStatusAction(FETCH_STATUSES.ERROR));
      } else if (start === true && storesFetchStatus === FETCH_STATUSES.LOADING) {
        const api = new StoreRepository();
        api.getRandomList()
        .then(res=> {
          
          if (res.status === 200) {
            homeDispatch({
              type: STORE.LIST_FETCHED, 
              payload: {
                list: res.body.data, 
                fetchStatus: FETCH_STATUSES.DONE 
              }
            });
          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          homeDispatch(getStoresListFetchStatusAction(FETCH_STATUSES.ERROR));
        });
      }
    },
    [start, storesFetchStatus, homeDispatch]
  );

  return [stores, storesFetchStatus, refetch];
}

