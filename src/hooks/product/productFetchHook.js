
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
        productLoading,
        productFetchStatus
      } 
    }
  } = useAppContext();

  const refetch = useCallback(
    ()=> {
      if (productFetchStatus !== FETCH_STATUSES.LOADING && productFetchStatus !== FETCH_STATUSES.DONE)
        productDispatch(getProductFetchStatusAction(FETCH_STATUSES.LOADING, Number(ID), true));
    },
    [ID, productFetchStatus, productDispatch]
  );
  
  useEffect(
    ()=> {

      if (productID !== null && productID !== Number(ID)) {
        
        productDispatch({ type: PRODUCT.UNFETCHED });

      } else if (productLoading && productFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        productDispatch(getProductFetchStatusAction(FETCH_STATUSES.ERROR, Number(ID), false));

      } else if (productLoading && productFetchStatus === FETCH_STATUSES.LOADING) {

        productDispatch(getProductFetchStatusAction(FETCH_STATUSES.LOADING, Number(ID), false));

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
            productDispatch(getProductFetchStatusAction(FETCH_STATUSES.NOT_FOUND, Number(ID), false));
          } else if (res.status === 403) {
            productDispatch(getProductFetchStatusAction(FETCH_STATUSES.FORBIDDEN, Number(ID), false));
          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          productDispatch(getProductFetchStatusAction(FETCH_STATUSES.ERROR, Number(ID), false));
        });
      }
    }
  );

  return [product, productFetchStatus, refetch];
}

