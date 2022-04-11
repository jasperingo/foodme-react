
import React, { useRef } from 'react';
import LoadingDialog from '../dialog/LoadingDialog';
import FormButton from './FormButton';
import FormField from './FormField';
import FormMessage from './FormMessage';
import FormSelect from './FormSelect';

export default function ProductVariantForm(
  {
    productVariant,
    onSubmit, 
    dialog, 
    formError, 
    formSuccess, 
    nameError,
    priceError,
    quantityError,
    weightError,
    availableError
  }
) {

  const nameInput = useRef(null);

  const priceInput = useRef(null);

  const quantityInput = useRef(null);

  const weightInput = useRef(null);

  const availableInput = useRef(null);

  function onFormSubmit(e) {
    e.preventDefault();
    onSubmit(
      nameInput.current.value,
      priceInput.current.value,
      quantityInput.current.value,
      weightInput.current.value,
      availableInput.current.value,

      { 
        nameValidity: nameInput.current.validity, 
        priceValidity: priceInput.current.validity, 
        quantityValidity: quantityInput.current.validity, 
        weightValidity: weightInput.current.validity, 
        availableValidity: availableInput.current.validity
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
        ref={ nameInput }
        error={ nameError }
        ID="name-input" 
        label="_extra.Name" 
        required={true}
        value={productVariant.name}
        />

      <FormField 
        ref={ priceInput }
        error={ priceError }
        ID="price-input" 
        label="_extra.Price" 
        required={true}
        type="number"
        step="0.01"
        min={0}
        value={productVariant.price}
        />

      <FormField 
        ref={ quantityInput }
        error={ quantityError }
        ID="quantity-input" 
        label="_extra.Quantity" 
        required={true}
        type="number"
        min={0}
        value={productVariant.quantity}
        />

      <FormField 
        ref={ weightInput }
        error={ weightError }
        ID="weight-input" 
        label="_extra.Weight" 
        required={true}
        type="number"
        step="0.01"
        min={0}
        value={productVariant.weight}
        />

      <FormSelect  
        ref={ availableInput }
        error={ availableError }
        ID="available-input" 
        label="_extra.Available"
        required={true}
        value={productVariant.available}
        options={[
          { key: true, value: 'Yes' },
          { key: false, value: 'No' }
        ]}
        />

      <FormButton text="_extra.Submit" />

      { dialog && <LoadingDialog /> }

    </form>
  );
}
