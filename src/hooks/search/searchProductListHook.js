
import { useCallback, useEffect } from "react";
import { getProductsListFetchStatusAction, PRODUCT } from "../../context/actions/productActions";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import ProductRepository from "../../repositories/ProductRepository";
import { useAppContext } from "../contextHook";
import { useUpdateListFetchStatus, useURLQuery } from "../viewHook";


export function useSearchProductList() {

  const queryParam = useURLQuery().get('q');

  const { 
    search: {
      searchDispatch,
      search: {
        products,
        productsFetchStatus,
        productsPage,
        productsNumberOfPages,
        productsSubCategory,
      } 
    }
  } = useAppContext();

  const listStatusUpdater = useUpdateListFetchStatus();

  const refetch = useCallback(
    ()=> {
      if (productsFetchStatus !== FETCH_STATUSES.LOADING) 
        searchDispatch(getProductsListFetchStatusAction(FETCH_STATUSES.LOADING));
    },
    [searchDispatch, productsFetchStatus]
  );
  
  useEffect(
    ()=> {
      if (productsFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        searchDispatch(getProductsListFetchStatusAction(FETCH_STATUSES.ERROR));

      } else if (productsFetchStatus === FETCH_STATUSES.LOADING) {
        
        const api = new ProductRepository();
        api.getSearchList(queryParam, productsSubCategory, productsPage)
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
          searchDispatch(getProductsListFetchStatusAction(FETCH_STATUSES.ERROR));
        });
      }
    },
    [queryParam, productsSubCategory, products, productsPage, productsFetchStatus, searchDispatch, listStatusUpdater]
  );

  return [products, productsFetchStatus, productsPage, productsNumberOfPages, refetch];
}

