
import { useCallback, useEffect } from "react";
import { getReviewsListFetchStatusAction, REVIEW } from "../../context/actions/reviewActions";
import DeliveryFirmRepository from "../../repositories/DeliveryFirmRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";
import { useUpdateListFetchStatus } from "../viewHook";


export function useDeliveryFirmReviewList(userToken) {

  const { 
    deliveryFirm: {
      deliveryFirmDispatch,
      deliveryFirm: {
        deliveryFirm,
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
        deliveryFirmDispatch(getReviewsListFetchStatusAction(FETCH_STATUSES.LOADING, true));
    },
    [deliveryFirmDispatch, reviewsFetchStatus]
  );
  
  useEffect(
    ()=> {
      if (reviewsLoading && reviewsFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        deliveryFirmDispatch(getReviewsListFetchStatusAction(FETCH_STATUSES.ERROR, false));

      } else if (reviewsLoading && reviewsFetchStatus === FETCH_STATUSES.LOADING) {

        deliveryFirmDispatch(getReviewsListFetchStatusAction(FETCH_STATUSES.LOADING, false));
        
        const api = new DeliveryFirmRepository(userToken);
        api.getReviewsList(deliveryFirm.id, reviewsPage)
        .then(res=> {
          
          if (res.status === 200) {
            deliveryFirmDispatch({
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

            deliveryFirmDispatch(getReviewsListFetchStatusAction(FETCH_STATUSES.NOT_FOUND, false));

          } else if (res.status === 403) {

            deliveryFirmDispatch(getReviewsListFetchStatusAction(FETCH_STATUSES.FORBIDDEN, false));
            
          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          deliveryFirmDispatch(getReviewsListFetchStatusAction(FETCH_STATUSES.ERROR, false));
        });
      }
    },
    [deliveryFirm.id, reviews, reviewsPage, reviewsLoading, reviewsFetchStatus, userToken, deliveryFirmDispatch, listStatusUpdater]
  );

  return [reviews, reviewsFetchStatus, reviewsPage, reviewsNumberOfPages, refetch];
}

