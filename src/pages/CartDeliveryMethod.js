
import Icon from '@mdi/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect, useHistory } from 'react-router-dom';
import { doorDeliveryIcon, pickUpDeliveryIcon } from '../assets/icons';
import { CART } from '../context/actions/cartActions';
import { useAppContext } from '../hooks/contextHook';
import { useHeader } from '../hooks/headerHook';
import Order from '../models/Order';


function MethodItem({ icon, type, title, summary, onClick }) {

  const { t } = useTranslation();

  return (
    <li className="mb-4">
      <button 
        onClick={()=> onClick(type)} 
        className="flex gap-2 items-center w-full border p-2 rounded text-left hover:bg-color-gray-h"
        >
        <Icon path={icon} className="w-20 h-20 text-color-primary" />
        <div>
          <span className="w-full inline-block font-bold text-color-primary">{ t(title) }</span>
          <span className="w-full inline-block text-sm">{ t(summary) }</span>
        </div>
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
    return <Redirect to="/" />
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
            icon={doorDeliveryIcon}
            type={Order.DELIVERY_METHOD_DOOR}
            title="_delivery.Door_delivery" 
            summary="_delivery._door_delivery_note" 
            onClick={onSelect}
            />

          <MethodItem 
            icon={pickUpDeliveryIcon}
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
