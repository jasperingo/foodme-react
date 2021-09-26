
import React from 'react';
import { useTranslation } from 'react-i18next';
import CartEmptyIcon from '../icons/CartEmptyIcon';

export default function Cart() {

  const { t } = useTranslation();

  return (
    <section>
      <div className="container mx-auto">
        <div className="text-center bg-gray-200 mt-10 mx-2 py-5">
          <CartEmptyIcon classList="text-yellow-500 fill-current mx-auto" />
          <div className="font-bold mt-2">{ t('Your_cart_is_empty') }</div>
        </div>
      </div>
    </section>
  );
}

