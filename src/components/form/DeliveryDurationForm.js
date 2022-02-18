
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDeliveryRouteDurationUnit } from '../../hooks/delilvery_route/deliveryRouteViewHook';
import DeliveryRouteDuration from '../../models/DeliveryRouteDuration';
import LoadingDialog from '../dialog/LoadingDialog';
import FormButton from './FormButton';
import FormField from './FormField';
import FormMessage from './FormMessage';
import FormSelect from './FormSelect';

export default function DeliveryDurationForm(
  {
    duration,
    onSubmit, 
    dialog, 
    formError, 
    formSuccess, 
    minError, 
    maxError, 
    unitError,
    feeError,
  }
) {

  const minInput = useRef(null);

  const maxInput = useRef(null);

  const unitInput = useRef(null);

  const feeInput = useRef(null);

  const { t } = useTranslation();

  const unitText = useDeliveryRouteDurationUnit();

  function onFormSubmit(e) {
    e.preventDefault();
    onSubmit(
      minInput.current.value,
      maxInput.current.value,
      feeInput.current.value,
      unitInput.current.value,

      minInput.current.validity,
      maxInput.current.validity,
      feeInput.current.validity,
      unitInput.current.validity
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
        value={ duration.minimium } 
        required={true}
        type="number"
        />

      <FormField
        ref={maxInput}
        error={maxError}
        ID="maximium-input" 
        label="_extra.Maximium" 
        value={ duration.maximium } 
        required={true}
        type="number"
        />

      <FormField
        ref={feeInput}
        error={feeError}
        ID="fee-input" 
        label="_extra.Fee" 
        value={ duration.fee } 
        required={true}
        type="number"
        step="0.01"
        min={0}
        />

      <FormSelect
        ref={unitInput}
        error={unitError}
        ID="unit-input" 
        label="_extra.Unit" 
        value={ duration.unit } 
        required={true}
        options={DeliveryRouteDuration.getUnits().map(i=> ({ key: i, value: t(unitText(i)) }))}
        />

      <FormButton text="_extra.Submit" />

      { dialog && <LoadingDialog /> }

    </form>
  );
}
