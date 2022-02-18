
import React from 'react';
import { useHistory } from 'react-router-dom';
import DeliveryWeightForm from '../../components/form/DeliveryWeightForm';
import { useDeliveryRouteWeightCreate } from '../../hooks/delilvery_route/deliveryRouteWeightCreateHook';
import { useHeader } from '../../hooks/headerHook';
import { useURLQuery } from '../../hooks/viewHook';

export default function DeliveryWeightCreate() {

  const product = useURLQuery().get('delivery_route');

  const history = useHistory();

  if (!product) {
    history.replace('/delivery-routes');
  }

  useHeader({ 
    title: `Create Delivery Weight - DailyNeeds`,
    headerTitle: '_delivery.Add_delivery_weight'
  });

  const [
    onSubmit, 
    dialog, 
    formError, 
    formSuccess, 
    minError, 
    maxError, 
    feeError
  ] = useDeliveryRouteWeightCreate();

  return (
    <section>
      <div className="container-x">
        <DeliveryWeightForm 
          weight={{}}
          onSubmit={onSubmit}
          dialog={dialog}
          formError={formError}
          formSuccess={formSuccess}
          minError={minError}
          maxError={maxError} 
          feeError={feeError}
          />
      </div>
    </section>
  );
}
