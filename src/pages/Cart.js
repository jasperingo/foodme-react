
import React from 'react';
//import { useTranslation } from 'react-i18next';
import EmptyList from '../components/EmptyList';
import CartEmptyIcon from '../icons/CartEmptyIcon';

export default function Cart() {

  //const { t } = useTranslation();

  return (
    <section>
      <div className="container mx-auto px-2">
        <EmptyList text="_empty.Your_cart_is_empty" Icon={CartEmptyIcon} />
      </div>
    </section>
  );
}

