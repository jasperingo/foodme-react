
import React from 'react';
import { adminIcon, categoryIcon, deliveryIcon, storeIcon, userIcon } from '../../assets/icons';
import AccountMenuView from '../../components/AccountMenuView';
import { useAppContext } from '../../context/AppContext';

const MENU_ITEMS = [
  { text: '_user.Profile', icon: adminIcon, href: '/profile'},
  { text: '_user.Customers', icon: userIcon, href: '/customers'},
  { text: '_store.Stores', icon: storeIcon, href: '/stores'},
  { text: '_delivery.Delivery_firms', icon: deliveryIcon, href: '/delivery-firms'},
  { text: '_category.Categories', icon: categoryIcon, href: '/categories' }
];

export default function AccountMenu() {

  const { user: { user } } = useAppContext();

  return (
    <section>
      <div className="container-x">
        <AccountMenuView photo={`/photos/admin/${user.photo}`} name={`${user.first_name} ${user.last_name}`} items={MENU_ITEMS} />
      </div>
    </section>
  );
}

