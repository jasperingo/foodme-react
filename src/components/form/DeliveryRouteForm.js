
import React, { useRef } from 'react';
import LoadingDialog from '../dialog/LoadingDialog';
import FormButton from './FormButton';
import FormField from './FormField';
import FormMessage from './FormMessage';
import FormSelect from './FormSelect';

export default function DeliveryRouteForm(
  {
    deliveryRoute,
    onSubmit,
    loading,
    formError,
    formSuccess,
    nameError,
    doorDeliveryError
  }
) {

  const doorInput = useRef(null);

  const nameInput = useRef(null);

  
  function onFormSubmit(e) {
    e.preventDefault();
    onSubmit(
      nameInput.current.value,
      doorInput.current.value,

      { 
        nameValidity: nameInput.current.validity,
        doorDeliveryValidity: doorInput.current.validity 
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
        ref={nameInput}
        error={nameError}
        ID="route-name-input" 
        label="_extra.Name" 
        value={ deliveryRoute?.name } 
        required={true}
        />

      <FormSelect
        ref={doorInput}
        error={doorDeliveryError}
        ID="route-door-delivery-input" 
        label="_delivery.Door_delivery" 
        value={ deliveryRoute?.door_delivery } 
        required={true}
        options={[
          { key: 'true', value: 'Yes' },
          { key: 'false', value: 'No' }
        ]}
        />

      <FormButton text="_extra.Submit" />

      { loading && <LoadingDialog /> }

    </form>
  );
}
