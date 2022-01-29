
import { useCallback, useEffect } from "react";
import { getProductsListFetchStatusAction, PRODUCT } from "../../context/actions/productActions";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import ProductRepository from "../../repositories/ProductRepository";
import { useAppContext } from "../contextHook";


export function useHomeProductList(start) {

  const { 
    home: { 
      homeDispatch,
      home: {
        products,
        productsFetchStatus
      } 
    }
  } = useAppContext();

  const refetch = useCallback(
    ()=> {
      if (productsFetchStatus !== FETCH_STATUSES.LOADING) 
        homeDispatch(getProductsListFetchStatusAction(FETCH_STATUSES.LOADING));
    },
    [homeDispatch, productsFetchStatus]
  );

  useEffect(
    ()=> {
      if (start === true && productsFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {
        homeDispatch(getProductsListFetchStatusAction(FETCH_STATUSES.ERROR));
      } else if (start === true && productsFetchStatus === FETCH_STATUSES.LOADING) {
        const api = new ProductRepository();
        api.getRandomList()
        .then(res=> {
          
          if (res.status === 200) {
            homeDispatch({
              type: PRODUCT.LIST_FETCHED, 
              payload: {
                list: res.body.data, 
                fetchStatus: FETCH_STATUSES.DONE 
              }
            });
          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          homeDispatch(getProductsListFetchStatusAction(FETCH_STATUSES.ERROR));
        });
      }
    },
    [start, productsFetchStatus, homeDispatch]
  );

  return [products, productsFetchStatus, refetch];
}

