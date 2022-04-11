
import { useMemo, useState } from "react";
import DiscountRepository from "../../repositories/DiscountRepository";
import { useAppContext } from "../contextHook";
import { useDiscountValidation } from "./discountValidationHook";

export function useDiscountCreate() {

  const { 
    store: { 
      store: {
        storeToken
      }
    }
  } = useAppContext();

  const [id, setId] = useState(0);

  const [loading, setLoading] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const [titleError, setTitleError] = useState('');

  const [typeError, setTypeError] = useState('');

  const [valueError, setValueError] = useState('');

  const [minQtyError, setMinQtyError] = useState('');

  const [minAmountError, setMinAmountError] = useState('');

  const [startDateError, setStartDateError] = useState('');

  const [endDateError, setEndDateError] = useState('');

  const validator = useDiscountValidation();

  const api = useMemo(function() { return new DiscountRepository(storeToken); }, [storeToken]);

  async function onSubmit(
    title,
    type,
    value,
    minimium_required_amount,
    minimium_required_quantity,
    start_date,
    end_date,
    validity
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
      typeError,
      valueError, 
      minAmountError, 
      minQtyError, 
      startDateError, 
      endDateError
    ] = validator(validity)
    
    setTitleError(titleError);
    setTypeError(typeError);
    setValueError(valueError);
    setMinQtyError(minAmountError);
    setMinAmountError(minQtyError);
    setStartDateError(startDateError);
    setEndDateError(endDateError);

    if (error) return;

    setLoading(true);

    const form = { 
      title, 
      type,
      value,
      start_date,
      end_date
    };

    if (minimium_required_amount) form.minimium_required_amount = minimium_required_amount;
    if (minimium_required_quantity) form.minimium_required_quantity = minimium_required_quantity;
    
    try {

      const res = await api.create(form);

      if (res.status === 201) {
        
        setFormSuccess(res.body.message);
        
        setId(res.body.data.id);
        
      } else if (res.status === 400) {
        
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
      
    } catch {
      setFormError('_errors.Something_went_wrong');
    } finally {
      setLoading(false);
    }
  }
  
  return [
    onSubmit, 
    id, 
    loading, 
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
