
import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductFetchStatusAction, PRODUCT } from "../../context/actions/productActions";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import ProductRepository from "../../repositories/ProductRepository";
import { useAppContext } from "../contextHook";

export function useProductFetch(userToken) {

  const { ID } = useParams();

  const { 
    product: {
      productDispatch,
      product: {
        product,
        productID,
        productFetchStatus
      } 
    }
  } = useAppContext();

  const refetch = useCallback(
    ()=> {
      if (productFetchStatus !== FETCH_STATUSES.LOADING && productFetchStatus !== FETCH_STATUSES.DONE)
        productDispatch(getProductFetchStatusAction(FETCH_STATUSES.LOADING, Number(ID)));
    },
    [ID, productFetchStatus, productDispatch]
  );
  
  useEffect(
    ()=> {

      if (productID !== null && productID !== Number(ID)) {
        
        productDispatch({ type: PRODUCT.UNFETCHED });

      } else if (productFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        productDispatch(getProductFetchStatusAction(FETCH_STATUSES.ERROR, Number(ID)));

      } else if (productFetchStatus === FETCH_STATUSES.LOADING) {

        const api = new ProductRepository(userToken);
        api.get(ID)
        .then(res=> {
          
          if (res.status === 200) {
            productDispatch({
              type: PRODUCT.FETCHED, 
              payload: {
                product: res.body.data, 
                fetchStatus: FETCH_STATUSES.DONE 
              }
            });
          } else if (res.status === 404) {
            productDispatch(getProductFetchStatusAction(FETCH_STATUSES.NOT_FOUND, Number(ID)));
          } else if (res.status === 403) {
            productDispatch(getProductFetchStatusAction(FETCH_STATUSES.FORBIDDEN, Number(ID)));
          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          productDispatch(getProductFetchStatusAction(FETCH_STATUSES.ERROR, Number(ID)));
        });
      }
    }
  );

  return [product, productFetchStatus, refetch];
}

