
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import DeliveryRouteForm from '../../components/form/DeliveryRouteForm';
import { useDeliveryRouteCreate } from '../../hooks/delilvery_route/deliveryRouteCreateHook';
import { useHeader } from '../../hooks/headerHook';

export default function DeliveryRouteCreate() {

  const history = useHistory();

  useHeader({ 
    title: `Create Delivery Route - DailyNeeds`,
    headerTitle: '_delivery.Add_delivery_route'
  });

  const [
    onSubmit, 
    id, 
    loading, 
    formError, 
    formSuccess, 
    nameError, 
    doorDeliveryError,
  ] = useDeliveryRouteCreate();

  useEffect(
    function() {
      if (id > 0)
        history.push(`/delivery-route/${id}`);
    }, 
    [id, history]
  );
  
  return (
    <section>
      <div className="container-x">
       
          <DeliveryRouteForm 
            deliveryRoute={{}}
            onSubmit={onSubmit}
            loading={loading}
            formError={formError}
            formSuccess={formSuccess}
            nameError={nameError}
            doorDeliveryError={doorDeliveryError}
            />
      </div>
    </section>
  );
}
