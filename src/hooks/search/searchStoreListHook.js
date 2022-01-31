
import { useCallback, useEffect } from "react";
import { getStoresListFetchStatusAction, STORE } from "../../context/actions/storeActions";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import StoreRepository from "../../repositories/StoreRepository";
import { useAppContext } from "../contextHook";
import { useUpdateListFetchStatus, useURLQuery } from "../viewHook";


export function useSearchStoreList() {

  const queryParam = useURLQuery().get('q');

  const { 
    search: {
      searchDispatch,
      search: {
        stores,
        storesFetchStatus,
        storesPage,
        storesNumberOfPages,
        storesSubCategory,
      } 
    }
  } = useAppContext();

  const listStatusUpdater = useUpdateListFetchStatus();


  const refetch = useCallback(
    ()=> {
      if (storesFetchStatus !== FETCH_STATUSES.LOADING) 
        searchDispatch(getStoresListFetchStatusAction(FETCH_STATUSES.LOADING));
    },
    [searchDispatch, storesFetchStatus]
  );

  useEffect(
    ()=> {
      if (storesFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        searchDispatch(getStoresListFetchStatusAction(FETCH_STATUSES.ERROR));

      } else if (storesFetchStatus === FETCH_STATUSES.LOADING) {

        const api = new StoreRepository();
        api.getSearchList(queryParam, storesSubCategory, storesPage)
        .then(res=> {
          
          if (res.status === 200) {
            searchDispatch({
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
          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          searchDispatch(getStoresListFetchStatusAction(FETCH_STATUSES.ERROR));
        });
      }
    },
    [queryParam, storesSubCategory, stores, storesFetchStatus, storesPage, storesNumberOfPages, searchDispatch, listStatusUpdater]
  );

  return [stores, storesFetchStatus, storesPage, storesNumberOfPages, refetch];
}

