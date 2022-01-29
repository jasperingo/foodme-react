
import { useCallback, useEffect } from "react";
import { CATEGORY, getStoreCategoriesListFetchStatusAction } from "../../context/actions/categoryActions";
import CategoryRepository from "../../repositories/CategoryRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";


export function useStoreCategoryList() {

  const { 
    category: { 
      categoryDispatch,
      category: {
        stores,
        storesFetchStatus
      } 
    }
  } = useAppContext();

  const refetch = useCallback(
    ()=> {
      if (storesFetchStatus !== FETCH_STATUSES.LOADING) 
        categoryDispatch(getStoreCategoriesListFetchStatusAction(FETCH_STATUSES.LOADING));
    },
    [categoryDispatch, storesFetchStatus]
  );

  useEffect(
    ()=> {
      if (storesFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {
        categoryDispatch(getStoreCategoriesListFetchStatusAction(FETCH_STATUSES.ERROR));
      } else if (storesFetchStatus === FETCH_STATUSES.LOADING) {
        const api = new CategoryRepository();
        api.getListByStore()
        .then(res=> {
          
          if (res.status === 200) {
            categoryDispatch({
              type: CATEGORY.STORES_LIST_FETCHED, 
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
          categoryDispatch(getStoreCategoriesListFetchStatusAction(FETCH_STATUSES.ERROR));
        });
      }
    },
    [storesFetchStatus, categoryDispatch]
  );

  return [stores, storesFetchStatus, refetch];
}


