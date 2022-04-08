import { useMemo, useState } from "react";
import AddressRepository from "../../repositories/AddressRepository";
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

  const [loading, setLoading] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const [titleError, setTitleError] = useState('');

  const [streetError, setStreetError] = useState('');

  const [cityError, setCityError] = useState('');

  const [stateError, setStateError] = useState('');

  const [defaultError, setDefaultError] = useState('');

  const validator = useAddressValidation();

  const api = useMemo(function() { return new AddressRepository(customerToken); }, [customerToken]);

  async function onSubmit(
    title,
    street,
    state,
    city,
    type,
    titleValidity,
    streetValidity,
    stateValidity,
    cityValidity,
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

    if (error) return;

    setLoading(true);

    try {
      const res = await api.create({
        title,
      street,
      state,
      city,
      type,
      });

      if (res.status === 201) {
        
        setFormSuccess(res.body.message);

      } else if (res.status === 403) {

        setFormError('_errors.Forbidden');
        
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
      
    } catch {
      setFormError('_errors.Something_went_wrong');
    } finally {
      setLoading(false);
    }
  }

  return [onSubmit, loading, formError, formSuccess, titleError, streetError, cityError, stateError, defaultError];
}

