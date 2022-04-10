import { useCallback, useMemo } from 'react';
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

  const api = useMemo(function() { return new StoreRepository(); }, []);
  
  const fetchRecommendedStores = useCallback(
    async function() {
      
      if (storesLoading) return;

      if (!window.navigator.onLine) {
        homeDispatch({
          type: STORE.LIST_ERROR_CHANGED,
          payload: {
            error: NetworkErrorCodes.NO_NETWORK_CONNECTION
          }
        });
        return;
      }

      homeDispatch({ type: STORE.LIST_FETCHING });

      try {
        
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
          type: STORE.LIST_ERROR_CHANGED,
          payload: {
            error: NetworkErrorCodes.UNKNOWN_ERROR
          }
        });
      }
    },
    [api, storesLoading, homeDispatch]
  );

  return [fetchRecommendedStores, stores, storesLoading, storesError, storesLoaded];
}
