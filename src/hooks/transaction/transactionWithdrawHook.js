import { useEffect, useState } from "react";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import TransactionRepository from "../../repositories/TransactionRepository";

export function useTransactionWithdraw(userToken) {

  const [data, setData] = useState(null);

  const [dialog, setDialog] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  function onSubmit(amount) {

    console.log(amount)
    
    // setFormError(null);
    // setFormSuccess(null);

    // if (amount === '') {
    //   setFormError('_errors.This_field_is_invalid');
    // } else if (!window.navigator.onLine) {
    //   setFormError('_errors.No_netowrk_connection');
    // } else {
    //   setDialog(true);
    setData({ amount: Number(amount) });
    //   setFetchStatus(FETCH_STATUSES.LOADING);
    // }
  }

  useEffect(
    ()=> {
      
      if (fetchStatus === FETCH_STATUSES.LOADING) {

        const api = new TransactionRepository(userToken);

        api.create(data)
        .then(res=> {

          if (res.status === 201) {
            
            setFormSuccess(res.body.message);
            
            

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
    [data, userToken, fetchStatus, dialog]
  );

  return [onSubmit, dialog, formError, formSuccess];
}
