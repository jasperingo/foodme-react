
import React, { useRef, useState } from 'react';
import LoadingDialog from '../dialog/LoadingDialog';
import FormButton from './FormButton';
import FormMessage from './FormMessage';
import FormSelect from './FormSelect';

export default function DeliveryRouteForm(
  {
    locations,
    deliveryRoute,
    onSubmit,
    dialog,
    formError,
    formSuccess,
    stateError, 
    cityError,
    doorDeliveryError
  }
) {

  const doorInput = useRef(null);

  const cityInput = useRef(null);

  const stateInput = useRef(null);

  const [state, setState] = useState(deliveryRoute?.state);


  function onFormSubmit(e) {
    e.preventDefault();
    onSubmit(
      stateInput.current.value,
      cityInput.current.value,
      doorInput.current.value,

      stateInput.current.validity,
      cityInput.current.validity,
      doorInput.current.validity
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
        value={ deliveryRoute?.state } 
        required={true}
        options={locations.map(i=> ({ key: i.state, value: i.state}))}
        onChange={(e)=> setState(e.target.value)}
        />

      <FormSelect 
        ref={cityInput}
        error={cityError}
        ID="address-city-input" 
        label="_user.City" 
        value={ deliveryRoute?.city } 
        required={true}
        options={locations.find(i=> i.state === state)?.lgas.map(i=> ({ key: i, value: i}))}
        />

      <FormSelect
        ref={doorInput}
        error={doorDeliveryError}
        ID="address-state-input" 
        label="_delivery.Door_delivery" 
        value={ deliveryRoute?.door_delivery } 
        required={true}
        options={[
          { key: 'true', value: 'Yes' },
          { key: 'false', value: 'No' }
        ]}
        />

      <FormButton text="_extra.Submit" />

      { dialog && <LoadingDialog /> }

    </form>
  );
}
