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
        orderFetchStatus
      } 
    }
  } = useAppContext();

  const refetch = useCallback(
    ()=> {
      if (orderFetchStatus !== FETCH_STATUSES.LOADING && orderFetchStatus !== FETCH_STATUSES.DONE)
        orderDispatch(getOrderFetchStatusAction(FETCH_STATUSES.LOADING, Number(ID)));
    },
    [ID, orderFetchStatus, orderDispatch]
  );
  
  useEffect(
    ()=> {

      if (orderID !== null && orderID !== Number(ID)) {

        orderDispatch({ type: ORDER.UNFETCHED });

      } else if (orderFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        orderDispatch(getOrderFetchStatusAction(FETCH_STATUSES.ERROR, Number(ID)));

      } else if (orderFetchStatus === FETCH_STATUSES.LOADING) {

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
            orderDispatch(getOrderFetchStatusAction(FETCH_STATUSES.NOT_FOUND, Number(ID)));
          } else if (res.status === 403) {
            orderDispatch(getOrderFetchStatusAction(FETCH_STATUSES.FORBIDDEN, Number(ID)));
          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          orderDispatch(getOrderFetchStatusAction(FETCH_STATUSES.ERROR, Number(ID)));
        });
      }
    }
  );
  
  return [order, orderFetchStatus, refetch];
}

