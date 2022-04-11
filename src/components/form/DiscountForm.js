
import React, { useRef, useState } from 'react';
import { useISODateString } from '../../hooks/viewHook';
import Discount from '../../models/Discount';
import LoadingDialog from '../dialog/LoadingDialog';
import FormButton from './FormButton';
import FormField from './FormField';
import FormMessage from './FormMessage';
import FormSelect from './FormSelect';

export default function DiscountForm(
  {
    discount,
    onSubmit, 
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
  }
) {

  const titleInput = useRef(null);

  const typeInput = useRef(null);

  const valueInput = useRef(null);
  
  const minQtyInput = useRef(null);

  const minAmountInput = useRef(null);
  
  const startDateInput = useRef(null);

  const endDateInput = useRef(null);

  const [type, setType] = useState(discount.type);

  const isoDate = useISODateString();

  function onFormSubmit(e) {
    e.preventDefault();
    onSubmit(
      titleInput.current.value,
      typeInput.current.value,
      valueInput.current.value,
      minAmountInput.current.value,
      minQtyInput.current.value,
      startDateInput.current.value,
      endDateInput.current.value,

      {
        titleValidity: titleInput.current.validity,
        typeValidity: typeInput.current.validity,
        valueValidity: valueInput.current.validity,
        minAmountValidity: minAmountInput.current.validity,
        minQtyValidity: minQtyInput.current.validity,
        startDateValidity: startDateInput.current.validity,
        endDateValidity: endDateInput.current.validity,
      }
    );
  }

  return (
    <form method="POST" action="" onSubmit={onFormSubmit} className="form-1-x" noValidate>

      <FormMessage 
        error={formError} 
        success={formSuccess} 
        /> 
      
      <FormField 
        ref={ titleInput }
        error={ titleError }
        ID="title-input" 
        label="_extra.Title" 
        required={true}
        value={discount.title}
        />

      <FormSelect  
        ref={ typeInput }
        error={ typeError }
        ID="type-input" 
        label="_extra.Type"
        required={true}
        value={discount.type}
        options={Discount.getTypes().map(i=> ({ key: i, value: i }))}
        onChange={(e)=> setType(e.target.value)}
        />

      <FormField 
        ref={ valueInput }
        error={ valueError }
        ID="value-input" 
        label="_extra.Value" 
        required={true}
        value={discount.value}
        type="number"
        min={0}
        max={type === Discount.TYPE_PERCENTAGE ? 100 : ''}
        step={type === Discount.TYPE_AMOUNT ? '0.01' : ''}
        />

      <FormField 
        ref={ minQtyInput }
        error={ minQtyError }
        ID="min-qty-input" 
        label="_discount.Minimium_required_quantity" 
        value={discount.minimium_required_quantity}
        type="number"
        min={0}
        />

      <FormField 
        ref={ minAmountInput }
        error={ minAmountError }
        ID="min-qty-input" 
        label="_discount.Minimium_required_amount" 
        value={discount.minimium_required_amount}
        type="number"
        step="0.01"
        min={0}
        />

      <FormField 
        ref={ startDateInput }
        error={ startDateError }
        ID="start-date-input" 
        label="_discount.Start_date" 
        required={true}
        value={isoDate(discount.start_date)}
        type="datetime-local"
        min={isoDate(discount.start_date ?? Date.now())}
        />

      <FormField 
        ref={ endDateInput }
        error={ endDateError }
        ID="end-date-input" 
        label="_discount.End_date" 
        required={true}
        value={isoDate(discount.end_date)}
        type="datetime-local"
        min={isoDate(discount.start_date ?? Date.now())}
        />

      <FormButton text="_extra.Submit" />

      { dialog && <LoadingDialog /> }

    </form>
  );
}
