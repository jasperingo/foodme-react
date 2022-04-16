
import React, { useRef, useState } from 'react';
import LoadingDialog from '../dialog/LoadingDialog';
import FormButton from './FormButton';
import FormMessage from './FormMessage';
import FormSelect from './FormSelect';

export default function DeliveryLocationForm(
  {
    locations,
    deliveryLocation,
    onSubmit,
    loading,
    formError,
    formSuccess,
    cityError,
    stateError,
  }
) {

  const cityInput = useRef(null);

  const stateInput = useRef(null);

  const [state, setState] = useState(deliveryLocation?.state);

  function onFormSubmit(e) {
    e.preventDefault();
    onSubmit(
      stateInput.current.value,
      cityInput.current.value,

      { 
        stateValidity: stateInput.current.validity,
        cityValidity: cityInput.current.validity
      }
    );
  }

  return (
    <form method="POST" action="" className="form-1-x" onSubmit={onFormSubmit} noValidate>

      <FormMessage 
        error={formError} 
        success={formSuccess} 
        />

      <FormSelect
        ref={stateInput}
        error={stateError}
        ID="address-state-input" 
        label="_user.State" 
        value={ deliveryLocation?.state } 
        required={true}
        options={locations.map(i=> ({ key: i.state, value: i.state}))}
        onChange={(e)=> setState(e.target.value)}
        />

      <FormSelect 
        ref={cityInput}
        error={cityError}
        ID="address-city-input" 
        label="_user.City" 
        value={ deliveryLocation?.city } 
        required={true}
        options={locations.find(i=> i.state === state)?.lgas.map(i=> ({ key: i, value: i}))}
        />

      <FormButton text="_extra.Submit" />

      { loading && <LoadingDialog /> }

    </form>
  );
}
