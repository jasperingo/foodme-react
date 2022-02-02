
import React from 'react';
import { useHeader } from '../../hooks/headerHook';

export default function CartDeliveryMethod() {

  useHeader({ 
    title: `Delivery Method (Cart) - Dailyneeds`,
    headerTitle: '_delivery.Delivery_method',
    topNavPaths: ['/cart']
  });

  return <section className="container-x">Choose your preferred delivery method</section>;
}
