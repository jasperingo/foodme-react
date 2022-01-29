import { useCallback, useEffect } from "react";
import { CATEGORY, getCategoriesListFetchStatusAction } from "../../context/actions/categoryActions";
import CategoryRepository from "../../repositories/CategoryRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";


export function useHomeCategoryList() {

  const { 
    home: { 
      homeDispatch,
      home: {
        categories,
        categoriesFetchStatus
      } 
    }
  } = useAppContext();

  const refetch = useCallback(
    ()=> {
      if (categoriesFetchStatus !== FETCH_STATUSES.LOADING) 
        homeDispatch(getCategoriesListFetchStatusAction(FETCH_STATUSES.LOADING));
    },
    [homeDispatch, categoriesFetchStatus]
  );

  useEffect(
    ()=> {
      if (categoriesFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {
        homeDispatch(getCategoriesListFetchStatusAction(FETCH_STATUSES.ERROR));
      } else if (categoriesFetchStatus === FETCH_STATUSES.LOADING) {
        const api = new CategoryRepository();
        api.getRandomList()
        .then(res=> {
          
          if (res.status === 200) {
            homeDispatch({
              type: CATEGORY.LIST_FETCHED, 
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
          homeDispatch(getCategoriesListFetchStatusAction(FETCH_STATUSES.ERROR));
        });
      }
    },
    [categoriesFetchStatus, homeDispatch]
  );

  return [categories, categoriesFetchStatus, refetch];
}

