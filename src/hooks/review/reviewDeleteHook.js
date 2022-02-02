
import { useEffect, useState } from "react";
import { REVIEW } from "../../context/actions/reviewActions";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import ReviewRepository from "../../repositories/ReviewRepository";
import { useAppContext } from "../contextHook";


export function useReviewDelete({ product, store, deliveryFirm }) {

  const {
    customer: {
      customer: {
        customer: {
          customerToken
        }
      } 
    },
    store: {
      storeDispatch,
    },
    product: {
      productDispatch,
    }
  } = useAppContext();

  const [id, setId] = useState(null);

  const [response, setResponse] = useState(null);

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  function onSubmit(id, response) {
    if (!window.navigator.onLine) {
      response.onError('_errors.No_netowrk_connection');
    } else {
      setId(id);
      setResponse(response);
      setFetchStatus(FETCH_STATUSES.LOADING);
    }
  }

  useEffect(
    ()=> {

      if (fetchStatus === FETCH_STATUSES.LOADING) {
        
        const api = new ReviewRepository(customerToken);
        api.delete(id)
        .then(res=> {

          if (res.status === 200) {

            response.onSuccess(res.body.message);

            setFetchStatus(FETCH_STATUSES.PENDING);

            if (product) {
              productDispatch({ type: REVIEW.DELETED });
            }

            if (store) {
              storeDispatch({ type: REVIEW.DELETED });
            }

          } else {
            throw new Error();
          }

        })
        .catch(()=> {
          setFetchStatus(FETCH_STATUSES.PENDING);
          response.onError('_errors.Something_went_wrong');
        });
        
      }

    }, 
    [id, product, store, deliveryFirm, fetchStatus, customerToken, response, storeDispatch, productDispatch]
  );


  return onSubmit;
}

