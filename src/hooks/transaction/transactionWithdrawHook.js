import { useMemo, useState } from "react";
import { TRANSACTION } from "../../context/actions/transactionActions";
import TransactionRepository from "../../repositories/TransactionRepository";
import { useAppContext } from "../contextHook";

export function useTransactionWithdraw(userToken, { store, deliveryFirm }) {

  const { 
    store: { 
      storeDispatch
    },
    deliveryFirm: { 
      deliveryFirmDispatch
    }
  } = useAppContext();

  const [loading, setLoading] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const api = useMemo(function() { return new TransactionRepository(userToken); }, [userToken]);

  async function onSubmit(amount, amountValidity) {
    
    if (loading) return;
    
    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
      return;
    }

    setFormError(null);
    setFormSuccess(null);

    if (!amountValidity.valid) {
      if (amountValidity.rangeUnderflow) {
        setFormError('_errors._Minimium_withdrawal');
      } else if (amountValidity.rangeOverflow) {
        setFormError('_errors._Maximium_withdrawal');
      } else {
        setFormError('_errors.This_field_is_required');
      }

      return;
    }

    setLoading(true);

    try {

      const res = await api.withdraw({ amount: Number(amount) });

      if (res.status === 201) {
        
        setFormSuccess(res.body.message);
        
        if (store) {
          storeDispatch({
            type: TRANSACTION.BALANCE_WITHDRAWN, 
            payload: { amount: Number(amount) }
          });
        } else if (deliveryFirm) {
          deliveryFirmDispatch({
            type: TRANSACTION.BALANCE_WITHDRAWN,
            payload: { amount: Number(amount) }
          });
        }

      } else if (res.status === 400) {

        setFormError(res.body.data[0].message);

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
