import { useMemo, useState } from "react";
import { DELIVERY_FIRM } from "../../context/actions/deliveryFirmActions";
import DeliveryFirmRepository from "../../repositories/DeliveryFirmRepository";
import { useAppContext } from "../contextHook";
import { useMessageFetch } from "../message/messageFetchHook";
import { useMessageUnreceivedCountFetch } from "../message/messageUnreceivedCountFetchHook";
import { useDeliveryFirmAuthSet } from "./deliveryFirmAuthStorageHook";

export function useDeliveryFirmLogin() {

  const { 
    deliveryFirm: { deliveryFirmDispatch } 
  } = useAppContext();

  const messageCount = useMessageUnreceivedCountFetch();
  
  const newMessage = useMessageFetch();

  const setAuthToken = useDeliveryFirmAuthSet();

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [formError, setFormError] = useState(null);

  const api = useMemo(function() { return new DeliveryFirmRepository(); }, []);

  async function onSubmit(name, email, password, nameValidity, emailValidity, passwordValidity) {
    
    if (loading) return;

    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
      return;
    }

    if (!nameValidity.valid || !emailValidity.valid || !passwordValidity.valid) {
      setFormError('_errors.Credentials_are_incorrect');
      return;
    }

    setLoading(true);

    setFormError(null);

    try {

      const res = await api.auth({
        name,
        administrator_email: email,
        administrator_password: password
      });
          
      if (res.status === 200) {

        setAuthToken(
          res.body.data.delivery_firm.id, 
          res.body.data.api_token.token,
          res.body.data.delivery_firm.administrators[0].id
        );
        
        deliveryFirmDispatch({
          type: DELIVERY_FIRM.AUTHED, 
          payload: { 
            token: res.body.data.api_token.token, 
            deliveryFirm: res.body.data.delivery_firm, 
            adminID: res.body.data.delivery_firm.administrators[0].id
          }
        });

        messageCount(res.body.data.api_token.token);

        newMessage(res.body.data.api_token.token, res.body.data.delivery_firm.user.id);

        setSuccess(true);

      } else if (res.status === 401 || res.status === 403) {
        setFormError(res.body.message);
      } else {
        throw new Error();
      }

    } catch {
      setFormError('_errors.Something_went_wrong');
    } finally {
      setLoading(false);
    }
  }

  return [onSubmit, loading, success, formError];
}
