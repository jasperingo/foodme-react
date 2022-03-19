import { useCallback, useEffect, useState } from "react";
import { ADMIN } from "../../context/actions/adminActions";
import AdminRepository from "../../repositories/AdminRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";
import { useMessageFetch } from "../message/messageFetchHook";
import { useMessageUnreceivedCountFetch } from "../message/messageUnreceivedCountFetchHook";
import { ADMIN_ID, ADMIN_TOKEN } from "./adminConstants";


export function useAdminAuthFetch() {

  const { 
    admin: { adminDispatch } 
  } = useAppContext();

  const newMessage = useMessageFetch();

  const messageCount = useMessageUnreceivedCountFetch();

  const [done, setDone] = useState(FETCH_STATUSES.LOADING);

  const retry = useCallback(() => setDone(FETCH_STATUSES.LOADING), []);
  
  useEffect(
    ()=> {
      const adminId = window.localStorage.getItem(ADMIN_ID);
      const adminToken = window.localStorage.getItem(ADMIN_TOKEN);

      if (done === FETCH_STATUSES.LOADING && adminId !== null && adminToken !== null && !window.navigator.onLine) {

        setDone(FETCH_STATUSES.ERROR);

      } else if (done === FETCH_STATUSES.LOADING && adminId !== null && adminToken !== null) {
        
        const api = new AdminRepository(adminToken);

        api.get(adminId)
        .then(res=> {
          
          if (res.status === 200) {
            
            adminDispatch({
              type: ADMIN.AUTHED, 
              payload: { 
                token: adminToken, 
                admin: res.body.data, 
                fetchStatus: FETCH_STATUSES.DONE 
              }
            });

            setDone(FETCH_STATUSES.DONE);

            messageCount(adminToken);

            newMessage(adminToken, res.body.data.application.id);

          } else if (res.status === 401) {
            window.localStorage.removeItem(ADMIN_ID);
            window.localStorage.removeItem(ADMIN_TOKEN);
            setDone(FETCH_STATUSES.DONE);
          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          setDone(FETCH_STATUSES.ERROR);
        });

      } else if (done === FETCH_STATUSES.LOADING && (adminId === null || adminToken === null)) {
        setDone(FETCH_STATUSES.DONE);
      }
    },
    [done, adminDispatch, messageCount, newMessage]
  )
  
  return [done, retry];
}
