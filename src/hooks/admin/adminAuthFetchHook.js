import { useCallback, useMemo, useState } from "react";
import { ADMIN } from "../../context/actions/adminActions";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import AdminRepository from "../../repositories/AdminRepository";
import { useAppContext } from "../contextHook";
import { useMessageFetch } from "../message/messageFetchHook";
import { useMessageUnreceivedCountFetch } from "../message/messageUnreceivedCountFetchHook";
import { useAdminAuthGet, useAdminAuthUnset } from "./adminAuthStorageHook";

export function useAdminAuthFetch() {

  const { 
    admin: { adminDispatch } 
  } = useAppContext();

  const newMessage = useMessageFetch();

  const messageCount = useMessageUnreceivedCountFetch();

  const [adminId, adminToken] = useAdminAuthGet();

  const unsetAuth = useAdminAuthUnset();

  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);

  const api = useMemo(function() { return new AdminRepository(adminToken); }, [adminToken]);
  
  const fetchAdmin = useCallback(
    async function() {

      if (loading) return;

      if (!window.navigator.onLine) {
        setError(NetworkErrorCodes.NO_NETWORK_CONNECTION);
        return;
      }

      setLoading(true);

      try {
        
        const res = await api.get(adminId);

        if (res.status === 200) {
            
          adminDispatch({
            type: ADMIN.AUTHED, 
            payload: { 
              token: adminToken, 
              admin: res.body.data
            }
          });

          messageCount(adminToken);

          newMessage(adminToken, res.body.data.application.id);

        } else if (res.status === 401) {
          unsetAuth();
        } else {
          throw new Error();
        }
        
      } catch {
        setError(NetworkErrorCodes.UNKNOWN_ERROR);
      } finally {
        setLoading(false);
      }
    },
    [api, loading, adminId, adminToken, adminDispatch, unsetAuth, messageCount, newMessage]
  );
  
  return [adminId, fetchAdmin, error];
}
