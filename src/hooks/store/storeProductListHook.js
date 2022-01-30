
import { useCallback, useEffect } from "react";
import { getProductsListFetchStatusAction, PRODUCT } from "../../context/actions/productActions";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import StoreRepository from "../../repositories/StoreRepository";
import { useAppContext } from "../contextHook";
import { useUpdateListFetchStatus } from "../viewHook";


export function useStoreProductList() {

  const { 
    store: { 
      storeDispatch,
      store: {
        store,
        products,
        productsFetchStatus,
        productsPage,
        productsNumberOfPages,
      } 
    },
    customer: {
      customer: {
        customer: {
          customerToken
        }
      } 
    } 
  } = useAppContext();

  const listStatusUpdater = useUpdateListFetchStatus();

  const refetch = useCallback(
    ()=> {
      if (productsFetchStatus !== FETCH_STATUSES.LOADING) 
        storeDispatch(getProductsListFetchStatusAction(FETCH_STATUSES.LOADING));
    },
    [storeDispatch, productsFetchStatus]
  );
  
  useEffect(
    ()=> {
      if (productsFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        storeDispatch(getProductsListFetchStatusAction(FETCH_STATUSES.ERROR));

      } else if (productsFetchStatus === FETCH_STATUSES.LOADING) {
        
        const api = new StoreRepository(customerToken);
        api.getProductsList(store.id, productsPage)
        .then(res=> {
          
          if (res.status === 200) {
            storeDispatch({
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
          } else if (res.status === 404) {
            storeDispatch(getProductsListFetchStatusAction(FETCH_STATUSES.NOT_FOUND));
          } else if (res.status === 403) {
            storeDispatch(getProductsListFetchStatusAction(FETCH_STATUSES.FORBIDDEN));
          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          storeDispatch(getProductsListFetchStatusAction(FETCH_STATUSES.ERROR));
        });
      }
    },
    [store.id, products, productsPage, productsFetchStatus, customerToken, storeDispatch, listStatusUpdater]
  );

  return [products, productsFetchStatus, productsPage, productsNumberOfPages, refetch];
}

