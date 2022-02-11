
import { useEffect, useState } from "react";
import DiscountRepository from "../../repositories/DiscountRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";

export function useDiscountCreate() {

  const { 
    store: { 
      store: {
        storeToken
      }
    }
  } = useAppContext();

  const [id, setId] = useState(0);

  const [data, setData] = useState(null);

  const [dialog, setDialog] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const [titleError, setTitleError] = useState('');

  const [typeError, setTypeError] = useState('');

  const [valueError, setValueError] = useState('');

  const [minQtyError, setMinQtyError] = useState('');

  const [minAmountError, setMinAmountError] = useState('');

  const [startDateError, setStartDateError] = useState('');

  const [endDateError, setEndDateError] = useState('');

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  function onSubmit(
    title,
    type,
    value,
    minimium_required_amount,
    minimium_required_quantity,
    start_date,
    end_date,
    titleValidity,
    typeValidity,
    valueValidity,
    minAmountValidity,
    minQtyValidity,
    startDateValidity,
    endDateValidity,
  ) {
    
    setFormError(null);
    setFormSuccess(null);
    
    let error = false;

    setFormError('');

    setFormSuccess('');
    
    if (!titleValidity.valid) {
      error = true;
      setTitleError('_errors.This_field_is_required');
    } else {
      setTitleError('');
    }

    if (!typeValidity.valid) {
      error = true;
      setTypeError('_errors.This_field_is_required');
    } else {
      setTypeError('');
    }
    
    if (!valueValidity.valid) {
      error = true;
      setValueError('_errors.This_field_is_required');
    } else {
      setValueError('');
    }

    if (!minQtyValidity.valid) {
      error = true;
      setMinQtyError('_errors.This_field_is_required');
    } else {
      setMinQtyError('');
    }

    if (!minAmountValidity.valid) {
      error = true;
      setMinAmountError('_errors.This_field_is_required');
    } else {
      setMinAmountError('');
    }

    if (!startDateValidity.valid) {
      error = true;
      setStartDateError('_errors.This_field_is_required');
    } else {
      setStartDateError('');
    }

    if (!endDateValidity.valid) {
      error = true;
      setEndDateError('_errors.This_field_is_required');
    } else {
      setEndDateError('');
    }

    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
    } else if (!error) {
      setDialog(true);
      setData({ 
        title, 
        type,
        value,
        start_date,
        end_date,
        minimium_required_amount: minimium_required_amount === '' ? undefined : minimium_required_amount,
        minimium_required_quantity: minimium_required_quantity === '' ? undefined : minimium_required_quantity
      });
      setFetchStatus(FETCH_STATUSES.LOADING);
    }
  }
  
  useEffect(
    ()=> {
     
      if (fetchStatus === FETCH_STATUSES.LOADING) {
        
        const api = new DiscountRepository(storeToken);

        api.create(data)
        .then(res=> {

          if (res.status === 201) {
            
            setFormSuccess(res.body.message);
            
            setId(res.body.data.id);

            setFetchStatus(FETCH_STATUSES.PENDING);
            
          } else if (res.status === 400) {

            setFetchStatus(FETCH_STATUSES.PENDING);
            
            for (let error of res.body.data) {

              switch(error.name) {

                case 'title':
                  setTitleError(error.message);
                  break;

                case 'type':
                  setTypeError(error.message);
                  break;

                case 'value':
                  setValueError(error.message);
                  break;

                case 'start_date':
                  setStartDateError(error.message);
                  break;

                case 'end_date':
                  setEndDateError(error.message);
                  break;

                case 'minimium_required_amount':
                  setMinAmountError(error.message);
                  break;
                
                case 'minimium_required_quantity':
                  setMinQtyError(error.message);
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
        });

      } else if (dialog !== false) {
        setDialog(false);
      }
    }, 
    [fetchStatus, dialog, storeToken, data]
  );

  return [
    onSubmit, 
    id, 
    dialog, 
    formError, 
    formSuccess, 
    titleError, 
    typeError, 
    valueError,
    minQtyError, 
    minAmountError, 
    startDateError, 
    endDateError,
  ];
}
