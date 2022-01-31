
import { useCallback, useEffect } from "react";
import { getReviewsListFetchStatusAction, REVIEW } from "../../context/actions/reviewActions";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import StoreRepository from "../../repositories/StoreRepository";
import { useAppContext } from "../contextHook";
import { useUpdateListFetchStatus } from "../viewHook";


export function useStoreReviewList(userToken) {

  const { 
    store: { 
      storeDispatch,
      store: {
        store,
        reviews,
        reviewsPage,
        reviewsNumberOfPages,
        reviewsFetchStatus
      } 
    }
  } = useAppContext();

  const listStatusUpdater = useUpdateListFetchStatus();

  const refetch = useCallback(
    ()=> {
      if (reviewsFetchStatus !== FETCH_STATUSES.LOADING) 
        storeDispatch(getReviewsListFetchStatusAction(FETCH_STATUSES.LOADING));
    },
    [storeDispatch, reviewsFetchStatus]
  );
  
  useEffect(
    ()=> {
      if (reviewsFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        storeDispatch(getReviewsListFetchStatusAction(FETCH_STATUSES.ERROR));

      } else if (reviewsFetchStatus === FETCH_STATUSES.LOADING) {
        
        const api = new StoreRepository(userToken);
        api.getReviewsList(store.id, reviewsPage)
        .then(res=> {
          
          if (res.status === 200) {
            storeDispatch({
              type: REVIEW.LIST_FETCHED, 
              payload: {
                list: res.body.data, 
                numberOfPages: res.body.pagination.number_of_pages,
                fetchStatus: listStatusUpdater(
                  reviewsPage, 
                  res.body.pagination.number_of_pages, 
                  reviews.length, 
                  res.body.data.length
                ),
              }
            });
          } else if (res.status === 404) {

            storeDispatch(getReviewsListFetchStatusAction(FETCH_STATUSES.NOT_FOUND));

          } else if (res.status === 403) {

            storeDispatch(getReviewsListFetchStatusAction(FETCH_STATUSES.FORBIDDEN));
            
          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          storeDispatch(getReviewsListFetchStatusAction(FETCH_STATUSES.ERROR));
        });
      }
    },
    [store.id, reviews, reviewsPage, reviewsFetchStatus, userToken, storeDispatch, listStatusUpdater]
  );

  return [reviews, reviewsFetchStatus, reviewsPage, reviewsNumberOfPages, refetch];
}

