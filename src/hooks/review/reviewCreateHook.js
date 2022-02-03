
import { useEffect, useState } from "react";
import { REVIEW } from "../../context/actions/reviewActions";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import ReviewRepository from "../../repositories/ReviewRepository";
import { useAppContext } from "../contextHook";


export function useReviewCreate({ product, store, deliveryFirm }) {

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
    },
    deliveryFirm: {
      deliveryFirmDispatch
    }
  } = useAppContext();

  const [data, setData] = useState(null);

  const [response, setResponse] = useState(null);

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  function onSubmit(data, response) {
    if (!window.navigator.onLine) {
      response.onError('_errors.No_netowrk_connection');
    } else {
      setData(data);
      setResponse(response);
      setFetchStatus(FETCH_STATUSES.LOADING);
    }
  }

  useEffect(
    ()=> {

      if (fetchStatus === FETCH_STATUSES.LOADING) {
        
        const api = new ReviewRepository(customerToken);

        let request;

        if (product) {
          data.product_id = product;
          request = api.createForProduct(data);
        } else if (store) {
          data.store_id = store;
          request = api.createForStore(data);
        } else if (deliveryFirm) {
          data.delivery_firm = deliveryFirm;
          request = api.createForDeliveryFirm(data);
        }

        request
        .then(res=> {

          if (res.status === 201) {

            response.onSuccess(res.body.message);

            setFetchStatus(FETCH_STATUSES.PENDING);

            const review = res.body.data;

            if (product) {
              review.product = undefined;
              productDispatch({
                type: REVIEW.CREATED,
                payload: review
              });
            }

            if (store) {
              review.store = undefined;
              storeDispatch({
                type: REVIEW.CREATED,
                payload: review
              });
            }

            if (deliveryFirm) {
              review.delivery_firm = undefined;
              deliveryFirmDispatch({
                type: REVIEW.CREATED,
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
    [store, product, deliveryFirm, data, fetchStatus, customerToken, response, storeDispatch, productDispatch, deliveryFirmDispatch]
  );


  return onSubmit;
}
