import { useCallback, useEffect, useState } from "react";
import { STORE } from "../../context/actions/storeActions";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import StoreRepository from "../../repositories/StoreRepository";
import { useWithdrawalAccountValidation } from "../bankHook";
import { useAppContext } from "../contextHook";

export function useStoreWithdrawalAccountUpdate() {

  const { 
    store: { 
      storeDispatch,
      store: {
        store,
        storeToken
      } 
    } 
  } = useAppContext();

  const [data, setData] = useState(null);

  const [dialog, setDialog] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const [bankCodeError, setBankCodeError] = useState('');

  const [nameError, setNameError] = useState('');

  const [numberError, setNumberError] = useState('');

  const [typeError, setTypeError] = useState('');

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  const validator = useWithdrawalAccountValidation();
  
  
  const update = useCallback(
    () => {
      const api = new StoreRepository(storeToken);
      
      api.updateWithdrawalAccount(store.id, data)
      .then(res=> {

        if (res.status === 200) {

          setFormSuccess(res.body.message);
          
          storeDispatch({
            type: STORE.FETCHED, 
            payload: { 
              store: res.body.data, 
              fetchStatus: FETCH_STATUSES.DONE 
            }
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

      })
      .catch(()=> {
        setFetchStatus(FETCH_STATUSES.PENDING);
        setFormError('_errors.Something_went_wrong');
      })
      .finally(()=> {
        setFetchStatus(FETCH_STATUSES.PENDING);
      });
    }, 
    [data, store.id, storeToken, storeDispatch]
  );

  function onSubmit(
    bankCode, 
    accountName, 
    accountNumber, 
    accountType,
    codeValidity, 
    nameValidity, 
    numberValidity, 
    typeValidity
  ) {

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
    
    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
    } else if (!error) {
      setDialog(true);
      setData({
        bank_code: bankCode, 
        account_name: accountName, 
        account_number: accountNumber, 
        account_type: accountType,
      });
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

  return [onSubmit, dialog, formError, formSuccess, bankCodeError, nameError, numberError, typeError];
}

