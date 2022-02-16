import { useCallback, useEffect, useState } from "react";
import { DELIVERY_FIRM } from "../../context/actions/deliveryFirmActions";
import DeliveryFirmRepository from "../../repositories/DeliveryFirmRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";

export function useDeliveryFirmWorkingHoursUpdate() {

  const { 
    deliveryFirm: { 
      deliveryFirmDispatch,
      deliveryFirm: {
        deliveryFirm,
        deliveryFirmToken
      } 
    } 
  } = useAppContext();

  const [data, setData] = useState(null);

  const [dialog, setDialog] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);
  
  
  const update = useCallback(
    () => {
      const api = new DeliveryFirmRepository(deliveryFirmToken);
      
      api.updateWorkingHours(deliveryFirm.id, data)
      .then(res=> {

        if (res.status === 200) {

          setFormSuccess(res.body.message);
          
          deliveryFirmDispatch({
            type: DELIVERY_FIRM.FETCHED, 
            payload: { 
              deliveryFirm: res.body.data, 
              fetchStatus: FETCH_STATUSES.DONE 
            }
          });

        } else if (res.status === 400) {
          
          setFormError('_errors.invalid_working_hours_list');
          
        } else {
          throw new Error();
        }

      })
      .catch(()=> {
        setFetchStatus(FETCH_STATUSES.PENDING);
        setFormError('_errors.Something_went_wrong');
      })
      .finally(()=> {
        setFetchStatus(FETCH_STATUSES.PENDING);
      });
    }, 
    [data, deliveryFirm.id, deliveryFirmToken, deliveryFirmDispatch]
  );

  function onSubmit(workingHours) {
    
    setFormError(null);
    setFormSuccess(null);
    
    if (workingHours.length === 0) {
      setFormError('_errors.Empty_working_hours_list');
    } else if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
    } else if (workingHours.length > 0) {
      setDialog(true);
      setData({ working_hours: workingHours });
      setFetchStatus(FETCH_STATUSES.LOADING);
    }
  }

  useEffect(
    ()=> {
      if (fetchStatus === FETCH_STATUSES.LOADING) {
        update();
      } else if (dialog !== false) {
        setDialog(false);
      }
    }, 
    [fetchStatus, dialog, update]
  );

  return [onSubmit, dialog, formError, formSuccess];
}
