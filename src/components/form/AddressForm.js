
import React, { useEffect, useRef, useState } from 'react';
import LoadingDialog from '../dialog/LoadingDialog';
import FormButton from './FormButton';
import FormField from './FormField';
import FormMessage from './FormMessage';
import FormSelect from './FormSelect';

export default function AddressForm(
  { 
    address, 
    clearOnSuccess,
    hasTitleAndType, 
    locations,
    onSubmit, 
    dialog, 
    formError, 
    formSuccess, 
    titleError, 
    streetError, 
    cityError, 
    stateError, 
    defaultError
  }
) {

  const titleInput = useRef(null);

  const streetInput = useRef(null);

  const cityInput = useRef(null);

  const stateInput = useRef(null);

  const defaultInput = useRef(null);

  const [state, setState] = useState(address?.state);

  useEffect(
    ()=> {
      if (formSuccess && clearOnSuccess) {
        if (hasTitleAndType) {
          titleInput.current.value =  '';
          defaultInput.current.value =  '';
        }
        streetInput.current.value =  '';
        cityInput.current.value =  '';
        stateInput.current.value =  '';
      }
    }, 
    [formSuccess, clearOnSuccess, hasTitleAndType]
  );

  function onFormSubmit(e) {
    e.preventDefault();
    if (hasTitleAndType) {
      onSubmit(
        titleInput.current.value,
        streetInput.current.value,
        stateInput.current.value,
        cityInput.current.value,
        defaultInput.current.value,
  
        titleInput.current.validity,
        streetInput.current.validity,
        stateInput.current.validity,
        cityInput.current.validity,
        defaultInput.current.validity
      );
    } else {
      onSubmit(
        streetInput.current.value,
        stateInput.current.value,
        cityInput.current.value,
  
        streetInput.current.validity,
        stateInput.current.validity,
        cityInput.current.validity
      );
    }
   
  }

  return (
    <form method="POST" action="" className="form-1-x" onSubmit={onFormSubmit} noValidate>

      <FormMessage 
        error={formError} 
        success={formSuccess} 
        />

      { 
        hasTitleAndType && 
        <FormField 
          ref={titleInput}
          error={titleError}
          ID="address-title-input" 
          label="_extra.Title" 
          value={ address?.title } 
          required={true}
          />
      }

      <FormField 
        ref={streetInput}
        error={streetError}
        ID="address-street-input" 
        label="_user.Street" 
        value={ address?.street } 
        required={true}
        />

      <FormSelect
        ref={stateInput}
        error={stateError}
        ID="address-state-input" 
        label="_user.State" 
        value={ address?.state } 
        required={true}
        options={locations.map(i=> ({ key: i.state, value: i.state}))}
        onChange={(e)=> setState(e.target.value)}
        />

      <FormSelect 
        ref={cityInput}
        error={cityError}
        ID="address-city-input" 
        label="_user.City" 
        value={ address?.city } 
        required={true}
        options={locations.find(i=> i.state === state)?.lgas.map(i=> ({ key: i, value: i}))}
        />
      
      { 
        hasTitleAndType &&
        <FormSelect
          ref={defaultInput}
          error={defaultError}
          ID="address-default-input" 
          label="_user.Default_address" 
          value={ address?.type } 
          required={true}
          options={[
            { key: 'default', value: 'Yes' },
            { key: 'sub', value: 'No' }
          ]}
          />
      }

      <FormButton text="_extra.Submit" />

      { dialog && <LoadingDialog /> }

    </form>
  );
}

