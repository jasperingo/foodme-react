
import { useCallback, useEffect } from "react";
import { CATEGORY, getProductCategoriesListFetchStatusAction } from "../../context/actions/categoryActions";
import CategoryRepository from "../../repositories/CategoryRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";


export function useProductCategoryList(start) {

  const { 
    category: { 
      categoryDispatch,
      category: {
        products,
        productsFetchStatus
      } 
    }
  } = useAppContext();

  const refetch = useCallback(
    ()=> {
      if (productsFetchStatus !== FETCH_STATUSES.LOADING) 
        categoryDispatch(getProductCategoriesListFetchStatusAction(FETCH_STATUSES.LOADING));
    },
    [categoryDispatch, productsFetchStatus]
  );

  useEffect(
    ()=> {
      if (start === true && productsFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {
        categoryDispatch(getProductCategoriesListFetchStatusAction(FETCH_STATUSES.ERROR));
      } else if (start === true && productsFetchStatus === FETCH_STATUSES.LOADING) {
        const api = new CategoryRepository();
        api.getListByProduct()
        .then(res=> {
          
          if (res.status === 200) {
            categoryDispatch({
              type: CATEGORY.PRODUCTS_LIST_FETCHED, 
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
          categoryDispatch(getProductCategoriesListFetchStatusAction(FETCH_STATUSES.ERROR));
        });
      }
    },
    [start, productsFetchStatus, categoryDispatch]
  );

  return [products, productsFetchStatus, refetch];
}


