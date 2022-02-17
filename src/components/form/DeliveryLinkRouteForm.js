
import React from 'react'
// import LoadingDialog from '../dialog/LoadingDialog';
import FormButton from './FormButton';
import FormChooseButton from './FormChooseButton';
import FormMessage from './FormMessage';

export default function DeliveryLinkRouteForm() {

  function onFormSubmit(e) {
    e.preventDefault();
    
  }

  return (
    <form method="POST" action="" className="form-1-x" onSubmit={onFormSubmit} noValidate>

      <FormMessage 
        // error={formError} 
        // success={formSuccess} 
        />

      <FormChooseButton
        label="_delivery.Origin_location"
        />

      <FormChooseButton
        label="_delivery.Destination_location"
        />

      <FormButton text="_extra.Submit" />

      {/* { dialog && <LoadingDialog /> } */}

    </form>
  );
}
