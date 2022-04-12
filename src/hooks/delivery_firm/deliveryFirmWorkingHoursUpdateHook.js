import { useMemo, useState } from "react";
import { DELIVERY_FIRM } from "../../context/actions/deliveryFirmActions";
import DeliveryFirmRepository from "../../repositories/DeliveryFirmRepository";
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

  const [loading, setLoading] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const api = useMemo(function() { return new DeliveryFirmRepository(deliveryFirmToken); }, [deliveryFirmToken]);

  async function onSubmit(workingHours) {
    
    setFormError(null);
    setFormSuccess(null);
    
    if (workingHours.length === 0) {
      setFormError('_errors.Empty_working_hours_list');
    }

    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
    } 

    setLoading(true);

    try {

      const res = await api.updateWorkingHours(deliveryFirm.id, { working_hours: workingHours });

      if (res.status === 200) {

        setFormSuccess(res.body.message);
        
        deliveryFirmDispatch({
          type: DELIVERY_FIRM.FETCHED, 
          payload: { deliveryFirm: res.body.data }
        });

      } else if (res.status === 400) {
        setFormError('_errors.invalid_working_hours_list');
      } else {
        throw new Error();
      }

    } catch {
      setFormError('_errors.Something_went_wrong');
    } finally {
      setLoading(false);
    }
  }

  return [onSubmit, loading, formError, formSuccess];
}
