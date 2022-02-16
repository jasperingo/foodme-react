import { useEffect, useState } from "react";
import { DELIVERY_FIRM } from "../../context/actions/deliveryFirmActions";
import DeliveryFirmRepository from "../../repositories/DeliveryFirmRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";
import { useSaveDeliveryFirmToken } from "./saveDeliveryFirmTokenHook";


export function useDeliveryFirmLogin() {

  const { 
    deliveryFirm: { deliveryFirmDispatch } 
  } = useAppContext();

  const saveToken = useSaveDeliveryFirmToken();

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
        
        const api = new DeliveryFirmRepository();

        api.auth(data)
        .then(res=> {
          
          if (res.status === 200) {

            saveToken(
              res.body.data.delivery_firm.id, 
              res.body.data.api_token.token,
              res.body.data.delivery_firm.administrators[0].id
            );
            
            deliveryFirmDispatch({
              type: DELIVERY_FIRM.AUTHED, 
              payload: { 
                deliveryFirm: res.body.data.delivery_firm, 
                token: res.body.data.api_token.token, 
                adminID: res.body.data.delivery_firm.administrators[0].id,
                fetchStatus: FETCH_STATUSES.DONE 
              }
            });

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
    [data, fetchStatus, dialog, deliveryFirmDispatch, saveToken]
  );

  return [onSubmit, dialog, formError];
}

