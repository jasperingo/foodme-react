
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { orderIcon, productIcon, storeIcon, transactionIcon } from '../../assets/icons';
import FeatureItem from '../../components/list_item/FeatureItem';
import { useHeader } from '../../hooks/headerHook';

export default function Home() {

  useHeader({ 
    topNavPaths: ['/cart']
  });

  const { t } = useTranslation();

  return (
    <section>
      <div className="container-x">

        <div className="my-2 rounded relative bg-color-primary py-12 px-4">
          <div className="mb-8 font-bold text-3xl md:text-5xl">Welcome to DailyNeeds Store Manager</div>
          <ul className="flex items-center gap-4">
            <li>
              <Link to="/login" className="bg-white text-black py-3 p-4 rounded">{ t('_user.Log_in') }</Link>
            </li>
            <li>
              <Link to="/register" className="bg-white text-black p-3 px-4 rounded">{ t('_user.Register') }</Link>
            </li>
          </ul>
        </div>

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
