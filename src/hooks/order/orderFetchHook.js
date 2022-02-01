import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOrderFetchStatusAction, ORDER } from "../../context/actions/orderActions";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import OrderRepository from "../../repositories/OrderRepository";
import { useAppContext } from "../contextHook";


export function useOrderFetch(userToken) {

  const { ID } = useParams();

  const { 
    order: { 
      orderDispatch,
      order: {
        order,
        orderID,
        orderLoading,
        orderFetchStatus
      } 
    }
  } = useAppContext();

  const refetch = useCallback(
    ()=> {
      if (orderFetchStatus !== FETCH_STATUSES.LOADING && orderFetchStatus !== FETCH_STATUSES.DONE)
        orderDispatch(getOrderFetchStatusAction(FETCH_STATUSES.LOADING, Number(ID), true));
    },
    [ID, orderFetchStatus, orderDispatch]
  );
  
  useEffect(
    ()=> {

      if (orderID !== null && orderID !== Number(ID)) {

        orderDispatch({ type: ORDER.UNFETCHED });

      } else if (orderLoading && orderFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        orderDispatch(getOrderFetchStatusAction(FETCH_STATUSES.ERROR, Number(ID), false));

      } else if (orderLoading && orderFetchStatus === FETCH_STATUSES.LOADING) {

        orderDispatch(getOrderFetchStatusAction(FETCH_STATUSES.LOADING, Number(ID), false));

        const api = new OrderRepository(userToken);
        api.get(ID)
        .then(res=> {
          
          if (res.status === 200) {
            orderDispatch({
              type: ORDER.FETCHED, 
              payload: {
                order: res.body.data, 
                fetchStatus: FETCH_STATUSES.DONE 
              }
            });
          } else if (res.status === 404) {
            orderDispatch(getOrderFetchStatusAction(FETCH_STATUSES.NOT_FOUND, Number(ID), false));
          } else if (res.status === 403) {
            orderDispatch(getOrderFetchStatusAction(FETCH_STATUSES.FORBIDDEN, Number(ID), false));
          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          orderDispatch(getOrderFetchStatusAction(FETCH_STATUSES.ERROR, Number(ID), false));
        });
      }
    }
  );
  
  return [order, orderFetchStatus, refetch];
}

