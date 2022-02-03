
import React from 'react';
import { adminIcon, categoryIcon, deliveryIcon, passwordIcon, storeIcon, userIcon } from '../../assets/icons';
import AccountMenuView from '../../components/AccountMenuView';
import { useAdminLogOut } from '../../hooks/admin/adminLogOutHook';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';

const MENU_ITEMS = [
  { text: '_user.Profile', icon: adminIcon, href: '/profile'},
  { text: '_user.Customers', icon: userIcon, href: '/customers'},
  { text: '_store.Stores', icon: storeIcon, href: '/stores'},
  { text: '_delivery.Delivery_firms', icon: deliveryIcon, href: '/delivery-firms'},
  { text: '_category.Categories', icon: categoryIcon, href: '/categories' },
  { text: '_user.Password', icon: passwordIcon, href: '/settings/password'},
];

export default function AccountMenu() {

  const { 
    admin: { 
      admin: {
        admin
      }
    } 
  } = useAppContext();

  useHeader({ 
    title: `${admin.customer.user.name} - Account`,
    topNavPaths: ['/messages']
  });

  const onLogOut = useAdminLogOut();
  
  return (
    <section>
      <div className="container-x">
        <AccountMenuView 
          onLogOut={onLogOut}
          photo={admin.customer.user.photo.href} 
          name={admin.customer.user.name} 
          items={MENU_ITEMS} 
          />
      </div>
    </section>
  );
}

