
import Icon from '@mdi/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { deleteIcon } from '../assets/icons';
import { CART } from '../context/AppActions';
import { useAppContext } from '../context/AppContext';
import { useMoneyFormat } from '../context/AppHooks';
import AlertDialog from './AlertDialog';
import QuantityChooser from './QuantityChooser';

export default function CartItem({ cartItem }) {

  const { t } = useTranslation();

  const { cartDispatch } = useAppContext();

  const [dialog, setDialog] = useState(null);

  function onQuantityButtonClicked(value) {
    cartDispatch({
      type: CART.ITEM_QUANTITY_CHANGED,
      payload: {
        item: cartItem,
        value
      }
    });
  }
  
  function onRemoveClicked() {

    setDialog({
      body: '_cart._confirm_item_removal',
      positiveButton: {
        text: '_extra.Yes',
        action() {
          cartDispatch({
            type: CART.ITEM_REMOVED,
            payload: cartItem
          });
          setDialog(null);
        }
      },
      negativeButton: {
        text: '_extra.No',
        action() {
          setDialog(null);
        }
      }
    });
  }

  return (
    <li>
      <div className="mb-5 lg:flex">
        <div className="flex lg:flex-grow">
          <img 
            src={`/photos/products/${cartItem.product.photo}`} 
            alt={ cartItem.product.title } 
            className="w-20 h-20 border rounded block md:w-32 md:h-32" 
            />
          <div className="flex-grow pl-2">
            <div className="mb-1">{ cartItem.product.title }</div>
            <div className="font-bold mb-1">{ useMoneyFormat(cartItem.amount) }</div>
          </div>
        </div>
        <div className="flex gap-2 py-2 lg:px-10 lg:gap-10">
          <QuantityChooser 
            quantity={cartItem.quantity}
            unit={cartItem.unit} 
            onQuantityChanged={onQuantityButtonClicked}
            />
          <button onClick={onRemoveClicked}>
            <Icon path={deleteIcon} className="w-6 h-6 text-color-primary" />
            <span className="sr-only">{ t('_cart.Remove_cart_item') }</span>
          </button>
        </div>
      </div>
      { dialog && <AlertDialog dialog={dialog} /> }
    </li>
  );
}

