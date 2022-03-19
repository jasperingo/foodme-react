import { useEffect, useState } from "react";
import { ADMIN } from "../../context/actions/adminActions";
import AdminRepository from "../../repositories/AdminRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";
import { useMessageFetch } from "../message/messageFetchHook";
import { useMessageUnreceivedCountFetch } from "../message/messageUnreceivedCountFetchHook";
import { useSaveAdminToken } from "./saveAdminTokenHook";


export function useAdminLogin() {

  const { 
    admin: { adminDispatch } 
  } = useAppContext();

  const newMessage = useMessageFetch();

  const messageCount = useMessageUnreceivedCountFetch();

  const saveToken = useSaveAdminToken();

  const [data, setData] = useState(null);

  const [dialog, setDialog] = useState(false);

  const [formError, setFormError] = useState(null);

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  function onSubmit(email, password, emailValidity, passwordValidity) {
    
    if (!emailValidity.valid || !passwordValidity.valid) {
      setFormError('_errors.Credentials_are_incorrect');
    } else if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
    } else {
      setDialog(true);
      setFormError(null);
      setData({
        email: email,
        password: password,
        password_confirmation: password
      });
      setFetchStatus(FETCH_STATUSES.LOADING);
    }
  }
  
  useEffect(
    ()=> {

      if (fetchStatus === FETCH_STATUSES.LOADING) {
        
        const api = new AdminRepository();

        api.auth(data)
        .then(res=> {
          
          if (res.status === 200) {

            saveToken(res.body.data.administrator.id, res.body.data.api_token.token);
            
            adminDispatch({
              type: ADMIN.AUTHED, 
              payload: { 
                admin: res.body.data.administrator, 
                token: res.body.data.api_token.token, 
                fetchStatus: FETCH_STATUSES.DONE 
              }
            });

            messageCount(res.body.data.api_token.token);

            newMessage(res.body.data.api_token.token, res.body.data.administrator.application.id);

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
    [data, fetchStatus, dialog, adminDispatch, saveToken, newMessage, messageCount]
  );

  return [onSubmit, dialog, formError]
}
