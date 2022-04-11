
import { useCallback, useMemo } from "react";
import { PRODUCT } from "../../context/actions/productActions";
import NetworkError from "../../errors/NetworkError";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import ProductRepository from "../../repositories/ProductRepository";
import { useAppContext } from "../contextHook";

export function useProductFetch(userToken) {

  const { 
    product: {
      productDispatch,
      product: {
        product,
        productID,
        productLoading,
        productError
      } 
    }
  } = useAppContext();
  
  const api = useMemo(function() { return new ProductRepository(userToken); }, [userToken]);

  const unfetchProduct = useCallback(
    function() { productDispatch({ type: PRODUCT.UNFETCHED }); },
    [productDispatch]
  );
  
  const fetchProduct = useCallback(
    async function(ID) {

      if (productLoading) return;

      if (!window.navigator.onLine) {
        productDispatch({
          type: PRODUCT.ERROR_CHANGED,
          payload: { 
            id: ID,
            error: NetworkErrorCodes.NO_NETWORK_CONNECTION 
          }
        });
        return;
      } 

      productDispatch({ type: PRODUCT.FETCHING });

      try {

        const res = await api.get(ID);
        
        if (res.status === 200) {
          productDispatch({
            type: PRODUCT.FETCHED, 
            payload: {
              id: ID,
              product: res.body.data
            }
          });
        } else if (res.status === 404) {
          throw new NetworkError(NetworkErrorCodes.NOT_FOUND);
        } else if (res.status === 403) {
          throw new NetworkError(NetworkErrorCodes.FORBIDDEN);
        } else {
          throw new Error();
        }

      } catch(error) {
        productDispatch({
          type: PRODUCT.ERROR_CHANGED,
          payload: {
            id: ID,
            error: error instanceof NetworkError ? error.message : NetworkErrorCodes.UNKNOWN_ERROR
          }
        });
      }
    },
    [api, productLoading, productDispatch]
  );

  return [
    fetchProduct,
    product,
    productLoading,
    productError,
    productID,
    unfetchProduct
  ];
}
