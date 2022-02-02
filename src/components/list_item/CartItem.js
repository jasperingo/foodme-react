
import Icon from '@mdi/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { deleteIcon } from '../../assets/icons';
import { CART } from '../../context/actions/cartActions';
import { useAppContext } from '../../hooks/contextHook';
import { useMoneyFormat } from '../../hooks/viewHook';
import { FETCH_STATUSES } from '../../repositories/Fetch';
import AlertDialog from '../dialog/AlertDialog';
import QuantityChooser from '../QuantityChooser';

export default function CartItem({ cartItem: { quantity, amount, product, product_variant } }) {

  const { t } = useTranslation();

  const { 
    cart: {
      cartDispatch,
      cart: {
        cartItems
      }
    }
  } = useAppContext();

  const [dialog, setDialog] = useState(null);
  
  function onQuantityButtonClicked(value) {
    const qty = (quantity || 1) + value;
    if (qty > 0 && qty <= product_variant.quantity) {
      cartDispatch({
        type: CART.ITEM_QUANTITY_CHANGED,
        payload: {
          quantity: value,
          item: { product_variant },
          amount: (product_variant.price * value),
        }
      });
    }
  }
  
  function onRemoveClicked() {
    setDialog({
      body: '_cart._confirm_item_removal',
      positiveButton: {
        text: '_extra.Yes',
        action() {
          cartDispatch({
            type: CART.ITEM_REMOVED,
            payload: {
              item: { product_variant },
              fetchStatus: cartItems.length === 1 ? FETCH_STATUSES.EMPTY: FETCH_STATUSES.DONE
            }
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
      <div className="mb-5 lg:flex lg:shadow">
        <div className="flex lg:flex-grow">
          <img 
            src={ product.photo.href } 
            alt={ product.title } 
            className="w-20 h-20 border rounded block md:w-32 md:h-32" 
            />
          <div className="flex-grow pl-2">
            <div className="mb-1">{ product.title }</div>
            <div className="mb-1 text-color-primary">{ t('_extra.Variation') }: { product_variant.name }</div>
            <div className="font-bold mb-1">{ useMoneyFormat(amount) }</div>
          </div>
        </div>
        <div className="flex gap-2 py-2 items-center lg:px-5 lg:gap-5">
          <div className="flex-grow">
            <QuantityChooser 
              quantity={quantity}
              onQuantityChanged={onQuantityButtonClicked}
              />
          </div>
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

