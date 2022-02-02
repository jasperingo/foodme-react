
import { useCallback, useEffect } from "react";
import { getReviewsListFetchStatusAction, REVIEW } from "../../context/actions/reviewActions";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import ProductRepository from "../../repositories/ProductRepository";
import { useAppContext } from "../contextHook";
import { useUpdateListFetchStatus } from "../viewHook";


export function useProductReviewList(userToken) {

  const { 
    product: {
      productDispatch,
      product: {
        product,
        reviews,
        reviewsPage,
        reviewsLoading,
        reviewsNumberOfPages,
        reviewsFetchStatus
      } 
    }
  } = useAppContext();

  const listStatusUpdater = useUpdateListFetchStatus();

  const refetch = useCallback(
    ()=> {
      if (reviewsFetchStatus !== FETCH_STATUSES.LOADING) 
        productDispatch(getReviewsListFetchStatusAction(FETCH_STATUSES.LOADING, true));
    },
    [productDispatch, reviewsFetchStatus]
  );
  
  useEffect(
    ()=> {
      if (reviewsLoading && reviewsFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        productDispatch(getReviewsListFetchStatusAction(FETCH_STATUSES.ERROR, false));

      } else if (reviewsLoading && reviewsFetchStatus === FETCH_STATUSES.LOADING) {

        productDispatch(getReviewsListFetchStatusAction(FETCH_STATUSES.LOADING, false));
        
        const api = new ProductRepository(userToken);
        api.getReviewsList(product.id, reviewsPage)
        .then(res=> {
          
          if (res.status === 200) {
            productDispatch({
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

            productDispatch(getReviewsListFetchStatusAction(FETCH_STATUSES.NOT_FOUND, false));

          } else if (res.status === 403) {

            productDispatch(getReviewsListFetchStatusAction(FETCH_STATUSES.FORBIDDEN, false));
            
          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          productDispatch(getReviewsListFetchStatusAction(FETCH_STATUSES.ERROR, false));
        });
      }
    },
    [
      product.id, 
      reviews, 
      reviewsLoading, 
      reviewsPage, 
      reviewsFetchStatus, 
      userToken, 
      productDispatch, 
      listStatusUpdater
    ]
  );

  return [reviews, reviewsFetchStatus, reviewsPage, reviewsNumberOfPages, refetch];
}

