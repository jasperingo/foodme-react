
import { useCallback, useMemo } from "react";
import { REVIEW } from "../../context/actions/reviewActions";
import NetworkError from "../../errors/NetworkError";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import ProductRepository from "../../repositories/ProductRepository";
import { useAppContext } from "../contextHook";

export function useProductReviewList(productId, userToken) {

  const { 
    product: {
      productDispatch,
      product: {
        reviews,
        reviewsPage,
        reviewsLoading,
        reviewsNumberOfPages,
        reviewsLoaded,
        reviewsError
      } 
    }
  } = useAppContext();

  const api = useMemo(function() { return new ProductRepository(userToken); }, [userToken]);

  function refreshProductReviews() {
    productDispatch({ type: REVIEW.LIST_UNFETCHED });
  }
  
  const fetchProductReviews = useCallback(
    async function() {

      if (!window.navigator.onLine) {
        productDispatch({
          type: REVIEW.LIST_ERROR_CHANGED,
          payload: { error: NetworkErrorCodes.NO_NETWORK_CONNECTION }
        });
        return;
      } 

      productDispatch({ type: REVIEW.LIST_FETCHING });
        
      try {

        const res = await api.getReviewsList(productId, reviewsPage);
        
        if (res.status === 200) {
          productDispatch({
            type: REVIEW.LIST_FETCHED, 
            payload: {
              list: res.body.data, 
              numberOfPages: res.body.pagination.number_of_pages
            }
          });
        } else if (res.status === 401) {
          throw new NetworkError(NetworkErrorCodes.UNAUTHORIZED);
        } else if (res.status === 404) {
          throw new NetworkError(NetworkErrorCodes.NOT_FOUND);
        } else if (res.status === 403) {
          throw new NetworkError(NetworkErrorCodes.FORBIDDEN);
        } else {
          throw new Error();
        }
      } catch(error) {
        productDispatch({
          type: REVIEW.LIST_ERROR_CHANGED,
          payload: { error: error instanceof NetworkError ? error.message : NetworkErrorCodes.UNKNOWN_ERROR }
        });
      }
    },
    [
      api,
      productId,
      reviewsPage, 
      productDispatch,
    ]
  );

  return [
    fetchProductReviews,
    reviews, 
    reviewsLoading,
    reviewsLoaded,
    reviewsError,
    reviewsPage, 
    reviewsNumberOfPages,
    refreshProductReviews
  ];
}
