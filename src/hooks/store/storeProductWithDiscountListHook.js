
import { useCallback, useMemo } from "react";
import { PRODUCT } from "../../context/actions/productActions";
import StoreRepository from "../../repositories/StoreRepository";
import { useAppContext } from "../contextHook";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import NetworkError from "../../errors/NetworkError";

export function useStoreProductWithDiscountList(userToken) {

  const {
    discount: {
      discountDispatch,
      discount: {
        products,
        productsPage,
        productsError,
        productsLoaded,
        productsLoading,
        productsNumberOfPages
      } 
    }
  } = useAppContext();

  const api = useMemo(function() { return new StoreRepository(userToken); }, [userToken]);

  function refreshStoreProducts() {
    discountDispatch({ type: PRODUCT.LIST_UNFETCHED }); 
  }
  
  const fetchStoreProducts = useCallback(
    async function(storeId, discountId) {

      if (productsLoading) return;

      if (!window.navigator.onLine) {
        discountDispatch({
          type: PRODUCT.LIST_ERROR_CHANGED,
          payload: { error: NetworkErrorCodes.NO_NETWORK_CONNECTION }
        });
        return;
      } 
      
      discountDispatch({ type: PRODUCT.LIST_FETCHING });
      
      try {

        const res = await api.getProductsWithDiscountList(storeId, discountId, productsPage);

        if (res.status === 200) {
          discountDispatch({
            type: PRODUCT.LIST_FETCHED, 
            payload: {
              list: res.body.data, 
              numberOfPages: res.body.pagination.number_of_pages
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
        discountDispatch({
          type: PRODUCT.LIST_ERROR_CHANGED,
          payload: { error: error instanceof NetworkError ? error.message : NetworkErrorCodes.UNKNOWN_ERROR }
        });
      }
    },
    [
      api,
      productsPage, 
      productsLoading,
      discountDispatch,
    ]
  );

  return [
    fetchStoreProducts,
    products, 
    productsLoading,
    productsError,
    productsLoaded,
    productsPage, 
    productsNumberOfPages,
    refreshStoreProducts
  ];
}
