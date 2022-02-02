
import { useEffect, useState } from "react";
import { REVIEW } from "../../context/actions/reviewActions";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import ReviewRepository from "../../repositories/ReviewRepository";
import { useAppContext } from "../contextHook";


export function useReviewUpdate() {

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

  const [data, setData] = useState(null);

  const [response, setResponse] = useState(null);

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  function onSubmit(id, data, response) {
    if (!window.navigator.onLine) {
      response.onError('_errors.No_netowrk_connection');
    } else {
      setId(id);
      setData(data);
      setResponse(response);
      setFetchStatus(FETCH_STATUSES.LOADING);
    }
  }

  useEffect(
    ()=> {

      if (fetchStatus === FETCH_STATUSES.LOADING) {
        
        const api = new ReviewRepository(customerToken);
        api.update(id, data)
        .then(res=> {

          if (res.status === 200) {

            response.onSuccess(res.body.message);

            setFetchStatus(FETCH_STATUSES.PENDING);

            const review = res.body.data;

            if (review.product !== null) {
              review.product = undefined;
              productDispatch({
                type: REVIEW.UPDATED,
                payload: review
              });
            }

            if (review.store !== null) {
              review.store = undefined;
              storeDispatch({
                type: REVIEW.UPDATED,
                payload: review
              });
            }

          } else if (res.status === 400) {
            
            response.onError(res.body.data[0].message);

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
    [id, data, fetchStatus, customerToken, response, storeDispatch, productDispatch]
  );


  return onSubmit;
}

