
import React from 'react';
import { orderIcon, productIcon, storeIcon, transactionIcon } from '../../assets/icons';
import HomeBoard from '../../components/HomeBoard';
import FeatureItem from '../../components/list_item/FeatureItem';
import { useHeader } from '../../hooks/headerHook';

export default function Home() {

  useHeader({ 
    topNavPaths: ['/cart']
  });

  return (
    <section>
      <div className="container-x">

        <HomeBoard 
          text="Welcome to DailyNeeds Store Manager"
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
          <FeatureItem icon={storeIcon} text="_user.Create_your_account" />
          <FeatureItem icon={productIcon} text="_product.Add_your_products" />
          <FeatureItem icon={orderIcon} text="_order.Receive_and_fulfill_orders" />
          <FeatureItem icon={transactionIcon} text="_transaction.Get_paid_securely_and_fast" />
        </ul>

      </div>
    </section>
  );
}
