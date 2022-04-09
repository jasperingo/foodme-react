
import { useCallback, useMemo } from "react";
import { REVIEW } from "../../context/actions/reviewActions";
import NetworkError from "../../errors/NetworkError";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import StoreRepository from "../../repositories/StoreRepository";
import { useAppContext } from "../contextHook";

export function useStoreReviewList(userToken) {

  const { 
    store: { 
      storeDispatch,
      store: {
        reviews,
        reviewsPage,
        reviewsLoaded,
        reviewsLoading,
        reviewsNumberOfPages,
        reviewsError
      } 
    }
  } = useAppContext();

  const api = useMemo(function() { return new StoreRepository(userToken); }, [userToken]);
  
  function refreshStoreReviews() {
    storeDispatch({ type: REVIEW.LIST_UNFETCHED }); 
  }

  const fetchStoreReviews = useCallback(
    async function(ID) {

      if (reviewsLoading) return;

      if (!window.navigator.onLine) {
        storeDispatch({
          type: REVIEW.LIST_ERROR_CHANGED,
          payload: { error: NetworkErrorCodes.NO_NETWORK_CONNECTION }
        });
        return;
      }

      storeDispatch({ type: REVIEW.LIST_FETCHING });
      
      try {

        const res = await api.getReviewsList(ID, reviewsPage)
        
        if (res.status === 200) {
          storeDispatch({
            type: REVIEW.LIST_FETCHED, 
            payload: {
              list: res.body.data, 
              numberOfPages: res.body.pagination.number_of_pages,
            }
          });
        } else if (res.status === 404) {
          throw new NetworkError(NetworkErrorCodes.NOT_FOUND);
        } else if (res.status === 403) {
          throw new NetworkError(NetworkErrorCodes.FORBIDDEN);
        } else {
          throw new Error();
        }
        
      } catch(error) {
        storeDispatch({
          type: REVIEW.LIST_ERROR_CHANGED,
          payload: { error: error instanceof NetworkError ? error.message : NetworkErrorCodes.UNKNOWN_ERROR }
        });
      }
    },
    [api, reviewsPage, reviewsLoading, storeDispatch]
  );

  return [
    fetchStoreReviews,
    reviews, 
    reviewsLoading,
    reviewsLoaded,
    reviewsError,
    reviewsPage, 
    reviewsNumberOfPages,
    refreshStoreReviews
  ];
}
