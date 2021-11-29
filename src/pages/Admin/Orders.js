
import React from 'react';
import Tab from '../../components/Tab';

const TAB_LINKS = [
  { title : '_order.Pending', href: '' },
  { title : '_order.Processing', href: '/processing' },
  { title : '_order.Delivered', href: '/delivered' },
  { title : '_order.In_transit', href: '/in-transit' },
  { title : '_order.Declined', href: '/declined' },
  { title : '_order.Cancelled', href: '/cancelled' },
  { title : '_order.Returned', href: '/returned' }
];

export default function Orders() {
  return (
    <section>
       <div className="container-x">
          <Tab items={ TAB_LINKS } keyPrefix="orders-tab" />
          Orders
        </div>
    </section>
  );
}
