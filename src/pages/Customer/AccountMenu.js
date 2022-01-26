
import React from 'react';
import { cartIcon, favoritedIcon, locationIcon, orderIcon, passwordIcon, transactionIcon, userIcon } from '../../assets/icons';
import AccountMenuView from '../../components/AccountMenuView';
import { useAppContext } from '../../hooks/contextHook';
import { useCustomerLogOut } from '../../hooks/customerHook';

const MENU_ITEMS = [
  { text: '_user.Profile', icon: userIcon, href: '/profile'},
  { text: '_order.Orders', icon: orderIcon, href: '/orders'},
  { text: '_extra.Favorites', icon: favoritedIcon, href: '/favorites'},
  { text: '_cart.Saved_carts', icon: cartIcon, href: '/saved-carts'},
  { text: '_user.Addresses', icon: locationIcon, href: '/addresses'},
  { text: '_transaction.Transactions', icon: transactionIcon, href: '/transactions'},
  { text: '_user.Password', icon: passwordIcon, href: '/settings/password'},
];

export default function AccountMenu() {

  const { 
    customer: { 
      customer: {
        customer: {
          customer
        }
      } 
    } 
  } = useAppContext();

  const onLogOut = useCustomerLogOut();

  return (
    <section>
      <div className="container-x">
        <AccountMenuView 
          onLogOut={onLogOut}
          photo={customer.user.photo.href} 
          name={customer.user.name} 
          items={MENU_ITEMS} 
          />
      </div>
    </section>
  );
}

