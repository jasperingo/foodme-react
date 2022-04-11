
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useAppContext } from '../../hooks/contextHook';
import { useSavedCartCreate } from '../../hooks/saved_cart/savedCartCreateHook';
import { useMoneyFormat } from '../../hooks/viewHook';
import AlertDialog from '../dialog/AlertDialog';
import LoadingDialog from '../dialog/LoadingDialog';
import CartSavedDialog from './CartSavedDialog';
import SaveCartDialog from './SaveCartDialog';

export default function CartCheckOutOrSave({ userToken, saveOnly }) {
  
  const { t } = useTranslation();

  const history = useHistory();

  const location = useLocation();

  const {
    cart: {
      cart: {
        cartItems
      } 
    }
  } = useAppContext();

  const [dialog, setDialog] = useState(null);

  const [saveCartDialog, setSaveCartDialog] = useState(false);

  const [cartSavedDialog, setCartSavedDialog] = useState(null);

  const [
    onSubmit,
    loading,
    formSuccess,
    formError, 
    resetSubmit
  ] = useSavedCartCreate(userToken);

  useEffect(
    function() {

      if (formSuccess !== null) {
        setCartSavedDialog({
          code: formSuccess,
          onDone() {
            setCartSavedDialog(null);
            resetSubmit();
          }
        });
      }

      if (formError !== null) {
        setDialog({
          body: formError,
          positiveButton: {
            text: '_extra.Done',
            action() {
              setDialog(null);
              resetSubmit();
            }
          }
        });
      }
    },
    [formSuccess, formError, resetSubmit]
  );

  function getSaveCartTitle() {
    if (userToken === null) {
      history.push(`/login?redirect_to=${encodeURIComponent(location.pathname)}`);
    } else {
      setSaveCartDialog(true);
    }
  }

  function saveCart(title) {
    setSaveCartDialog(false);
    onSubmit(title);
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
        loading && <LoadingDialog />
      }

      {
        saveCartDialog && 
        <SaveCartDialog  onSubmitClicked={saveCart} onCancelClicked={()=> setSaveCartDialog(false)} />
      }
    </div>
  );
}
