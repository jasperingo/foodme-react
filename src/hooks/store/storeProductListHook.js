
import { useCallback, useMemo } from "react";
import { PRODUCT } from "../../context/actions/productActions";
import NetworkError from "../../errors/NetworkError";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import StoreRepository from "../../repositories/StoreRepository";
import { useAppContext } from "../contextHook";

export function useStoreProductList(userToken) {

  const { 
    store: { 
      storeDispatch,
      store: {
        products,
        productsError,
        productsPage,
        productsLoaded,
        productsLoading,
        productsNumberOfPages,
      } 
    }
  } = useAppContext();

  const api = useMemo(function() { return new StoreRepository(userToken); }, [userToken]);

  function refreshStoreProducts() {
    storeDispatch({ type: PRODUCT.LIST_UNFETCHED }); 
  }

  const fetchStoreProducts = useCallback(
    async function(ID, subCategory) {

      if (productsLoading) return;

      if (!window.navigator.onLine) {
        storeDispatch({
          type: PRODUCT.LIST_ERROR_CHANGED,
          payload: { error: NetworkErrorCodes.NO_NETWORK_CONNECTION }
        });
        return;
      } 
      
      storeDispatch({ type: PRODUCT.LIST_FETCHING });
      
      try {

        const res = await api.getProductsList(ID, productsPage, subCategory)
       
        if (res.status === 200) {
          storeDispatch({
            type: PRODUCT.LIST_FETCHED, 
            payload: {
              list: res.body.data, 
              numberOfPages: res.body.pagination.number_of_pages,
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
        storeDispatch({
          type: PRODUCT.LIST_ERROR_CHANGED,
          payload: { error: error instanceof NetworkError ? error.message : NetworkErrorCodes.UNKNOWN_ERROR }
        });
      }
    },
    [
      api,
      productsPage, 
      productsLoading, 
      storeDispatch, 
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
