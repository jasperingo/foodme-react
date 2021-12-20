
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
  { text: '_category.Categories', icon: categoryIcon, href: '/categories' }
];

export default function UserAccount() {

  const { customer } = useAppContext();

  if (customer === 10) {
    return (<Redirect to="/" />)
  }

  return (
    <section>
      <div className="container-x">
        <div className="account-menu">
          <AccountMenuTop photo="admin.jpeg" name="Mr. Richard Gates" />
          <AccountMenuList items={MENU_ITEMS} />
          <AppSwitch />
        </div>
      </div>
    </section>
  );
}

