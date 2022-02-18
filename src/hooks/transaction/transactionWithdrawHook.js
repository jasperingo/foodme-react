import { useEffect, useState } from "react";
import { TRANSACTION } from "../../context/actions/transactionActions";
import { FETCH_STATUSES } from "../../repositories/Fetch";
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

  const [data, setData] = useState(null);

  const [dialog, setDialog] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  function onSubmit(amount, amountValidity) {
    
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
    } else {
      setDialog(true);
      setData({ amount: Number(amount) });
      setFetchStatus(FETCH_STATUSES.LOADING);
    }
  }

  useEffect(
    ()=> {
      
      if (fetchStatus === FETCH_STATUSES.LOADING) {

        const api = new TransactionRepository(userToken);

        api.withdraw(data)
        .then(res=> {

          if (res.status === 201) {
            
            setFormSuccess(res.body.message);
            
            if (store) {
              storeDispatch({
                type: TRANSACTION.BALANCE_WITHDRAWN, 
                payload: data.amount
              });
            } else if (deliveryFirm) {
              deliveryFirmDispatch({
                type: TRANSACTION.BALANCE_WITHDRAWN,
                payload: data.amount
              });
            }

          } else if (res.status === 400) {

            setFormError(res.body.data[0].message);

          } else {
            throw new Error();
          }
          
        })
        .catch(()=> {
          setFormError('_errors.Something_went_wrong');
        })
        .finally(()=> {
          setFetchStatus(FETCH_STATUSES.PENDING);
        });

      } else if (dialog !== false) {
        setDialog(false);
      }

    }, 
    [data, store, deliveryFirm, userToken, fetchStatus, dialog, storeDispatch, deliveryFirmDispatch]
  );

  return [onSubmit, dialog, formError, formSuccess];
}
