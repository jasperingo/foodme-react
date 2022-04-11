
import { useMemo, useState } from "react";
import { DISCOUNT } from "../../context/actions/discountActions";
import DiscountRepository from "../../repositories/DiscountRepository";
import { useAppContext } from "../contextHook";
import { useDiscountValidation } from "./discountValidationHook";

export function useDiscountUpdate() {

  const { 
    store: { 
      store: {
        storeToken
      }
    },
    discount: {
      discountDispatch,
      discount: {
        discount
      } 
    }
  } = useAppContext();

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

      const res = await api.update(discount.id, form)

      if (res.status === 200) {
        
        setFormSuccess(res.body.message);

        discountDispatch({
          type: DISCOUNT.FETCHED, 
          payload: {
            id: String(discount.id),
            discount: res.body.data 
          }
        });
        
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
