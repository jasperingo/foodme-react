import { useCallback, useMemo } from "react";
import { PRODUCT } from "../../context/actions/productActions";
import NetworkError from "../../errors/NetworkError";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import ProductRepository from "../../repositories/ProductRepository";
import { useAppContext } from "../contextHook";

export function useProductRelatedList(productId, userToken) {

  const { 
    product: {
      productDispatch,
      product: {
        related,
        relatedPage,
        relatedError,
        relatedLoaded,
        relatedLoading,
        relatedNumberOfPages
      } 
    }
  } = useAppContext();

  const api = useMemo(function() { return new ProductRepository(userToken); }, [userToken]);
  
  const fetchRelatedProducts = useCallback(
    async function() {
      
      if (!window.navigator.onLine) {
        productDispatch({
          type: PRODUCT.RELATED_LIST_ERROR_CHANGED,
          payload: { error: NetworkErrorCodes.NO_NETWORK_CONNECTION }
        });
        return;
      }

      productDispatch({ type: PRODUCT.RELATED_LIST_FETCHING });
        
      try {
        const res = await api.getRelatedList(productId, relatedPage)
        
        if (res.status === 200) {
          productDispatch({
            type: PRODUCT.RELATED_LIST_FETCHED, 
            payload: {
              list: res.body.data, 
              numberOfPages: res.body.pagination.number_of_pages,
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
          type: PRODUCT.RELATED_LIST_ERROR_CHANGED,
          payload: { error: error instanceof NetworkError ? error.message : NetworkErrorCodes.UNKNOWN_ERROR }
        });
      }
    },
    [productId, api, relatedPage, productDispatch]
  );

  return [
    fetchRelatedProducts,
    related, 
    relatedLoading,
    relatedLoaded,
    relatedError,
    relatedPage,
    relatedNumberOfPages
  ];
}
