
import { useEffect, useState } from "react";
import { PRODUCT } from "../../context/actions/productActions";
import FavoriteRepository from "../../repositories/FavoriteRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";


export function useFavoriteDelete() {

  const {
    customer: {
      customer: {
        customer: {
          customerToken
        }
      } 
    },
    product: {
      productDispatch,
      product: {
        product,
      }
    }
  } = useAppContext();

  const [response, setResponse] = useState(null);

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  function onSubmit(response) {
    if (!window.navigator.onLine) {
      response.onError('_errors.No_netowrk_connection');
    } else {
      setResponse(response);
      setFetchStatus(FETCH_STATUSES.LOADING);
    }
  }

  useEffect(
    ()=> {

      if (fetchStatus === FETCH_STATUSES.LOADING) {
        
        const api = new FavoriteRepository(customerToken);

        api.delete(product.favorites[0].id)
        .then(res=> {

          if (res.status === 200) {

            response.onSuccess();

            setFetchStatus(FETCH_STATUSES.PENDING);

            productDispatch({ type: PRODUCT.UNFAVORITED });

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
    [product, fetchStatus, customerToken, response, productDispatch]
  );


  return onSubmit;
}

