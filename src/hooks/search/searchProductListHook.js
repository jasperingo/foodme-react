
import { useCallback, useMemo } from "react";
import { PRODUCT } from "../../context/actions/productActions";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import ProductRepository from "../../repositories/ProductRepository";
import { useAppContext } from "../contextHook";

export function useSearchProductList() {

  const { 
    search: {
      searchDispatch,
      search: {
        products,
        productsError,
        productsLoaded,
        productsLoading,
        productsPage,
        productsNumberOfPages
      } 
    }
  } = useAppContext();

  const api = useMemo(function() { return new ProductRepository(); }, []);

  function refreshProducts() {
    searchDispatch({ type: PRODUCT.LIST_UNFETCHED }); 
  }

  const fetchProducts = useCallback(
    async function(q, subCategory) {

      if (productsLoading) return;
      
      if (!window.navigator.onLine) {
        searchDispatch({ 
          type: PRODUCT.LIST_ERROR_CHANGED,
          payload: { error: NetworkErrorCodes.NO_NETWORK_CONNECTION }
        });
        return;
      }

      searchDispatch({ type: PRODUCT.LIST_FETCHING });
        
      try {
        const res = await api.getSearchList(q, subCategory, productsPage)
          
        if (res.status === 200) {
          searchDispatch({
            type: PRODUCT.LIST_FETCHED, 
            payload: {
              list: res.body.data, 
              numberOfPages: res.body.pagination.number_of_pages
            }
          });
        } else {
          throw new Error();
        }

      } catch(error) {
        searchDispatch({
          type: PRODUCT.LIST_ERROR_CHANGED,
          payload: { error: NetworkErrorCodes.UNKNOWN_ERROR }
        });
      }
    },
    [
      api, 
      productsLoading, 
      productsPage, 
      searchDispatch, 
    ]
  );

  return [
    fetchProducts,
    products, 
    productsLoading,
    productsLoaded,
    productsError,
    productsPage, 
    productsNumberOfPages,
    refreshProducts
  ];
}
