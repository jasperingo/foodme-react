
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSavedCartFetchByCode } from '../../hooks/saved_cart/savedCartFetchByCodeHook';
import AlertDialog from '../dialog/AlertDialog';
import LoadingDialog from '../dialog/LoadingDialog';
import FormField from '../form/FormField';

export default function CartCodeForm() {

  const { t } = useTranslation();

  const input = useRef(null);

  const [dialog, setDialog] = useState(null);

  const [
    onSubmit, 
    openCart, 
    resetSavedCart,
    isLoading, 
    error, 
    itemsUnavailable
  ] = useSavedCartFetchByCode();

  function onFormSubmit(e) {
    e.preventDefault();
    onSubmit(input.current.value, input.current.validity);
  }

  useEffect(
    function() {
      if (itemsUnavailable > 0 && dialog === null) {
        setDialog({
          body: t('_cart._num_products_are_available', { count: itemsUnavailable }),
          positiveButton: {
            text: '_extra.Yes',
            action() {
              openCart();
              setDialog(null);
            }
          },
          negativeButton: {
            text: '_extra.No',
            action() {
              resetSavedCart();
              setDialog(null);
            }
          }
        });
      }
    },
    [dialog, itemsUnavailable, openCart, resetSavedCart, t]
  );

  useEffect(
    function() {
      if (error !== null && dialog === null) {
        setDialog({
          body: error,
          positiveButton: {
            text: '_extra.Done',
            action() {
              resetSavedCart();
              setDialog(null);
            }
          }
        });
      }
    },
    [dialog, error, resetSavedCart]
  );

  return (
    <div className="container-x">
      <form className="mt-2 flex gap-2 items-start" action="" method="GET" onSubmit={onFormSubmit} noValidate>
        <FormField
          ref={ input }
          ID="cart-code-input"
          label="_cart.Enter_cart_code"
          required={true}
          hideLabel={true}
          className="flex-grow"
          />
        <button className="p-2 rounded btn-color-primary">{ t('_search.Search') }</button>
      </form>
      { dialog && <AlertDialog dialog={dialog} /> }
      { isLoading && <LoadingDialog /> }
    </div>
  );
}
