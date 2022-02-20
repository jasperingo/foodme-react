
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useAppContext } from '../../hooks/contextHook';
import { useSavedCartCreate } from '../../hooks/saved_cart/savedCartCreateHook';
import { useMoneyFormat } from '../../hooks/viewHook';
import AlertDialog from '../dialog/AlertDialog';
import LoadingDialog from '../dialog/LoadingDialog';
import CartSavedDialog from './CartSavedDialog';
import SaveCartDialog from './SaveCartDialog';

export default function CartCheckOutOrSave({ saveOnly }) {
  
  const { t } = useTranslation();

  const history = useHistory();

  const location = useLocation();

  const { 
    customer: { 
      customer: {
        customer: {
          customerToken
        }
      } 
    },
    cart: {
      cart: {
        cartItems
      } 
    }
  } = useAppContext();

  const [dialog, setDialog] = useState(null);

  const [loadingDialog, setLoadingDialog] = useState(false);

  const [saveCartDialog, setSaveCartDialog] = useState(false);

  const [cartSavedDialog, setCartSavedDialog] = useState(null);

  const onSubmitSaveCart = useSavedCartCreate(customerToken);

  function getSaveCartTitle() {
    if (customerToken === null) {
      history.push(`/login?redirect_to=${encodeURIComponent(location.pathname)}`);
    } else {
      setSaveCartDialog(true);
    }
  }

  function saveCart(title) {
    setLoadingDialog(true);
    setSaveCartDialog(false);

    onSubmitSaveCart(title, {
      
      onSuccess(code) {
        setLoadingDialog(false);
        setCartSavedDialog({
          code: code,
          onDone() {
            setCartSavedDialog(null)
          }
        })
      },

      onError(message) {
        setLoadingDialog(false);
        setDialog({
          body: message,
          positiveButton: {
            text: '_extra.Done',
            action() {
              setDialog(null);
            }
          }
        });
      }

    });
  }

  return (
    <div className="lg:my-2 lg:w-80 lg:py-10 lg:px-4 lg:shadow lg:rounded">
      <div className="flex items-center mb-2">
        <span className="text-sm flex-grow">{ t('_extra.Total') }: </span>
        <span className="font-bold text-lg">
          { 
            useMoneyFormat(
              cartItems.reduce((sum, i)=> sum + (i.product_variant.price * i.quantity), 0)
            ) 
          }
        </span>
      </div>
      
      {
        !saveOnly && 
        <Link 
          to="/cart/delivery-method"
          className="block w-full py-3 my-2 rounded btn-color-primary text-center"
          >
          { t('_cart.Check_out') }
        </Link>
      }

      <button 
        className="w-full py-3 my-2 rounded btn-color-blue" 
        onClick={getSaveCartTitle}
        >
        { t('_extra.Save') }
      </button>
      
      { dialog && <AlertDialog dialog={dialog} /> }

      { cartSavedDialog && <CartSavedDialog dialog={cartSavedDialog} /> }

      {
        loadingDialog && <LoadingDialog />
      }

      {
        saveCartDialog && 
        <SaveCartDialog  onSubmitClicked={saveCart} onCancelClicked={()=> setSaveCartDialog(false)} />
      }
    </div>
  );
}
