
import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductVariantFetchStatusAction, PRODUCT } from "../../context/actions/productActions";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import ProductVariantRepository from "../../repositories/ProductVariantRepository";
import { useAppContext } from "../contextHook";

export function useProductVariantFetch(userToken) {

  const { ID } = useParams();

  const { 
    product: {
      productDispatch,
      product: {
        productVariant,
        productVariantID,
        productVariantLoading,
        productVariantFetchStatus
      } 
    }
  } = useAppContext();

  const refetch = useCallback(
    ()=> {
      if (productVariantFetchStatus !== FETCH_STATUSES.LOADING && productVariantFetchStatus !== FETCH_STATUSES.DONE)
        productDispatch(getProductVariantFetchStatusAction(FETCH_STATUSES.LOADING, Number(ID), true));
    },
    [ID, productVariantFetchStatus, productDispatch]
  );
  
  useEffect(
    ()=> {

      if (productVariantID !== null && productVariantID !== Number(ID)) {
        
        productDispatch({ type: PRODUCT.VARIANT_UNFETCHED });

      } else if (productVariantLoading && productVariantFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        productDispatch(getProductVariantFetchStatusAction(FETCH_STATUSES.ERROR, Number(ID), false));

      } else if (productVariantLoading && productVariantFetchStatus === FETCH_STATUSES.LOADING) {

        productDispatch(getProductVariantFetchStatusAction(FETCH_STATUSES.LOADING, Number(ID), false));

        const api = new ProductVariantRepository(userToken);
        api.get(ID)
        .then(res=> {
          
          if (res.status === 200) {

            productDispatch({
              type: PRODUCT.VARIANT_FETCHED, 
              payload: {
                productVariant: res.body.data, 
                fetchStatus: FETCH_STATUSES.DONE 
              }
            });

          } else if (res.status === 404) {

            productDispatch(getProductVariantFetchStatusAction(FETCH_STATUSES.NOT_FOUND, Number(ID), false));

          } else if (res.status === 403) {

            productDispatch(getProductVariantFetchStatusAction(FETCH_STATUSES.FORBIDDEN, Number(ID), false));

          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          productDispatch(getProductVariantFetchStatusAction(FETCH_STATUSES.ERROR, Number(ID), false));
        });
      }
    }
  );

  return [productVariant, productVariantFetchStatus, refetch];
}

