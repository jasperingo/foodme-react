
import React from 'react';
import { bankAccountIcon, locationIcon, passwordIcon, reviewIcon, timeIcon, userIcon } from '../../assets/icons';
import AccountMenuView from '../../components/AccountMenuView';
import { useAppContext } from '../../hooks/contextHook';
import { useDeliveryFirmLogOut } from '../../hooks/delivery_firm/deliveryFirmLogOutHook';
import { useHeader } from '../../hooks/headerHook';

const MENU_ITEMS = [
  { text: '_user.Profile', icon: userIcon, href: '/profile'},
  { text: '_review.Reviews', icon: reviewIcon, href: '/reviews'},
  { text: '_user.Address', icon: locationIcon, href: '/settings/address'},
  { text: '_user.Working_hours', icon: timeIcon, href: '/settings/working-hours'},
  { text: '_transaction.Bank_account', icon: bankAccountIcon, href: '/settings/withdrawal-account'},
  { text: '_user.Password', icon: passwordIcon, href: '/settings/password'},
];

export default function AccountMenu() {

  const { 
    deliveryFirm: { 
      deliveryFirm: {
        deliveryFirm
      }
    } 
  } = useAppContext();

  useHeader({ 
    title: `${deliveryFirm.user.name} - Account`,
    topNavPaths: ['/messages']
  });

  const onLogOut = useDeliveryFirmLogOut();

  const toActivate = [];

  if (deliveryFirm.user.addresses.length === 0) {
    toActivate.push('Update your business address.');
  }

  if (deliveryFirm.user.working_hours.length === 0) {
    toActivate.push('Update your business working hours.');
  }

  return (
    <section>
      <div className="container-x">
        <AccountMenuView
          onLogOut={onLogOut}
          photo={deliveryFirm.user.photo.href} 
          name={deliveryFirm.user.name} 
          status={deliveryFirm.user.status} 
          items={MENU_ITEMS} 
          toActivate={toActivate}
         />
      </div>
    </section>
  );
}

