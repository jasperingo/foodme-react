
import { useCallback, useMemo } from "react";
import { DISCOUNT } from "../../context/actions/discountActions";
import NetworkError from "../../errors/NetworkError";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import StoreRepository from "../../repositories/StoreRepository";
import { useAppContext } from "../contextHook";

export function useStoreDiscountList(userToken) {

  const { 
    store: { 
      storeDispatch,
      store: {
        discounts,
        discountsPage,
        discountsLoaded,
        discountsLoading,
        discountsNumberOfPages,
        discountsError
      } 
    }
  } = useAppContext();

  const api = useMemo(function() { return new StoreRepository(userToken); }, [userToken]);
  
  function refreshStoreDiscounts() {
    storeDispatch({ type: DISCOUNT.LIST_UNFETCHED }); 
  }
  
  const fetchStoreDiscounts = useCallback(
    async function(ID) {

      if (discountsLoading) return;

      if (!window.navigator.onLine) {
        storeDispatch({
          type: DISCOUNT.LIST_ERROR_CHANGED,
          payload: { error: NetworkErrorCodes.NO_NETWORK_CONNECTION }
        });
        return;
      }

      storeDispatch({ type: DISCOUNT.LIST_FETCHING });

      try {

        const res = await api.getDiscountsList(ID, discountsPage);
        
        if (res.status === 200) {
          storeDispatch({
            type: DISCOUNT.LIST_FETCHED, 
            payload: {
              list: res.body.data, 
              numberOfPages: res.body.pagination.number_of_pages,
            }
          });
        } else if (res.status === 404) {
          throw new NetworkError(NetworkErrorCodes.NOT_FOUND);
        } else if (res.status === 403) {
          throw new NetworkError(NetworkErrorCodes.FORBIDDEN);
        } else {
          throw new Error();
        }

      } catch(error) {
        storeDispatch({
          type: DISCOUNT.LIST_ERROR_CHANGED,
          payload: { error: error instanceof NetworkError ? error.message : NetworkErrorCodes.UNKNOWN_ERROR }
        });
      }
    },
    [api, discountsPage, discountsLoading, storeDispatch]
  );

  return [
    fetchStoreDiscounts,
    discounts, 
    discountsLoading,
    discountsLoaded,
    discountsError,
    discountsPage, 
    discountsNumberOfPages,
    refreshStoreDiscounts
  ];
}
