
import { useCallback, useMemo } from "react";
import { REVIEW } from "../../context/actions/reviewActions";
import NetworkError from "../../errors/NetworkError";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import DeliveryFirmRepository from "../../repositories/DeliveryFirmRepository";
import { useAppContext } from "../contextHook";

export function useDeliveryFirmReviewList(userToken) {

  const { 
    deliveryFirm: {
      deliveryFirmDispatch,
      deliveryFirm: {
        reviews,
        reviewsPage,
        reviewsLoaded,
        reviewsLoading,
        reviewsNumberOfPages,
        reviewsError
      } 
    }
  } = useAppContext();

  const api = useMemo(function() { return new DeliveryFirmRepository(userToken); }, [userToken]);
  
  function refreshDeliveryFirmReviews() {
    deliveryFirmDispatch({ type: REVIEW.LIST_UNFETCHED }); 
  }

  const fetchDeliveryFirmReviews = useCallback(
    async function(ID) {

      if (reviewsLoading) return;
      
      if (!window.navigator.onLine) {
        deliveryFirmDispatch({
          type: REVIEW.LIST_ERROR_CHANGED,
          payload: { error: NetworkErrorCodes.NO_NETWORK_CONNECTION }
        });
        return;
      }

      deliveryFirmDispatch({ type: REVIEW.LIST_FETCHING });
        
      try {
        const res = await api.getReviewsList(ID, reviewsPage);
       
        if (res.status === 200) {
          deliveryFirmDispatch({
            type: REVIEW.LIST_FETCHED, 
            payload: {
              list: res.body.data, 
              numberOfPages: res.body.pagination.number_of_pages
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
        deliveryFirmDispatch({
          type: REVIEW.LIST_ERROR_CHANGED,
          payload: { error: error instanceof NetworkError ? error.message : NetworkErrorCodes.UNKNOWN_ERROR }
        });
      }
    },
    [api, reviewsPage, reviewsLoading, deliveryFirmDispatch]
  );

  return [
    fetchDeliveryFirmReviews,
    reviews, 
    reviewsLoading,
    reviewsLoaded,
    reviewsError,
    reviewsPage, 
    reviewsNumberOfPages,
    refreshDeliveryFirmReviews
  ];
}
