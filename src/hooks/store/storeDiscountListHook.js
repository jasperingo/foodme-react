
import { useCallback, useEffect } from "react";
import { DISCOUNT, getDiscountsListFetchStatusAction } from "../../context/actions/discountActions";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import StoreRepository from "../../repositories/StoreRepository";
import { useAppContext } from "../contextHook";
import { useUpdateListFetchStatus } from "../viewHook";


export function useStoreDiscountList(userToken) {

  const { 
    store: { 
      storeDispatch,
      store: {
        store,
        discounts,
        discountsPage,
        discountsLoading,
        discountsNumberOfPages,
        discountsFetchStatus
      } 
    }
  } = useAppContext();

  const listStatusUpdater = useUpdateListFetchStatus();

  const refetch = useCallback(
    ()=> {
      if (discountsFetchStatus !== FETCH_STATUSES.LOADING) 
        storeDispatch(getDiscountsListFetchStatusAction(FETCH_STATUSES.LOADING, true));
    },
    [storeDispatch, discountsFetchStatus]
  );
  
  useEffect(
    ()=> {
      if (discountsLoading && discountsFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        storeDispatch(getDiscountsListFetchStatusAction(FETCH_STATUSES.ERROR, false));

      } else if (discountsLoading && discountsFetchStatus === FETCH_STATUSES.LOADING) {
        
        storeDispatch(getDiscountsListFetchStatusAction(FETCH_STATUSES.LOADING, false));

        const api = new StoreRepository(userToken);
        api.getDiscountsList(store.id, discountsPage)
        .then(res=> {
          
          if (res.status === 200) {
            storeDispatch({
              type: DISCOUNT.LIST_FETCHED, 
              payload: {
                list: res.body.data, 
                numberOfPages: res.body.pagination.number_of_pages,
                fetchStatus: listStatusUpdater(
                  discountsPage, 
                  res.body.pagination.number_of_pages, 
                  discounts.length, 
                  res.body.data.length
                ),
              }
            });
          } else if (res.status === 404) {
            storeDispatch(getDiscountsListFetchStatusAction(FETCH_STATUSES.NOT_FOUND, false));
          } else if (res.status === 403) {
            storeDispatch(getDiscountsListFetchStatusAction(FETCH_STATUSES.FORBIDDEN, false));
          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          storeDispatch(getDiscountsListFetchStatusAction(FETCH_STATUSES.ERROR, false));
        });
      }
    },
    [store.id, discounts, discountsPage, discountsLoading, discountsFetchStatus, userToken, storeDispatch, listStatusUpdater]
  );

  return [discounts, discountsFetchStatus, discountsPage, discountsNumberOfPages, refetch];
}

