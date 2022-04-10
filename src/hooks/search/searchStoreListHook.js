
import { useCallback, useMemo } from "react";
import { STORE } from "../../context/actions/storeActions";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import StoreRepository from "../../repositories/StoreRepository";
import { useAppContext } from "../contextHook";

export function useSearchStoreList() {

  const { 
    search: {
      searchDispatch,
      search: {
        stores,
        storesError,
        storesLoaded,
        storesLoading,
        storesPage,
        storesNumberOfPages
      } 
    }
  } = useAppContext();

  const api = useMemo(function() { return new StoreRepository(); }, []);

  function refreshStores() {
    searchDispatch({ type: STORE.LIST_UNFETCHED }); 
  }

  const fetchStores = useCallback(
    async function(q, subCategory) {
      
      if (storesLoading) return;
      
      if (!window.navigator.onLine) {
        searchDispatch({
          type: STORE.LIST_ERROR_CHANGED,
          payload: { error: NetworkErrorCodes.NO_NETWORK_CONNECTION }
        });
        return;
      }

      searchDispatch({ type: STORE.LIST_FETCHING });

      try {
        const res = await api.getSearchList(q, subCategory, storesPage)
        
        if (res.status === 200) {
          searchDispatch({
            type: STORE.LIST_FETCHED, 
            payload: {
              list: res.body.data, 
              numberOfPages: res.body.pagination.number_of_pages,
            }
          });
        } else {
          throw new Error();
        }

      } catch(error) {
        searchDispatch({
          type: STORE.LIST_ERROR_CHANGED,
          payload: { error: NetworkErrorCodes.UNKNOWN_ERROR }
        });
      }
    },
    [
      api,
      storesPage, 
      storesLoading, 
      searchDispatch, 
    ]
  );

  return [
    fetchStores,
    stores, 
    storesLoading,
    storesLoaded,
    storesError,
    storesPage, 
    storesNumberOfPages,
    refreshStores
  ];
}
