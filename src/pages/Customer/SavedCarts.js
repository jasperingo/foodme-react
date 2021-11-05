
import React from 'react';
import { useTranslation } from 'react-i18next';
import CartIcon from '../../icons/CartIcon';
import CopyIcon from '../../icons/CopyIcon';


function SavedCartItem({ cart: { code, name, number_of_items } }) {

  const { t } = useTranslation();

  return (
    <li>
      <div className="p-2 mt-2 mb-4 rounded md:shadow">
        <div className="text-lg font-bold mb-1">{ code }</div>
        <div className="text-lg mb-1">{ name }</div>
        <div className="mb-1 text-color-gray">{ t('_order.item__Num', { count: number_of_items }) }</div>
        <div className="flex justify-between">
          <button className="flex gap-2 btn-color-blue p-2 rounded">
            <CopyIcon />
            <span>{ t('_cart.Copy_code') }</span>
          </button>
          <button className="flex gap-2 btn-color-primary p-2 rounded">
            <CartIcon />
            <span>{ t('_cart.Open_cart') }</span>
          </button>
        </div>
      </div>
    </li>
  );
}

export default function SavedCarts() {
  return (
    <section className="flex-grow">
      <div className="container-x">
        
        <ul className="list-2-x">
          <SavedCartItem 
            cart={{
              code: 'CART83833',
              name: 'Food stuffs',
              number_of_items: 7
            }}
            />

          <SavedCartItem 
            cart={{
              code: 'CART83812',
              name: 'Back to school',
              number_of_items: 2
            }}
            />

          <SavedCartItem 
            cart={{
              code: 'CART83552',
              name: 'Daddy\'s drugs',
              number_of_items: 5
            }}
            />
        </ul>

      </div>
    </section>
  );
}

