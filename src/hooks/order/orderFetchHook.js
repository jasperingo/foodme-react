import { useCallback, useMemo } from "react";
import { ORDER } from "../../context/actions/orderActions";
import NetworkError from "../../errors/NetworkError";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import OrderRepository from "../../repositories/OrderRepository";
import { useAppContext } from "../contextHook";

export function useOrderFetch(userToken) {

  const { 
    order: { 
      orderDispatch,
      order: {
        order,
        orderID,
        orderLoading,
        orderError
      } 
    }
  } = useAppContext();

  const api = useMemo(function() { return new OrderRepository(userToken); }, [userToken]);

  const unfetchOrder = useCallback(
    function() { orderDispatch({ type: ORDER.UNFETCHED }); },
    [orderDispatch]
  );
  
  const fetchOrder = useCallback(
    async function(ID) {

      if (!window.navigator.onLine) {
        orderDispatch({
          type: ORDER.ERROR_CHANGED,
          payload: {
            id: ID,
            error: NetworkErrorCodes.NO_NETWORK_CONNECTION
          }
        });
        return;
      }

      orderDispatch({ type: ORDER.FETCHING });

      try {
        const res = await api.get(ID);
       
        if (res.status === 200) {
          orderDispatch({
            type: ORDER.FETCHED, 
            payload: {
              order: res.body.data, 
              id: String(res.body.data.id)
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
        orderDispatch({
          type: ORDER.ERROR_CHANGED,
          payload: {
            id: ID,
            error: error instanceof NetworkError ? error.message : NetworkErrorCodes.UNKNOWN_ERROR
          }
        });
      }
    },
    [api, orderDispatch]
  );
  
  return [
    fetchOrder,
    order,
    orderLoading,
    orderError,
    orderID,
    unfetchOrder
  ];
}

