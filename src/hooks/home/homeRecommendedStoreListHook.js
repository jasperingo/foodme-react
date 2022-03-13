import { useCallback } from 'react';
import { STORE } from '../../context/actions/storeActions';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import StoreRepository from '../../repositories/StoreRepository';
import { useAppContext } from '../contextHook';

export function useHomeRecommendedStoreList() {

  const { 
    home: { 
      homeDispatch,
      home: {
        stores,
        storesError,
        storesLoaded,
        storesLoading,
      } 
    }
  } = useAppContext();

  const retryFetch = useCallback(
    function() { 
      homeDispatch({ 
        type: STORE.LIST_FETCH_ERROR_CHANGED, 
        payload: { error: null } 
      }) ;
    },
    [homeDispatch]
  );
  
  const fetch = useCallback(
    async function() {
      
      if (storesLoaded || storesLoading || storesError !== null) return;

      if (!window.navigator.onLine) {
        homeDispatch({
          type: STORE.LIST_FETCH_ERROR_CHANGED,
          payload: {
            error: NetworkErrorCodes.NO_NETWORK_CONNECTION
          }
        });
        return;
      }

      homeDispatch({ type: STORE.LIST_FETCHING });

      try {
        
        const api = new StoreRepository();
        const res = await api.getRecommendedList();

        if (res.status === 200) {
          homeDispatch({
            type: STORE.LIST_FETCHED, 
            payload: { list: res.body.data }
          });
        } else {
          throw new Error();
        }
        
      } catch {
        homeDispatch({
          type: STORE.LIST_FETCH_ERROR_CHANGED,
          payload: {
            error: NetworkErrorCodes.UNKNOWN_ERROR
          }
        });
      }
    },
    [storesLoaded, storesLoading, storesError, homeDispatch]
  );

  return [fetch, stores, storesLoading, storesError, storesLoaded, retryFetch];
}
