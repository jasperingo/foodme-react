
import { useCallback, useEffect } from "react";
import { getProductsListFetchStatusAction, PRODUCT } from "../../context/actions/productActions";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import ProductRepository from "../../repositories/ProductRepository";
import { useAppContext } from "../contextHook";
import { useUpdateListFetchStatus, useURLQuery } from "../viewHook";


export function useSearchProductList() {

  const queryParam = useURLQuery().get('q');

  const subCategoryParam = useURLQuery().get('products_sub_category');

  const { 
    search: {
      searchDispatch,
      search: {
        products,
        productsFetchStatus,
        productsLoading,
        productsPage,
        productsNumberOfPages
      } 
    }
  } = useAppContext();

  const listStatusUpdater = useUpdateListFetchStatus();

  const refetch = useCallback(
    ()=> {
      if (productsFetchStatus !== FETCH_STATUSES.LOADING) 
        searchDispatch(getProductsListFetchStatusAction(FETCH_STATUSES.LOADING, true));
    },
    [searchDispatch, productsFetchStatus]
  );
  
  useEffect(
    ()=> {

      if (productsLoading && productsFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        searchDispatch(getProductsListFetchStatusAction(FETCH_STATUSES.ERROR, false));

      } else if (productsLoading && productsFetchStatus === FETCH_STATUSES.LOADING) {

        searchDispatch(getProductsListFetchStatusAction(FETCH_STATUSES.LOADING, false));
        
        const api = new ProductRepository();
        api.getSearchList(queryParam, subCategoryParam, productsPage)
        .then(res=> {
          
          if (res.status === 200) {
            searchDispatch({
              type: PRODUCT.LIST_FETCHED, 
              payload: {
                list: res.body.data, 
                numberOfPages: res.body.pagination.number_of_pages,
                fetchStatus: listStatusUpdater(
                  productsPage, 
                  res.body.pagination.number_of_pages, 
                  products.length, 
                  res.body.data.length
                ),
              }
            });
          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          searchDispatch(getProductsListFetchStatusAction(FETCH_STATUSES.ERROR, false));
        });
      }
    },
    [
      queryParam, 
      subCategoryParam, 
      products, 
      productsLoading, 
      productsPage, 
      productsFetchStatus, 
      searchDispatch, 
      listStatusUpdater
    ]
  );

  return [products, productsFetchStatus, productsPage, productsNumberOfPages, refetch];
}

