
import React from 'react';
import { deliveryIcon, orderIcon, routeIcon, transactionIcon } from '../../assets/icons';
import HomeBoard from '../../components/HomeBoard';
import FeatureItem from '../../components/list_item/FeatureItem';
import { useHeader } from '../../hooks/headerHook';

export default function Home() {
  
  useHeader({});

  return (
    <section>
      <div className="container-x">

        <HomeBoard 
          text="Welcome to DailyNeeds Delivery Manager"
          links={[
            {
              href: '/login',
              text: '_user.Log_in'
            },
            {
              href: '/register',
              text: '_user.Register'
            }
          ]}
          />

        <ul className="my-4 md:grid md:grid-cols-2 md:gap-4">
          <FeatureItem icon={deliveryIcon} text="_user.Create_your_account" />
          <FeatureItem icon={routeIcon} text="_delivery.Add_your_delivery_locations" />
          <FeatureItem icon={orderIcon} text="_order.Receive_and_fulfill_orders" />
          <FeatureItem icon={transactionIcon} text="_transaction.Get_paid_securely_and_fast" />
        </ul>

      </div>
    </section>
  );
}
