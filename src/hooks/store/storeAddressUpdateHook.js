import { useEffect, useState } from "react";
import { STORE } from "../../context/actions/storeActions";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import StoreRepository from "../../repositories/StoreRepository";
import { useAppContext } from "../contextHook";
import { useAddressValidation } from "../address/addressValidationHook";


export function useStoreAddressUpdate() {

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

  const [streetError, setStreetError] = useState('');

  const [cityError, setCityError] = useState('');

  const [stateError, setStateError] = useState('');

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  const validator = useAddressValidation();

  function onSubmit(
    street,
    state,
    city,
    streetValidity,
    stateValidity,
    cityValidity,
  ) {
    
    setFormError(null);
    setFormSuccess(null);
    
    const [
      error, 
      , 
      streetError, 
      stateError, 
      cityError, 
      ,
    ] = validator({ valid: true }, streetValidity, stateValidity, cityValidity, { valid: true});
    
    setStreetError(streetError);
    setCityError(stateError);
    setStateError(cityError);

    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
    } else if (!error) {
      setDialog(true);
      setData({ street, city, state });
      setFetchStatus(FETCH_STATUSES.LOADING);
    }
  }

  useEffect(
    ()=> {
      
      if (fetchStatus === FETCH_STATUSES.LOADING) {

        const api = new StoreRepository(storeToken);

        api.updateAddress(store.id, data)
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

                case 'street':
                  setStreetError(error.message);
                  break;

                case 'city':
                  setCityError(error.message);
                    break;

                case 'state':
                  setStateError(error.message);
                  break;

                default:
              }
            }

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
    [data, store.id, storeToken, fetchStatus, dialog, storeDispatch]
  );

  return [onSubmit, dialog, formError, formSuccess, streetError, cityError, stateError];
}

