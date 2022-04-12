import { useMemo, useState } from "react";
import { ADMIN } from "../../context/actions/adminActions";
import AdminRepository from "../../repositories/AdminRepository";
import { useAppContext } from "../contextHook";
import { useMessageFetch } from "../message/messageFetchHook";
import { useMessageUnreceivedCountFetch } from "../message/messageUnreceivedCountFetchHook";
import { useAdminAuthSet } from "./adminAuthStorageHook";

export function useAdminLogin() {

  const { 
    admin: { adminDispatch } 
  } = useAppContext();

  const newMessage = useMessageFetch();

  const messageCount = useMessageUnreceivedCountFetch();

  const setAuthToken = useAdminAuthSet();

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [formError, setFormError] = useState(null);

  const api = useMemo(function() { return new AdminRepository(); }, []);

  async function onSubmit(email, password, emailValidity, passwordValidity) {
    
    if (loading) return;

    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
      return;
    }

    if (!emailValidity.valid || !passwordValidity.valid) {
      setFormError('_errors.Credentials_are_incorrect');
      return;
    }

    setLoading(true);
    
    setFormError(null);

    try {
      const res = await api.auth({
        email: email,
        password: password,
        password_confirmation: password
      });

      if (res.status === 200) {

        setAuthToken(res.body.data.administrator.id, res.body.data.api_token.token);
        
        adminDispatch({
          type: ADMIN.AUTHED, 
          payload: { 
            admin: res.body.data.administrator, 
            token: res.body.data.api_token.token
          }
        });

        messageCount(res.body.data.api_token.token);

        newMessage(res.body.data.api_token.token, res.body.data.administrator.application.id);

        setSuccess(true);
        
      } else if (res.status === 401) {
        setFormError('_errors.Credentials_are_incorrect');
      } else {
        throw new Error();
      }

    } catch (error) {
      setFormError('_error.Something_went_wrong');
    } finally {
      setLoading(false);
    }
  }
  
  return [onSubmit, loading, success, formError]
}
