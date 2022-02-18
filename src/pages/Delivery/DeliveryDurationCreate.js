
import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import DeliveryDurationForm from '../../components/form/DeliveryDurationForm';
import { useDeliveryRouteDurationCreate } from '../../hooks/delilvery_route/deliveryRouteDurationCreateHook';
import { useHeader } from '../../hooks/headerHook';
import { useURLQuery } from '../../hooks/viewHook';

export default function DeliveryDurationCreate() {

  const product = useURLQuery().get('delivery_route');

  const history = useHistory();

  if (!product) {
    history.replace('/delivery-routes');
  }

  useHeader({ 
    title: `Create Delivery Duration - DailyNeeds`,
    headerTitle: '_delivery.Add_delivery_duration'
  });
  
  const [
    onSubmit, 
    dialog, 
    formError, 
    formSuccess, 
    minError, 
    maxError, 
    unitError,
    feeError
  ] = useDeliveryRouteDurationCreate();

  return (
    <section>
      <div className="container-x">
        <DeliveryDurationForm 
          duration={{}}
          onSubmit={onSubmit}
          dialog={dialog}
          formError={formError}
          formSuccess={formSuccess}
          minError={minError}
          maxError={maxError} 
          unitError={unitError}
          feeError={feeError}
          />
      </div>
    </section>
  );
}
