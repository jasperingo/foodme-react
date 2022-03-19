import { useCallback, useEffect, useState } from "react";
import { STORE } from "../../context/actions/storeActions";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import StoreRepository from "../../repositories/StoreRepository";
import { useAppContext } from "../contextHook";
import { useMessageFetch } from "../message/messageFetchHook";
import { useMessageUnreceivedCountFetch } from "../message/messageUnreceivedCountFetchHook";
import { STORE_ADMIN_ID, STORE_ID, STORE_TOKEN } from "./storeConstants";


export function useStoreAuthFetch() {

  const { 
    store: { storeDispatch } 
  } = useAppContext();

  const newMessage = useMessageFetch();

  const messageCount = useMessageUnreceivedCountFetch();

  const [done, setDone] = useState(FETCH_STATUSES.LOADING);

  const retry = useCallback(() => setDone(FETCH_STATUSES.LOADING), []);
  
  useEffect(
    ()=> {
      const storeId = window.localStorage.getItem(STORE_ID);
      const storeToken = window.localStorage.getItem(STORE_TOKEN);
      const storeAdminID = window.localStorage.getItem(STORE_ADMIN_ID);

      if (done === FETCH_STATUSES.LOADING && storeId !== null && storeToken !== null && !window.navigator.onLine) {

        setDone(FETCH_STATUSES.ERROR);

      } else if (done === FETCH_STATUSES.LOADING && storeId !== null && storeToken !== null) {
        
        const api = new StoreRepository(storeToken);

        api.get(storeId)
        .then(res=> {
          
          if (res.status === 200) {
            
            storeDispatch({
              type: STORE.AUTHED, 
              payload: { 
                token: storeToken, 
                adminID: storeAdminID,
                store: res.body.data, 
                fetchStatus: FETCH_STATUSES.DONE 
              }
            });

            setDone(FETCH_STATUSES.DONE);

            messageCount(storeToken);

            newMessage(storeToken, res.body.data.user.id);

          } else if (res.status === 401) {
            window.localStorage.removeItem(STORE_ID);
            window.localStorage.removeItem(STORE_TOKEN);
            window.localStorage.removeItem(STORE_ADMIN_ID);
            setDone(FETCH_STATUSES.DONE);
          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          setDone(FETCH_STATUSES.ERROR);
        });

      } else if (done === FETCH_STATUSES.LOADING && (storeId === null || storeToken === null)) {
        setDone(FETCH_STATUSES.DONE);
      }
    },
    [done, storeDispatch, messageCount, newMessage]
  )
  
  return [done, retry];
}
