
import React from 'react';
import { Redirect } from 'react-router-dom';
import AppSwitch from '../../AppSwitch';
import { adminIcon, categoryIcon, deliveryIcon, storeIcon, userIcon } from '../../assets/icons';
import AccountMenuList from '../../components/AccountMenuList';
import AccountMenuTop from '../../components/AccountMenuTop';
import { useAppContext } from '../../context/AppContext';


const MENU_ITEMS = [
  { text: '_user.Profile', icon: adminIcon, href: '/profile'},
  { text: '_user.Customers', icon: userIcon, href: '/customers'},
  { text: '_store.Stores', icon: storeIcon, href: '/stores'},
  { text: '_delivery.Delivery_firms', icon: deliveryIcon, href: '/delivery-firms'},
  { text: '_extra.Categories', icon: categoryIcon, href: '/categories' }
];

export default function UserAccount() {

  const { customer } = useAppContext();

  if (customer === 10) {
    return (<Redirect to="/" />)
  }

  return (
    <section>
      <div className="container-x">
        <div className="max-w-lg mx-auto md:shadow md:my-6 md:py-2 md:px-4 md:rounded">
          <AccountMenuTop photo="admin.jpeg" name="Mr. Richard Gates" />
          <AccountMenuList items={MENU_ITEMS} />
          <AppSwitch />
        </div>
      </div>
    </section>
  );
}

