import { useCallback, useEffect, useState } from "react";
import { DELIVERY_FIRM } from "../../context/actions/deliveryFirmActions";
import DeliveryFirmRepository from "../../repositories/DeliveryFirmRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";
import { useMessageFetch } from "../message/messageFetchHook";
import { useMessageUnreceivedCountFetch } from "../message/messageUnreceivedCountFetchHook";
import { DELIVERY_FIRM_ADMIN_ID, DELIVERY_FIRM_ID, DELIVERY_FIRM_TOKEN } from "./deliveryFirmConstants";


export function useDeliveryFirmAuthFetch() {

  const { 
    deliveryFirm: { deliveryFirmDispatch } 
  } = useAppContext();

  const newMessage = useMessageFetch();

  const messageCount = useMessageUnreceivedCountFetch();

  const [done, setDone] = useState(FETCH_STATUSES.LOADING);

  const retry = useCallback(() => setDone(FETCH_STATUSES.LOADING), []);
  
  useEffect(
    ()=> {
      const deliveryFirmId = window.localStorage.getItem(DELIVERY_FIRM_ID);
      const deliveryFirmToken = window.localStorage.getItem(DELIVERY_FIRM_TOKEN);
      const deliveryFirmAdminID = window.localStorage.getItem(DELIVERY_FIRM_ADMIN_ID);

      if (done === FETCH_STATUSES.LOADING && deliveryFirmId !== null && deliveryFirmToken !== null && !window.navigator.onLine) {

        setDone(FETCH_STATUSES.ERROR);

      } else if (done === FETCH_STATUSES.LOADING && deliveryFirmId !== null && deliveryFirmToken !== null) {
        
        const api = new DeliveryFirmRepository(deliveryFirmToken);

        api.get(deliveryFirmId)
        .then(res=> {
          
          if (res.status === 200) {
            
            deliveryFirmDispatch({
              type: DELIVERY_FIRM.AUTHED, 
              payload: { 
                token: deliveryFirmToken, 
                adminID: deliveryFirmAdminID,
                deliveryFirm: res.body.data, 
                fetchStatus: FETCH_STATUSES.DONE 
              }
            });

            setDone(FETCH_STATUSES.DONE);

            messageCount(deliveryFirmToken);

            newMessage(deliveryFirmToken, res.body.data.user.id);

          } else if (res.status === 401) {
            window.localStorage.removeItem(DELIVERY_FIRM_ID);
            window.localStorage.removeItem(DELIVERY_FIRM_TOKEN);
            window.localStorage.removeItem(DELIVERY_FIRM_ADMIN_ID);
            setDone(FETCH_STATUSES.DONE);
          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          setDone(FETCH_STATUSES.ERROR);
        });

      } else if (done === FETCH_STATUSES.LOADING && (deliveryFirmId === null || deliveryFirmToken === null)) {
        setDone(FETCH_STATUSES.DONE);
      }
    },
    [done, deliveryFirmDispatch, messageCount, newMessage]
  )
  
  return [done, retry];
}
