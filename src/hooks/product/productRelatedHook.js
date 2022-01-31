
import { useCallback, useEffect } from "react";
import { getRelatedProductsListFetchStatusAction, PRODUCT } from "../../context/actions/productActions";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import ProductRepository from "../../repositories/ProductRepository";
import { useAppContext } from "../contextHook";
import { useUpdateListFetchStatus } from "../viewHook";


export function useProductRelatedList(userToken) {

  const { 
    product: {
      productDispatch,
      product: {
        product,
        related,
        relatedPage,
        relatedNumberOfPages,
        relatedFetchStatus
      } 
    }
  } = useAppContext();

  const listStatusUpdater = useUpdateListFetchStatus();

  const refetch = useCallback(
    ()=> {
      if (relatedFetchStatus !== FETCH_STATUSES.LOADING) 
        productDispatch(getRelatedProductsListFetchStatusAction(FETCH_STATUSES.LOADING));
    },
    [productDispatch, relatedFetchStatus]
  );
  
  useEffect(
    ()=> {
      if (relatedFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        productDispatch(getRelatedProductsListFetchStatusAction(FETCH_STATUSES.ERROR));

      } else if (relatedFetchStatus === FETCH_STATUSES.LOADING) {
        
        const api = new ProductRepository(userToken);
        api.getRelatedList(product.id, relatedPage)
        .then(res=> {
          
          if (res.status === 200) {
            productDispatch({
              type: PRODUCT.RELATED_LIST_FETCHED, 
              payload: {
                list: res.body.data, 
                numberOfPages: res.body.pagination.number_of_pages,
                fetchStatus: listStatusUpdater(
                  relatedPage, 
                  res.body.pagination.number_of_pages, 
                  related.length, 
                  res.body.data.length
                ),
              }
            });
          } else if (res.status === 404) {

            productDispatch(getRelatedProductsListFetchStatusAction(FETCH_STATUSES.NOT_FOUND));

          } else if (res.status === 403) {

            productDispatch(getRelatedProductsListFetchStatusAction(FETCH_STATUSES.FORBIDDEN));
            
          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          productDispatch(getRelatedProductsListFetchStatusAction(FETCH_STATUSES.ERROR));
        });
      }
    },
    [product.id, related, relatedPage, relatedFetchStatus, userToken, productDispatch, listStatusUpdater]
  );

  return [related, relatedFetchStatus, relatedPage, relatedNumberOfPages, refetch];
}

