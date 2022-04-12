import { useMemo, useState } from "react";
import { DELIVERY_FIRM } from "../../context/actions/deliveryFirmActions";
import DeliveryFirmRepository from "../../repositories/DeliveryFirmRepository";
import { useAppContext } from "../contextHook";
import { useDeliveryFirmUpdateValidation } from "./deliveryFirmValidationHook";

export function useDeliveryFirmUpdate() {

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

  const [success, setSuccess] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const [nameError, setNameError] = useState('');

  const [emailError, setEmailError] = useState('');

  const [phoneError, setPhoneError] = useState('');

  const validator = useDeliveryFirmUpdateValidation();

  const api = useMemo(function() { return new DeliveryFirmRepository(deliveryFirmToken); }, [deliveryFirmToken]);

  async function onSubmit(name, email, phone_number, validity) {

    if (loading) return;
    
    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
      return;
    }

    setFormError(null);
    setFormSuccess(null);
    
    const [
      error, 
      nameError, 
      emailError, 
      phoneError, 
    ] = validator(validity);
    
    setNameError(nameError);
    setEmailError(emailError);
    setPhoneError(phoneError);
    
    if (error) return;

    setLoading(true);

    try {

      const res = await api.update(deliveryFirm.id, {
        email,
        phone_number,
        name
      });

      if (res.status === 200) {

        setFormSuccess(res.body.message);
        
        deliveryFirmDispatch({
          type: DELIVERY_FIRM.FETCHED, 
          payload: { deliveryFirm: res.body.data }
        });

        setSuccess(true);

      } else if (res.status === 400) {
        
        for (let error of res.body.data) {

          switch(error.name) {

            case 'name':
              setNameError(error.message);
              break;

            case 'email':
              setEmailError(error.message);
              break;

            case 'phone_number':
              setPhoneError(error.message);
              break;

            default:
          }
        }

      } else {
        throw new Error();
      }

    } catch {
      setFormError('_errors.Something_went_wrong');
    } finally {
      setLoading(false);
    }
  }

  return [
    onSubmit,  
    deliveryFirm, 
    loading, 
    success,
    setSuccess,
    formError, 
    formSuccess, 
    nameError, 
    emailError, 
    phoneError
  ];
}
