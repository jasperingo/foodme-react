import { useCallback, useMemo } from "react";
import { DISCOUNT } from "../../context/actions/discountActions";
import NetworkError from "../../errors/NetworkError";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import DiscountRepository from "../../repositories/DiscountRepository";
import { useAppContext } from "../contextHook";


export function useDiscountFetch(userToken) {

  const { 
    discount: {
      discountDispatch,
      discount: {
        discount,
        discountID,
        discountLoading,
        discountError
      } 
    }
  } = useAppContext();

  const api = useMemo(function() { return new DiscountRepository(userToken); }, [userToken]);

  const unfetchDiscount = useCallback(
    function() { discountDispatch({ type: DISCOUNT.UNFETCHED }); },
    [discountDispatch]
  );
  
  const fetchDiscount = useCallback(
    async function(ID) {

      if (discountLoading) return;

      if (!window.navigator.onLine) {
        discountDispatch({
          type: DISCOUNT.ERROR_CHANGED,
          payload: { 
            id: ID,
            error: NetworkErrorCodes.NO_NETWORK_CONNECTION 
          }
        });
        return;
      } 

      discountDispatch({ type: DISCOUNT.FETCHING });

      try {

        const res = await api.get(ID);
          
        if (res.status === 200) {
          discountDispatch({
            type: DISCOUNT.FETCHED, 
            payload: {
              id: ID,
              discount: res.body.data
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
          type: DISCOUNT.ERROR_CHANGED,
          payload: {
            id: ID,
            error: error instanceof NetworkError ? error.message : NetworkErrorCodes.UNKNOWN_ERROR
          }
        });
      }
    },
    [api, discountLoading, discountDispatch]
  );
  
  return [
    fetchDiscount,
    discount,
    discountLoading,
    discountError,
    discountID,
    unfetchDiscount
  ];
}
