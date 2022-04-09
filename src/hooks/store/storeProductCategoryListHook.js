import { useMemo, useCallback } from 'react';
import { CATEGORY } from '../../context/actions/categoryActions';
import NetworkError from '../../errors/NetworkError';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import StoreRepository from '../../repositories/StoreRepository';
import { useAppContext } from '../contextHook';

export function useStoreProductCategoryList(userToken) {

  const { 
    store: { 
      storeDispatch,
      store: {
        productCategories,
        productCategoriesError,
        productCategoriesLoaded,
        productCategoriesLoading
      } 
    }
  } = useAppContext();

  const api = useMemo(function() { return new StoreRepository(userToken); }, [userToken]);
  
  const fetchStoreProductCategories = useCallback(
    async function(ID) {
      
      if (productCategoriesLoading) return;

      if (!window.navigator.onLine) {
        storeDispatch({
          type: CATEGORY.PRODUCTS_LIST_ERROR_CHANGED,
          payload: { error: NetworkErrorCodes.NO_NETWORK_CONNECTION }
        });
        return;
      }

      storeDispatch({ type: CATEGORY.PRODUCTS_LIST_FETCHING });

      try {
        
        const res = await api.getProductCategoryList(ID);

        if (res.status === 200) {
          storeDispatch({
            type: CATEGORY.PRODUCTS_LIST_FETCHED, 
            payload: { list: res.body.data }
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
        storeDispatch({
          type: CATEGORY.PRODUCTS_LIST_ERROR_CHANGED,
          payload: { error: error instanceof NetworkError ? error.message : NetworkErrorCodes.UNKNOWN_ERROR }
        });
      }
    },
    [api, productCategoriesLoading, storeDispatch]
  );

  return [
    fetchStoreProductCategories, 
    productCategories, 
    productCategoriesLoading, 
    productCategoriesError, 
    productCategoriesLoaded
  ];
}
