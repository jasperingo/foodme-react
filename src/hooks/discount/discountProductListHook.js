
import { useCallback, useEffect } from "react";
import { DISCOUNT, getDiscountProductsListFetchStatusAction } from "../../context/actions/discountActions";
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
        discountProducts,
        discountProductsPage,
        discountProductsLoading,
        discountProductsNumberOfPages,
        discountProductsFetchStatus
      } 
    }
  } = useAppContext();

  const listStatusUpdater = useUpdateListFetchStatus();

  const refetch = useCallback(
    ()=> {
      if (discountProductsFetchStatus !== FETCH_STATUSES.LOADING) 
        discountDispatch(getDiscountProductsListFetchStatusAction(FETCH_STATUSES.LOADING, true));
    },
    [discountDispatch, discountProductsFetchStatus]
  );

  const refresh = useCallback(
    ()=> {
      discountDispatch({ type: DISCOUNT.PRODUCT_LIST_UNFETCHED });
    },
    [discountDispatch]
  );
  
  useEffect(
    ()=> {
      if (discountProductsLoading && discountProductsFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        discountDispatch(getDiscountProductsListFetchStatusAction(FETCH_STATUSES.ERROR, false));

      } else if (discountProductsLoading && discountProductsFetchStatus === FETCH_STATUSES.LOADING) {

        discountDispatch(getDiscountProductsListFetchStatusAction(FETCH_STATUSES.LOADING, false));
        
        const api = new DiscountRepository(userToken);
        api.getProductsList(discount.id, discountProductsPage)
        .then(res=> {
          
          if (res.status === 200) {
            discountDispatch({
              type:   DISCOUNT.PRODUCT_LIST_FETCHED, 
              payload: {
                list: res.body.data, 
                numberOfPages: res.body.pagination.number_of_pages,
                fetchStatus: listStatusUpdater(
                  discountProductsPage, 
                  res.body.pagination.number_of_pages, 
                  discountProducts.length, 
                  res.body.data.length
                ),
              }
            });
          } else if (res.status === 404) {

            discountDispatch(getDiscountProductsListFetchStatusAction(FETCH_STATUSES.NOT_FOUND, false));

          } else if (res.status === 403) {

            discountDispatch(getDiscountProductsListFetchStatusAction(FETCH_STATUSES.FORBIDDEN, false));
            
          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          discountDispatch(getDiscountProductsListFetchStatusAction(FETCH_STATUSES.ERROR, false));
        });
      }
    },
    [
      discount.id, 
      discountProducts, 
      discountProductsPage, 
      discountProductsLoading,
      discountProductsFetchStatus, 
      userToken, 
      discountDispatch, 
      listStatusUpdater
    ]
  );
  
  return [
    discountProducts, 
    discountProductsFetchStatus, 
    discountProductsPage, 
    discountProductsNumberOfPages, 
    refetch,
    refresh
  ];
}

