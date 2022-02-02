
import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DELIVERY_FIRM, getDeliveryFirmFetchStatusAction } from "../../context/actions/deliveryFirmActions";
import DeliveryFirmRepository from "../../repositories/DeliveryFirmRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";

export function useDeliveryFirmFetch(userToken) {

  const { ID } = useParams();

  const { 
    deliveryFirm : { 
      deliveryFirmDispatch,
      deliveryFirm: {
        deliveryFirm,
        deliveryFirmID,
        deliveryFirmLoading,
        deliveryFirmFetchStatus
      } 
    }
  } = useAppContext();

  const refetch = useCallback(
    ()=> {
      if (deliveryFirmFetchStatus !== FETCH_STATUSES.LOADING && deliveryFirmFetchStatus !== FETCH_STATUSES.DONE)
        deliveryFirmDispatch(getDeliveryFirmFetchStatusAction(FETCH_STATUSES.LOADING, Number(ID), true));
    },
    [ID, deliveryFirmFetchStatus, deliveryFirmDispatch]
  );
  
  useEffect(
    ()=> {

      if (deliveryFirmID !== null && deliveryFirmID !== Number(ID)) {
        
        deliveryFirmDispatch({ type: DELIVERY_FIRM.UNFETCHED });

      } else if (deliveryFirmLoading && deliveryFirmFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        deliveryFirmDispatch(getDeliveryFirmFetchStatusAction(FETCH_STATUSES.ERROR, Number(ID), false));

      } else if (deliveryFirmLoading && deliveryFirmFetchStatus === FETCH_STATUSES.LOADING) {

        deliveryFirmDispatch(getDeliveryFirmFetchStatusAction(FETCH_STATUSES.LOADING, Number(ID), false));

        const api = new DeliveryFirmRepository(userToken);
        api.get(ID)
        .then(res=> {
          
          if (res.status === 200) {
            deliveryFirmDispatch({
              type: DELIVERY_FIRM.FETCHED, 
              payload: {
                deliveryFirm: res.body.data, 
                fetchStatus: FETCH_STATUSES.DONE 
              }
            });
          } else if (res.status === 404) {

            deliveryFirmDispatch(getDeliveryFirmFetchStatusAction(FETCH_STATUSES.NOT_FOUND, Number(ID), false));

          } else if (res.status === 403) {

            deliveryFirmDispatch(getDeliveryFirmFetchStatusAction(FETCH_STATUSES.FORBIDDEN, Number(ID), false));

          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          deliveryFirmDispatch(getDeliveryFirmFetchStatusAction(FETCH_STATUSES.ERROR, Number(ID), false));
        });
      }
    }
  );

  return [deliveryFirm, deliveryFirmFetchStatus, refetch];
}

