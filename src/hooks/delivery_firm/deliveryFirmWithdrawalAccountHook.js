import { useMemo, useState } from "react";
import { DELIVERY_FIRM } from "../../context/actions/deliveryFirmActions";
import DeliveryFirmRepository from "../../repositories/DeliveryFirmRepository";
import { useWithdrawalAccountValidation } from "../bankHook";
import { useAppContext } from "../contextHook";

export function useDeliveryFirmWithdrawalAccountUpdate() {

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

  const [bankCodeError, setBankCodeError] = useState('');

  const [nameError, setNameError] = useState('');

  const [numberError, setNumberError] = useState('');

  const [typeError, setTypeError] = useState('');

  const validator = useWithdrawalAccountValidation();

  const api = useMemo(function() { return new DeliveryFirmRepository(deliveryFirmToken); }, [deliveryFirmToken]);
  
  async function onSubmit(
    bankCode, 
    accountName, 
    accountNumber, 
    accountType,
    codeValidity, 
    nameValidity, 
    numberValidity, 
    typeValidity
  ) {

    if (loading) return;
    
    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
      return;
    }

    setFormError(null);
    setFormSuccess(null);
    
    const [
      error, 
      codeError, 
      nameError, 
      numberError, 
      typeError
    ] = validator(codeValidity, nameValidity, numberValidity, typeValidity);

    setBankCodeError(codeError);
    setNameError(nameError);
    setNumberError(numberError);
    setTypeError(typeError);
    
    if (error) return;

    setLoading(true);

    try {

      const res = await api.updateWithdrawalAccount(deliveryFirm.id, {
        bank_code: bankCode, 
        account_name: accountName, 
        account_number: accountNumber, 
        account_type: accountType,
      });
     
      if (res.status === 200) {

        setFormSuccess(res.body.message);
        
        deliveryFirmDispatch({
          type: DELIVERY_FIRM.FETCHED, 
          payload: { deliveryFirm: res.body.data }
        });

      } else if (res.status === 400) {
        
        for (let error of res.body.data) {

          switch(error.name) {

            case 'bank_code':
              setBankCodeError(error.message);
              break;

            case 'account_name':
              setNameError(error.message);
              break;

            case 'account_number':
              setNumberError(error.message);
              break;

            case 'account_type':
              setTypeError(error.message);
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

  return [onSubmit, loading, formError, formSuccess, bankCodeError, nameError, numberError, typeError];
}
