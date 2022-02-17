
import React from 'react'
import DeliveryLinkRouteForm from '../../components/form/DeliveryLinkRouteForm';
import { useHeader } from '../../hooks/headerHook';

export default function DeliveryLinkRouteCreate() {

  useHeader({ 
    title: `Create Delivery Route - DailyNeeds`,
    headerTitle: '_delivery.Add_delivery_link_route'
  });



  return (
    <section>
      <div className="container-x">
        <DeliveryLinkRouteForm 
          deliveryRoute={{}}
          
          />
      </div>
    </section>
  );
}
