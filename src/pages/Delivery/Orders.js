
import React from 'react';
import Tab from '../../components/Tab';

const TAB_LINKS = [
  { title : '_order.Processing', href: '' },
  { title : '_order.Delivered', href: '/delivered' },
  { title : '_order.In_transit', href: '/in-transit' }
];

export default function Orders() {
  return (
    <section>
      <div className="container-x">

        <Tab items={ TAB_LINKS } keyPrefix="orders-tab" />

        <div>Orders....</div>

      </div>
    </section>
  );
}
