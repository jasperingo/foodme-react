
import { useCallback, useEffect } from "react";
import { getProductsListFetchStatusAction, PRODUCT } from "../../context/actions/productActions";
import DiscountRepository from "../../repositories/DiscountRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";
import { useUpdateListFetchStatus } from "../viewHook";


export function useDiscountProductList(userToken) {

  const { 
    discount: {
      discountDispatch,
      discount: {
        discount,
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
        discountDispatch(getProductsListFetchStatusAction(FETCH_STATUSES.LOADING, true));
    },
    [discountDispatch, productsFetchStatus]
  );

  const refresh = useCallback(
    ()=> {
      discountDispatch({ type: PRODUCT.LIST_UNFETCHED });
    },
    [discountDispatch]
  );
  
  useEffect(
    ()=> {
      if (productsLoading && productsFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        discountDispatch(getProductsListFetchStatusAction(FETCH_STATUSES.ERROR, false));

      } else if (productsLoading && productsFetchStatus === FETCH_STATUSES.LOADING) {

        discountDispatch(getProductsListFetchStatusAction(FETCH_STATUSES.LOADING, false));
        
        const api = new DiscountRepository(userToken);
        api.getProductsList(discount.id, productsPage)
        .then(res=> {
          
          if (res.status === 200) {
            discountDispatch({
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

            discountDispatch(getProductsListFetchStatusAction(FETCH_STATUSES.NOT_FOUND, false));

          } else if (res.status === 403) {

            discountDispatch(getProductsListFetchStatusAction(FETCH_STATUSES.FORBIDDEN, false));
            
          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          discountDispatch(getProductsListFetchStatusAction(FETCH_STATUSES.ERROR, false));
        });
      }
    },
    [
      discount.id, 
      products, 
      productsPage, 
      productsLoading,
      productsFetchStatus, 
      userToken, 
      discountDispatch, 
      listStatusUpdater
    ]
  );

  return [products, productsFetchStatus, productsPage, productsNumberOfPages, refetch, refresh];
}

