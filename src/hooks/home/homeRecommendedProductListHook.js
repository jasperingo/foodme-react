import { useCallback, useMemo } from 'react';
import { PRODUCT } from '../../context/actions/productActions';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import ProductRepository from '../../repositories/ProductRepository';
import { useAppContext } from '../contextHook';

export function useHomeRecommendedProductList() {

  const { 
    home: { 
      homeDispatch,
      home: {
        products,
        productsError,
        productsLoaded,
        productsLoading,
      } 
    }
  } = useAppContext();

  const api = useMemo(function() { return new ProductRepository(); }, []);

  const retryFetch = useCallback(
    function() { 
      homeDispatch({ 
        type: PRODUCT.LIST_ERROR_CHANGED, 
        payload: { error: null } 
      });
    },
    [homeDispatch]
  );
  
  const fetch = useCallback(
    async function() {
      
      if (productsLoaded || productsLoading || productsError !== null) return;

      if (!window.navigator.onLine) {
        homeDispatch({
          type: PRODUCT.LIST_ERROR_CHANGED,
          payload: {
            error: NetworkErrorCodes.NO_NETWORK_CONNECTION
          }
        });
        return;
      }

      homeDispatch({ type: PRODUCT.LIST_FETCHING });

      try {
        
        const res = await api.getRecommendedList();

        if (res.status === 200) {
          homeDispatch({
            type: PRODUCT.LIST_FETCHED, 
            payload: { list: res.body.data }
          });
        } else {
          throw new Error();
        }
        
      } catch {
        homeDispatch({
          type: PRODUCT.LIST_ERROR_CHANGED,
          payload: {
            error: NetworkErrorCodes.UNKNOWN_ERROR
          }
        });
      }
    },
    [api, productsLoaded, productsLoading, productsError, homeDispatch]
  );

  return [fetch, products, productsLoading, productsError, productsLoaded, retryFetch];
}
