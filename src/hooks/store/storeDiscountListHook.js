
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
        discountsNumberOfPages,
        discountsFetchStatus
      } 
    }
  } = useAppContext();

  const listStatusUpdater = useUpdateListFetchStatus();

  const refetch = useCallback(
    ()=> {
      if (discountsFetchStatus !== FETCH_STATUSES.LOADING) 
        storeDispatch(getDiscountsListFetchStatusAction(FETCH_STATUSES.LOADING));
    },
    [storeDispatch, discountsFetchStatus]
  );
  
  useEffect(
    ()=> {
      if (discountsFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        storeDispatch(getDiscountsListFetchStatusAction(FETCH_STATUSES.ERROR));

      } else if (discountsFetchStatus === FETCH_STATUSES.LOADING) {
        
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
            storeDispatch(getDiscountsListFetchStatusAction(FETCH_STATUSES.NOT_FOUND));
          } else if (res.status === 403) {
            storeDispatch(getDiscountsListFetchStatusAction(FETCH_STATUSES.FORBIDDEN));
          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          storeDispatch(getDiscountsListFetchStatusAction(FETCH_STATUSES.ERROR));
        });
      }
    },
    [store.id, discounts, discountsPage, discountsFetchStatus, userToken, storeDispatch, listStatusUpdater]
  );

  return [discounts, discountsFetchStatus, discountsPage, discountsNumberOfPages, refetch];
}

