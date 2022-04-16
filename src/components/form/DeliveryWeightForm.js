
import React, { useRef } from 'react';
import LoadingDialog from '../dialog/LoadingDialog';
import FormButton from './FormButton';
import FormField from './FormField';
import FormMessage from './FormMessage';

export default function DeliveryWeightForm(
  {
    weight,
    onSubmit, 
    loading, 
    formError, 
    formSuccess, 
    minError, 
    maxError, 
    feeError
  }
) {

  const minInput = useRef(null);

  const maxInput = useRef(null);

  const feeInput = useRef(null);

  function onFormSubmit(e) {
    e.preventDefault();
    onSubmit(
      Number(minInput.current.value),
      Number(maxInput.current.value),
      feeInput.current.value,

      {
        minValidity: minInput.current.validity,
        maxValidity: maxInput.current.validity,
        feeValidity: feeInput.current.validity
      }
    );
  }

  return (
    <form method="POST" action="" className="form-1-x" onSubmit={onFormSubmit} noValidate>

      <FormMessage 
        error={formError} 
        success={formSuccess} 
        />

      <FormField
        ref={minInput}
        error={minError}
        ID="minimium-input" 
        label="_extra.Minimium" 
        value={ weight.minimium } 
        required={true}
        type="number"
        />

      <FormField
        ref={maxInput}
        error={maxError}
        ID="maximium-input" 
        label="_extra.Maximium" 
        value={ weight.maximium } 
        required={true}
        type="number"
        />

      <FormField
        ref={feeInput}
        error={feeError}
        ID="fee-input" 
        label="_extra.Fee" 
        value={ weight.fee } 
        required={true}
        type="number"
        step="0.01"
        min={0}
        />

      <FormButton text="_extra.Submit" />

      { loading && <LoadingDialog /> }

    </form>
  );
}
