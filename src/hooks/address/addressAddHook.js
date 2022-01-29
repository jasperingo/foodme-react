import { useEffect, useState } from "react";
import AddressRepository from "../../repositories/AddressRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";
import { useAddressValidation } from "./addressValidationHook";


export function useAddressAdd() {

  const {
    customer: {
      customer: {
        customer: {
          customerToken
        }
      } 
    } 
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

        api.create(data)
        .then(res=> {

          if (res.status === 201) {
            
            setFormSuccess(res.body.message);
            
            // addressesDispatch({
            //   type: ADDRESS.FETCHED,
            //   payload: res.data
            // });

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
    [data, customerToken, fetchStatus, dialog]
  );

  return [onSubmit, dialog, formError, formSuccess, titleError, streetError, cityError, stateError, defaultError];
}

