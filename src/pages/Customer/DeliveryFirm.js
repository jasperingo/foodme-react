
import React from 'react';
import { useHeader } from '../../hooks/headerHook';

export default function DeliveryFirm() {

  const deliveryFirm = null;

  useHeader({ 
    title: `${deliveryFirm?.user.name ?? 'Loading...'} - Delivery Firm`,
    headerTitle: '_delivery.Delivery_firm',
    topNavPaths: ['/cart', '/search']
  });

  return <div>Delivery firm</div>;
}
