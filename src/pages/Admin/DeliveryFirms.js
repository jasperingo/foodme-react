
import React from 'react';
// import { deliveryIcon } from '../../assets/icons';
// import EmptyList from '../../components/EmptyList';
// import FetchMoreButton from '../../components/FetchMoreButton';
// import Loading from '../../components/Loading';
// import Reload from '../../components/Reload';
import { useHeader } from '../../hooks/headerHook';

export default function DeliveryFirms() {

  useHeader({ 
    title: 'Delivery Firms - DailyNeeds',
    headerTitle: "_delivery.Delivery_firms"
  });

  return (
    <section>
      
      <div className="container-x">

        Delivery firms

      </div>

    </section>
  );
}
