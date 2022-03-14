import { useMemo, useCallback } from 'react';
import { CATEGORY } from '../../context/actions/categoryActions';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import StoreRepository from '../../repositories/StoreRepository';
import { useAppContext } from '../contextHook';

export function useStoreProductCategoryList() {

  const { 
    store: { 
      storeDispatch,
      store: {
        store,
        productCategories,
        productCategoriesError,
        productCategoriesLoaded,
        productCategoriesLoading
      } 
    }
  } = useAppContext();

  const api = useMemo(function() { return new StoreRepository(); }, []);

  const retryFetch = useCallback(
    function() { 
      storeDispatch({ 
        type: CATEGORY.PRODUCTS_LIST_ERROR_CHANGED, 
        payload: { error: null } 
      }) ;
    },
    [storeDispatch]
  );
  
  const fetch = useCallback(
    async function() {
      
      if (productCategoriesLoaded || productCategoriesLoading || productCategoriesError !== null) return;

      if (!window.navigator.onLine) {
        storeDispatch({
          type: CATEGORY.PRODUCTS_LIST_ERROR_CHANGED,
          payload: {
            error: NetworkErrorCodes.NO_NETWORK_CONNECTION
          }
        });
        return;
      }

      storeDispatch({ type: CATEGORY.PRODUCTS_LIST_FETCHING });

      try {
        
        const res = await api.getProductCategoryList(store.id);

        if (res.status === 200) {

          storeDispatch({
            type: CATEGORY.PRODUCTS_LIST_FETCHED, 
            payload: { list: res.body.data }
          });

        } else if (res.status === 404) {

          storeDispatch({
            type: CATEGORY.PRODUCTS_LIST_ERROR_CHANGED,
            payload: {
              error: NetworkErrorCodes.NOT_FOUND
            }
          });

        } else if (res.status === 403) {

          storeDispatch({
            type: CATEGORY.PRODUCTS_LIST_ERROR_CHANGED,
            payload: {
              error: NetworkErrorCodes.FORBIDDEN
            }
          });

        } else {
          throw new Error();
        }
        
      } catch {
        storeDispatch({
          type: CATEGORY.PRODUCTS_LIST_ERROR_CHANGED,
          payload: {
            error: NetworkErrorCodes.UNKNOWN_ERROR
          }
        });
      }
    },
    [api, store.id, productCategoriesLoaded, productCategoriesLoading, productCategoriesError, storeDispatch]
  );

  return [fetch, productCategories, productCategoriesLoading, productCategoriesError, productCategoriesLoaded, retryFetch];
}
