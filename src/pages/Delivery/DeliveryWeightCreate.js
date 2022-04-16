
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import DeliveryWeightForm from '../../components/form/DeliveryWeightForm';
import { useDeliveryRouteWeightCreate } from '../../hooks/delilvery_route/deliveryRouteWeightCreateHook';
import { useHeader } from '../../hooks/headerHook';
import { useURLQuery } from '../../hooks/viewHook';

export default function DeliveryWeightCreate() {

  const [deliveryRoute] = useURLQuery(['delivery_route']);

  const history = useHistory();

  if (!deliveryRoute) {
    history.replace('/delivery-routes');
  }

  useHeader({ 
    title: `Create Delivery Weight - DailyNeeds`,
    headerTitle: '_delivery.Add_delivery_weight'
  });

  const [
    onSubmit, 
    loading, 
    formError, 
    formSuccess, 
    minError, 
    maxError, 
    feeError
  ] = useDeliveryRouteWeightCreate(Number(deliveryRoute));

  useEffect(
    function() {
      if (formSuccess !== null) 
        history.replace(`/delivery-route/${deliveryRoute}/weights`);
    },
    [deliveryRoute, history, formSuccess]
  );

  return (
    <section>
      <div className="container-x">
        <DeliveryWeightForm 
          weight={{}}
          onSubmit={onSubmit}
          loading={loading}
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
