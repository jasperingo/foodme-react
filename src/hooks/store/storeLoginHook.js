import { useEffect, useState } from "react";
import { STORE } from "../../context/actions/storeActions";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import StoreRepository from "../../repositories/StoreRepository";
import { useAppContext } from "../contextHook";
import { useMessageFetch } from "../message/messageFetchHook";
import { useMessageUnreceivedCountFetch } from "../message/messageUnreceivedCountFetchHook";
import { useSaveStoreToken } from "./saveStoreTokenHook";


export function useStoreLogin() {

  const { 
    store: { storeDispatch } 
  } = useAppContext();
  
  const newMessage = useMessageFetch();

  const messageCount = useMessageUnreceivedCountFetch();

  const saveToken = useSaveStoreToken();

  const [data, setData] = useState(null);

  const [dialog, setDialog] = useState(false);

  const [formError, setFormError] = useState(null);

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  function onSubmit(name, email, password, nameValidity, emailValidity, passwordValidity) {
    
    if (!nameValidity.valid || !emailValidity.valid || !passwordValidity.valid) {
      setFormError('_errors.Credentials_are_incorrect');
    } else if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
    } else {
      setDialog(true);
      setFormError(null);
      setData({
        name,
        administrator_email: email,
        administrator_password: password
      });
      setFetchStatus(FETCH_STATUSES.LOADING);
    }
  }
  
  useEffect(
    ()=> {

      if (fetchStatus === FETCH_STATUSES.LOADING) {
        
        const api = new StoreRepository();

        api.auth(data)
        .then(res=> {
          
          if (res.status === 200) {

            saveToken(
              res.body.data.store.id, 
              res.body.data.api_token.token,
              res.body.data.store.administrators[0].id
            );
            
            storeDispatch({
              type: STORE.AUTHED, 
              payload: { 
                store: res.body.data.store, 
                token: res.body.data.api_token.token, 
                adminID: res.body.data.store.administrators[0].id,
                fetchStatus: FETCH_STATUSES.DONE 
              }
            });

            messageCount(res.body.data.api_token.token);

            newMessage(res.body.data.api_token.token, res.body.data.store.user.id);

          } else if (res.status === 401) {
            setFormError('_errors.Credentials_are_incorrect');
          } else {
            throw new Error();
          }

        })
        .catch(()=> {
          setFormError('_error.Something_went_wrong');
        })
        .finally(()=> {
          setFetchStatus(FETCH_STATUSES.PENDING);
        });

      } else if (dialog !== false) {
        setDialog(false);
      }

    }, 
    [data, fetchStatus, dialog, storeDispatch, saveToken, newMessage, messageCount]
  );

  return [onSubmit, dialog, formError];
}

