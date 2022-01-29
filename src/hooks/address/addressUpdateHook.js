import { useEffect, useState } from "react";
import { ADDRESS } from "../../context/actions/addressActions";
import AddressRepository from "../../repositories/AddressRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";
import { useAddressValidation } from "./addressValidationHook";


export function useAddressUpdate() {

  const {
    customer: {
      customer: {
        customer: {
          customerToken
        }
      } 
    },
    address: { 
      addressDispatch,
      address: {
        address
      } 
    },
  } = useAppContext();


  const [data, setData] = useState(null);

  const [dialog, setDialog] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const [titleError, setTitleError] = useState('');

  const [streetError, setStreetError] = useState('');

  const [cityError, setCityError] = useState('');

  const [stateError, setStateError] = useState('');

  const [defaultError, setDefaultError] = useState('');

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  const validator = useAddressValidation();

  function onSubmit(
    title,
    street,
    state,
    city,
    type,
    titleValidity,
    streetValidity,
    stateValidity,
    cityValidity,
    typeValidity,
  ) {
    
    setFormError(null);
    setFormSuccess(null);
    
    const [
      error, 
      titleError, 
      streetError, 
      stateError, 
      cityError, 
      typeError
    ] = validator(titleValidity, streetValidity, stateValidity, cityValidity, typeValidity);
    
    setTitleError(titleError);
    setStreetError(streetError);
    setCityError(stateError);
    setStateError(cityError);
    setDefaultError(typeError);

    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
    } else if (!error) {
      setDialog(true);
      setData({ title, street, city, state, type });
      setFetchStatus(FETCH_STATUSES.LOADING);
    }
  }

  useEffect(
    ()=> {
      
      if (fetchStatus === FETCH_STATUSES.LOADING) {

        const api = new AddressRepository(customerToken);

        api.update(address.id, data)
        .then(res=> {

          if (res.status === 200) {
            
            setFormSuccess(res.body.message);
            
            addressDispatch({
              type: ADDRESS.FETCHED, 
              payload: {
                address: res.body.data, 
                fetchStatus: FETCH_STATUSES.DONE 
              }
            });

          } else if (res.status === 400) {
            
            for (let error of res.body.data) {

              switch(error.name) {

                case 'title':
                  setTitleError(error.message);
                  break;

                case 'street':
                  setStreetError(error.message);
                  break;

                case 'city':
                  setCityError(error.message);
                    break;

                case 'state':
                  setStateError(error.message);
                  break;

                case 'type':
                  setDefaultError(error.message);
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
    [data, address, customerToken, fetchStatus, dialog, addressDispatch]
  );

  return [onSubmit, dialog, formError, formSuccess, titleError, streetError, cityError, stateError, defaultError];
}

