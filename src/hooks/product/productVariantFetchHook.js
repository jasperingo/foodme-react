
import { useCallback, useMemo } from "react";
import { PRODUCT } from "../../context/actions/productActions";
import NetworkError from "../../errors/NetworkError";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import ProductVariantRepository from "../../repositories/ProductVariantRepository";
import { useAppContext } from "../contextHook";

export function useProductVariantFetch(userToken) {

  const { 
    product: {
      productDispatch,
      product: {
        productVariant,
        productVariantID,
        productVariantLoading,
        productVariantError
      } 
    }
  } = useAppContext();

  const api = useMemo(function() { return new ProductVariantRepository(userToken); }, [userToken]);

  const unfetchProductVariant = useCallback(
    function() { productDispatch({ type: PRODUCT.VARIANT_UNFETCHED }); },
    [productDispatch]
  );

  const fetchProductVariant = useCallback(
    async function(ID) {

      if (productVariantLoading) return;

      if (!window.navigator.onLine) {
        productDispatch({
          type: PRODUCT.VARIANT_ERROR_CHANGED,
          payload: { 
            id: ID,
            error: NetworkErrorCodes.NO_NETWORK_CONNECTION 
          }
        });
        return;
      }

      productDispatch({ type: PRODUCT.VARIANT_FETCHING });

      try {

        const res = await api.get(ID);
          
        if (res.status === 200) {
          productDispatch({
            type: PRODUCT.VARIANT_FETCHED, 
            payload: {
              id: ID,
              productVariant: res.body.data 
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
          type: PRODUCT.VARIANT_ERROR_CHANGED,
          payload: {
            id: ID,
            error: error instanceof NetworkError ? error.message : NetworkErrorCodes.UNKNOWN_ERROR
          }
        });
      }
    },
    [api, productVariantLoading, productDispatch]
  );

  return [
    fetchProductVariant,
    productVariant,
    productVariantLoading,
    productVariantError,
    productVariantID,
    unfetchProductVariant
  ];
}
