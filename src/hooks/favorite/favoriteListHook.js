
import { useCallback, useEffect } from "react";
import { getProductsListFetchStatusAction, PRODUCT } from "../../context/actions/productActions";
import CustomerRepository from "../../repositories/CustomerRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";
import { useUpdateListFetchStatus } from "../viewHook";


export function useFavoriteList(userId, userToken) {

  const { 
    product: {
      productDispatch,
      product: {
        products,
        productsPage,
        productsLoading,
        productsNumberOfPages,
        productsFetchStatus
      } 
    }
  } = useAppContext();

  const listStatusUpdater = useUpdateListFetchStatus();

  const refetch = useCallback(
    ()=> {
      if (productsFetchStatus !== FETCH_STATUSES.LOADING) 
        productDispatch(getProductsListFetchStatusAction(FETCH_STATUSES.LOADING, true));
    },
    [productDispatch, productsFetchStatus]
  );

  const refresh = useCallback(
    ()=> {
      productDispatch({ type: PRODUCT.LIST_UNFETCHED });
    },
    [productDispatch]
  );
  
  useEffect(
    ()=> {
      if (productsLoading && productsFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        productDispatch(getProductsListFetchStatusAction(FETCH_STATUSES.ERROR, false));

      } else if (productsLoading && productsFetchStatus === FETCH_STATUSES.LOADING) {

        productDispatch(getProductsListFetchStatusAction(FETCH_STATUSES.LOADING, false));
        
        const api = new CustomerRepository(userToken);
        api.getFavoritesList(userId, productsPage)
        .then(res=> {
          
          if (res.status === 200) {
            productDispatch({
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

            productDispatch(getProductsListFetchStatusAction(FETCH_STATUSES.NOT_FOUND, false));

          } else if (res.status === 403) {

            productDispatch(getProductsListFetchStatusAction(FETCH_STATUSES.FORBIDDEN, false));
            
          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          productDispatch(getProductsListFetchStatusAction(FETCH_STATUSES.ERROR, false));
        });
      }
    },
    [
      userId, 
      products, 
      productsPage, 
      productsLoading,
      productsFetchStatus, 
      userToken, 
      productDispatch, 
      listStatusUpdater
    ]
  );

  return [products, productsFetchStatus, productsPage, productsNumberOfPages, refetch, refresh];
}

