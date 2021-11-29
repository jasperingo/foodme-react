
import React from 'react';
import Tab from '../../components/Tab';


const TAB_LINKS = [
  { title : '_user.Customers', href: '' },
  { title : '_store.Stores', href: '/stores' },
  { title : '_delivery.Delivery_firms', href: '/delivery-firms' },
  { title : '_order.Orders', href: '/orders' },
  { title : '_product.Products', href: '/products' },
];

export default function Search() {
  
  
  return (
    <section>

      <div className="container-x">
        <Tab items={ TAB_LINKS } keyPrefix="search-tab" />
      </div>

      <div className="container-x">
        SEarch...
      </div>

    </section>
  );
}


