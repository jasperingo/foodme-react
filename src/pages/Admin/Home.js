
import React from 'react';
import { adminIcon, deliveryIcon, orderIcon, storeIcon, transactionIcon, userIcon } from '../../assets/icons';
import HomeBoard from '../../components/HomeBoard';
import FeatureItem from '../../components/list_item/FeatureItem';

export default function Home() {
  return (
    <section>
      <div className="container-x">

        <HomeBoard 
          text="Welcome to DailyNeeds Administrative Dashboard" 
          links={[
            {
              href: "/login",
              text: '_user.Log_in'
            }
          ]} 
          />

        <ul className="my-4 md:grid md:grid-cols-2 md:gap-4">
          <FeatureItem icon={adminIcon} text="Log in to your account" />
          <FeatureItem icon={userIcon} text="Manage customers" />
          <FeatureItem icon={storeIcon} text="Manage stores" />
          <FeatureItem icon={deliveryIcon} text="Manage delivery firms" />
          <FeatureItem icon={orderIcon} text="Manage orders" />
          <FeatureItem icon={transactionIcon} text="Manage transactions" />
        </ul>

      </div>
    </section>
  );
}
