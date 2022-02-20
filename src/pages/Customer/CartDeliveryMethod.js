
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect, useHistory } from 'react-router-dom';
import { CART } from '../../context/actions/cartActions';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import Order from '../../models/Order';


function MethodItem({ type, title, summary, onClick }) {

  const { t } = useTranslation();

  return (
    <li className="mb-4">
      <button 
        onClick={()=> onClick(type)} 
        className="block w-full border p-2 rounded text-left hover:bg-color-gray-h"
        >
        <span className="w-full inline-block font-bold text-color-primary">{ t(title) }</span>
        <span className="w-full inline-block text-sm">{ t(summary) }</span>
      </button>
    </li>
  );
}

export default function CartDeliveryMethod() {

  useHeader({ 
    title: `Delivery Method (Cart) - Dailyneeds`,
    headerTitle: '_delivery.Delivery_method',
    topNavPaths: ['/cart']
  });

  const { 
    cart: {
      cartDispatch,
      cart: {
        cartItems
      } 
    }
  } = useAppContext();

  const history = useHistory();

  if (cartItems.length === 0) {
    return <Redirect to="/cart" />
  }

  function onSelect(value) {
    cartDispatch({
      type: CART.DELIVERY_METHOD_CHOOSEN,
      payload: value
    });
    
    if (value === Order.DELIVERY_METHOD_DOOR) {
      history.push('/cart/delivery-address');
    } else {
      history.push('/cart/discounts');
    }
  }

  return (
    <section>

      <div className="container-x">

        <ul className="py-4 max-w-lg mx-auto">
          <MethodItem 
            type={Order.DELIVERY_METHOD_DOOR}
            title="_delivery.Door_delivery" 
            summary="_delivery._door_delivery_note" 
            onClick={onSelect}
            />

          <MethodItem 
            type={Order.DELIVERY_METHOD_STORE}
            title="_delivery.Pick_up" 
            summary="_delivery._pick_up_delivery_note" 
            onClick={onSelect}
            />
        </ul>

      </div>

    </section>
  );
}
