
import { useCallback, useMemo } from "react";
import { DISCOUNT } from "../../context/actions/discountActions";
import NetworkError from "../../errors/NetworkError";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import DiscountRepository from "../../repositories/DiscountRepository";
import { useAppContext } from "../contextHook";

export function useDiscountProductList(userToken) {

  const { 
    discount: {
      discountDispatch,
      discount: {
        discountProducts,
        discountProductsPage,
        discountProductsError,
        discountProductsLoaded,
        discountProductsLoading,
        discountProductsNumberOfPages
      } 
    }
  } = useAppContext();

  const api = useMemo(function() { return new DiscountRepository(userToken); }, [userToken]);

  function refreshDiscountProducts() {
    discountDispatch({ type: DISCOUNT.PRODUCT_LIST_UNFETCHED }); 
  }
  
  const fetchDiscountProducts = useCallback(
    async function(ID) {

      if (discountProductsLoading) return;

      if (!window.navigator.onLine) {
        discountDispatch({
          type: DISCOUNT.PRODUCT_LIST_ERROR_CHANGED,
          payload: { error: NetworkErrorCodes.NO_NETWORK_CONNECTION }
        });
        return;
      } 
      
      discountDispatch({ type: DISCOUNT.PRODUCT_LIST_FETCHING });
      
      try {

        const res = await api.getProductsList(ID, discountProductsPage);
          
        if (res.status === 200) {
          discountDispatch({
            type:   DISCOUNT.PRODUCT_LIST_FETCHED, 
            payload: {
              list: res.body.data, 
              numberOfPages: res.body.pagination.number_of_pages
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
        discountDispatch({
          type: DISCOUNT.PRODUCT_LIST_ERROR_CHANGED,
          payload: { error: error instanceof NetworkError ? error.message : NetworkErrorCodes.UNKNOWN_ERROR }
        });
      }
    },
    [
      api,
      discountProductsPage, 
      discountProductsLoading,
      discountDispatch, 
    ]
  );
  
  return [
    fetchDiscountProducts,
    discountProducts, 
    discountProductsLoading,
    discountProductsLoaded,
    discountProductsError,
    discountProductsPage, 
    discountProductsNumberOfPages,
    refreshDiscountProducts
  ];
}
